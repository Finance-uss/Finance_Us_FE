export const formatFormData = (formData) => {
    return {
        accountType: formData.accountType,
        date: `${formData.date.year}-${String(formData.date.month).padStart(2, "0")}-${String(formData.date.day).padStart(2, "0")}`, // 날짜 변환
        subName: formData.subName,
        //formData.subName,
        subAssetName: formData.subAssetName,
        // formData.subAssetName,
        amount: Number(formData.amount), // 숫자 변환
        title: formData.title,
        status: formData.status ?? false, // 기본값 추가
        score: formData.score,
        imageUrl: formData.imageUrl,
        content: formData.content
    };
};