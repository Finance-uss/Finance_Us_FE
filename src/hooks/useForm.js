import { useState } from "react";

export const useForm = (initialValues = {}) => {
    const [formData, setFormData] = useState(initialValues);

    const setFormField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField(name, value);
    };

    return {
        formData,
        handleChange,
        setFormField,
    };
};
