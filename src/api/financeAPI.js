export const postS3 = async (file) => {
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

export const deleteS3 = async (imageName) => {
    return {
        method: "DELETE",
        url: "/api/image",
        data: { imageName },
    };
};

export const postAccount = async (data) => {
    return {
        method: "POST",
        url: "/api/account",
        data,
    };
};

export const postAccountReceipt = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return {
        method: "POST",
        url: "/api/account/receipt",
        data: formData,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
};

export const deleteAccount = async (accountId) => {
    return {
        method: "DELETE",
        url: `/api/account/${accountId}`,
    };
};

export const patchAccount = async (accountId, data) => {
    return {
        method: "PATCH",
        url: `/api/account/${accountId}`,
        data,
    };
};

export const getCalendarMonth = async (year, month) => {
    return {
        method: "GET",
        url: `/api/calendar/${year}/${month}`,
    };
};

export const getCalendarDay = async (year, month, day) => {
    return {
        method: "GET",
        url: `/api/calendar/${year}/${month}/${day}`,
    };
};