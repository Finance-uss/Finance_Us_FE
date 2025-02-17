export const postS3 = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return {
        method: "POST",
        url: "/api/image",
        data: formData,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
};

export const deleteS3 = (imageName) => {
    return {
        method: "DELETE",
        url: "/api/image",
        data: { imageName },
    };
};