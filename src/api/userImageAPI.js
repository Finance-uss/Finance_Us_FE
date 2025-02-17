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
