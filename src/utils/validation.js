export const isSubmitDisabled = (formData, requiredFields) => {
    return requiredFields.some(field => 
        !formData[field] || formData[field].toString().trim() === ""
    );
};