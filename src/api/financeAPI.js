export const postAccount = (data) => {
    return {
        method: "POST",
        url: "/api/account",
        data,
    };
};

export const postAccountReceipt = (file) => {
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

export const deleteAccount = (accountId) => {
    return {
        method: "DELETE",
        url: `/api/account/${accountId}`,
    };
};

export const patchAccount = (accountId, data) => {
    return {
        method: "PATCH",
        url: `/api/account/${accountId}`,
        data,
    };
};

export const getCalendarMonth = (year, month) => {
    return {
        method: "GET",
        url: `/api/calendar/${year}/${month}`,
    };
};

export const getCalendarDay = (year, month, day) => {
    return {
        method: "GET",
        url: `/api/calendar/${year}/${month}/${day}`,
    };
};