import { useState } from "react";

export const useImageUploader = () => {
    const [imageUrl, setImageUrl] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }
    };

    return {
        imageUrl,
        handleImageUpload,
    };
};
