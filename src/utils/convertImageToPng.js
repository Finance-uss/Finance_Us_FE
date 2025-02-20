import heic2any from "heic2any";

export const convertImageToPng = async (file) => {
    // HEIC 또는 HEIF 파일인 경우 전용 라이브러리로 변환
    if (file.type === "image/heic" || file.type === "image/heif") {
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

    // 기본적인 이미지 변환 (FileReader & canvas 사용)
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => {
                        resolve(new File(
                            [blob],
                            file.name.replace(/\.\w+$/, ".png"),
                            { type: "image/png" }
                        ));
                    },
                    "image/png",
                    1.0
                );
            };
        };
    });
};
