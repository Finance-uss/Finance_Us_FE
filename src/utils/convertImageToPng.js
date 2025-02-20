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
        // convertedBlob이 유효한지 추가 확인
        if (!convertedBlob) throw new Error("HEIC 변환 실패: 변환된 Blob이 유효하지 않음");
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(convertedBlob);
            reader.onload = (event) => {
                // HEIC 변환 후 해상도 줄이기
                loadImage(
                    event.target.result,
                    (canvas) => {
                        if (!(canvas instanceof HTMLCanvasElement)) {
                            reject(new Error("Canvas 변환 실패"));
                            return;
                        }

                        // 최대 허용 해상도 설정
                        const MAX_WIDTH = 1280;
                        const MAX_HEIGHT = 720;
                        const scaleFactor = Math.min(
                            MAX_WIDTH / canvas.width,
                            MAX_HEIGHT / canvas.height,
                            1
                        );
                        const newWidth = canvas.width * scaleFactor;
                        const newHeight = canvas.height * scaleFactor;

                        // 새 캔버스를 생성하여 크기 조정
                        const resizeCanvas = document.createElement("canvas");
                        resizeCanvas.width = newWidth;
                        resizeCanvas.height = newHeight;
                        const ctx = resizeCanvas.getContext("2d");
                        ctx.drawImage(canvas, 0, 0, newWidth, newHeight);

                        // PNG로 변환
                        resizeCanvas.toBlob(
                            (blob) => {
                                if (blob) {
                                    const newFile = new File(
                                        [blob],
                                        file.name.replace(/\.[^/.]+$/, ".png"),
                                        { type: "image/png" }
                                    );

                                    // 파일 크기 제한 확인 (4MB 이하)
                                    if (newFile.size > 4 * 1024 * 1024) {
                                        alert("변환된 이미지 크기가 너무 큽니다. 4MB 이하의 이미지만 업로드 가능합니다.");
                                        reject(new Error("변환된 이미지 크기 초과"));
                                        return;
                                    }

                                    resolve(newFile);
                                } else {
                                    reject(new Error("Blob 생성 실패"));
                                }

                                // 메모리 해제
                                resizeCanvas.remove();
                            },
                            "image/png",
                            0.8 // PNG 품질 조절
                        );
                    },
                    {
                        canvas: true, // 캔버스로 변환
                        orientation: true // EXIF 정보 보정
                    }
                );
            };
            reader.onerror = (err) => reject(err);
        });
    } catch (error) {
        console.error("HEIC 변환 실패:", error);
        alert("HEIC 파일 변환에 실패: " + error.message);
        throw error;
    }
    }

    // 기본적인 이미지 변환 (FileReader, blueimp-load-image, canvas 사용) 및 이미지 리사이즈
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        // blueimp-load-image를 사용하여 EXIF 방향 보정 및 캔버스 반환
        loadImage(
        event.target.result,
        (img) => {
            // 최대 허용 크기 지정
            const MAX_WIDTH = 1280;
            const MAX_HEIGHT = 720;
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
                resolve(
                    new File(
                    [blob],
                    file.name.replace(/\.[^/.]+$/, '.png'),
                    { type: "image/png" }
                    )
                );
                } else {
                reject(new Error("Blob 생성 실패"));
                }
                // 메모리 누수 방지: 사용한 캔버스 제거
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
            canvas: true, // 캔버스로 결과를 반환
        }
        );
    };

    reader.onerror = (err) => reject(err);
    }).catch((error) => {
    alert("이미지 변환 에러: " + error.message);
    throw error;
    });
};
