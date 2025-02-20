export const convertImageToPng = async (file) => {
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
                        resolve(new File([blob], file.name.replace(/\.\w+$/, ".png"), { type: "image/png" }));
                    },
                    "image/png",
                    1.0 // 품질 설정 (PNG는 무손실 압축이므로 1.0)
                );
            };
        };
    });
};
