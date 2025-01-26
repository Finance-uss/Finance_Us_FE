import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDate } from '../contexts/DateContext';
import { useImageUploader } from '../hooks/useImageUploader';
import { useForm } from '../hooks/useForm';
import { useModalManager } from '../hooks/useModalManager';

const HandWriteContext = createContext();

export const HandWriteProvider = ({ children }) => {
    const { selectedDate } = useDate();
    const { imageUrl, handleImageUpload } = useImageUploader();
    const { formData, handleChange, setFormField } = useForm({
            accountType: "expense",
            date: selectedDate,
            subName: "",
            subAssetName: "",
            title: "",
            status: false,
            score: 0,
            imageUrl: imageUrl,
            content: ""
    });

    const modals = useModalManager(["calendarModal", "categoryModal", "assetModal", "ratingModal"]);

    const inputFields = [
        { label: "일자", name: "date", value: `${formData.date.year}년 ${formData.date.month}월 ${formData.date.day}일`, readOnly: true, onClick: modals.calendarModal.openModal },
        { label: "카테고리", name: "subName", value: formData.subName, placeholder: "(카테고리)", readOnly: true, onClick: modals.categoryModal.openModal },
        { label: "자산", name: "subAssetName", value: formData.subAssetName, placeholder: "(자산)", readOnly: true, onClick: modals.assetModal.openModal },
        { label: "금액", name: "amount", value: formData.amount, placeholder: "(금액)", onChange: handleChange },
        { label: "내용", name: "title", value: formData.title, placeholder: "(내용)", onChange: handleChange },
    ];

    useEffect(() => {
        setFormField("date", selectedDate);
        setFormField("imageUrl", imageUrl);
    }, [selectedDate, imageUrl]);

    return (
        <HandWriteContext.Provider 
            value={{ 
                formData, 
                handleChange, 
                setFormField, 
                modals, 
                imageUrl, 
                handleImageUpload, 
                inputFields 
            }}
        >
            {children}
        </HandWriteContext.Provider>
    );
};

export const useHandWrite = () => useContext(HandWriteContext);