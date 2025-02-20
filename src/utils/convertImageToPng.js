import heic2any from "heic2any";

export const convertImageToPng = async (file) => {
    // 파일 확장자 확인 (대소문자 구분 없이)
    const extension = file.name.split('.').pop().toLowerCase();

    // HEIC 또는 HEIF 파일인 경우 (MIME 타입 또는 확장자 기반)
    if (file.type === "image/heic" || file.type === "image/heif" || extension === "heic" || extension === "heif") {
        try {
            const convertedBlob = await heic2any({ blob: file, toType: "image/png" });
            return new File(
                [convertedBlob],
                file.name.replace(/\.\w+$/, ".png"),
                { type: "image/png" }
            );
        } catch (error) {
            console.error("HEIC 변환 실패:", error);
            throw error;
        }
    }

    // 기본적인 이미지 변환 (FileReader & canvas 사용) + 이미지 리사이즈 기능 추가
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                // 이미지 리사이즈: 최대 허용 크기를 지정
                const MAX_WIDTH = 1920;
                const MAX_HEIGHT = 1080;
                const scaleFactor = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height, 1);
                const newWidth = img.width * scaleFactor;
                const newHeight = img.height * scaleFactor;
                
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext("2d");
                // 리사이즈된 크기로 이미지 그리기
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(new File(
                                [blob],
                                file.name.replace(/\.\w+$/, ".png"),
                                { type: "image/png" }
                            ));
                        } else {
                            reject(new Error("Blob 생성 실패"));
                        }
                    },
                    "image/png",
                    1.0
                );
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};
