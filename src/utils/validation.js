export const isSubmitDisabled = (formData, requiredFields) => {
    return requiredFields.some((field) => {
      // status(불리언 필드)인 경우 false도 유효값으로 판단
        if (field === "status") {
            // status가 null/undefined가 아닌 이상, 항상 통과
            return formData[field] == null;
        }
    
        // 기본 로직
        return !formData[field] || formData[field].toString().trim() === "";
        });
    };