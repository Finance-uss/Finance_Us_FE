export const imageUpload = (imageUrl, imageName) => {
    return{
        method: "POST",
        url: "/api/user/image",
        data: {imageUrl, imageName},
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
}

export const userDeleteImage = () => {
    return{
        method: "delete",
        url: "/api/user/image",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
}
