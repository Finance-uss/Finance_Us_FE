import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const useImageUploader = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [imageName, setImageName] = useState("");
    const [previewImage, setPreviewImage] = useState(imageUrl);

    const handleImageUpload = async (e) => {
        if(imageName) {
            try {
                const response = await axiosInstance.delete("/api/image", {
                    data: { imageName },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.data.isSuccess) {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await axiosInstance.post("/api/image", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.isSuccess) {
                    setImageUrl(response.data.result.imageUrl);
                    setImageName(response.data.result.imageName);
                    setPreviewImage(URL.createObjectURL(file));
                }
                else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return {
        imageUrl,
        imageName,
        previewImage,
        handleImageUpload,
    };
};
