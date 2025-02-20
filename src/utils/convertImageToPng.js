import heic2any from "heic2any";
import loadImage from "blueimp-load-image";

export const convertImageToPng = async (file) => {
    // 파일 확장자 확인 (대소문자 구분 없이)
    const extension = file.name.split('.').pop().toLowerCase();

    // HEIC 또는 HEIF 파일인 경우 (MIME 타입 또는 확장자 기반)
    if (
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        extension === "heic" ||
        extension === "heif"
    ) {
        try {
        const convertedBlob = await heic2any({ blob: file, toType: "image/png" });
        // convertedBlob이 유효한지 확인
        if (!convertedBlob) {
            throw new Error("HEIC 변환 실패: 변환된 Blob이 유효하지 않음");
        }
        const baseName = file.name.slice(0, file.name.lastIndexOf('.'));
        return new File([convertedBlob], baseName + ".png", { type: "image/png" });
        } catch (error) {
        console.error("HEIC 변환 실패:", error);
        throw error;
        }
    }

    // 기본적인 이미지 변환 (FileReader, blueimp-load-image, canvas 사용) 및 이미지 리사이즈
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
        // blueimp-load-image를 사용하여 EXIF 방향 보정 및 캔버스 출력
        loadImage(
            event.target.result,
            (img) => {
            // loadImage가 캔버스 객체를 반환하도록 설정했으므로, 여기서 img는 캔버스입니다.
            // 이미지 리사이즈: 최대 허용 크기 지정
            const MAX_WIDTH = 1920;
            const MAX_HEIGHT = 1080;
            const originalWidth = img.naturalWidth || img.width;
            const originalHeight = img.naturalHeight || img.height;
            const scaleFactor = Math.min(
                MAX_WIDTH / originalWidth,
                MAX_HEIGHT / originalHeight,
                1
            );
            const newWidth = originalWidth * scaleFactor;
            const newHeight = originalHeight * scaleFactor;

            // 리사이즈를 위한 별도의 캔버스 생성
            const resizeCanvas = document.createElement("canvas");
            resizeCanvas.width = newWidth;
            resizeCanvas.height = newHeight;
            const ctx = resizeCanvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // 이미지 품질 관리: 품질 0.8로 압축
            resizeCanvas.toBlob(
                (blob) => {
                if (blob) {
                    const baseName = file.name.slice(0, file.name.lastIndexOf('.'));
                    resolve(new File([blob], baseName + ".png", { type: "image/png" }));
                } else {
                    reject(new Error("Blob 생성 실패"));
                }
                // 메모리 누수 방지: 캔버스 제거
                resizeCanvas.remove();
                if (img !== resizeCanvas && img.remove) {
                    img.remove();
                }
                },
                "image/png",
                0.8
            );
            },
            {
            orientation: true,
            canvas: true, // 결과를 캔버스로 반환
            }
        );
        };

        reader.onerror = (err) => reject(err);
    });
};
