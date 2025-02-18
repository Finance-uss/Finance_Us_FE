import React, { createContext, useContext } from "react";
import { useForm } from "../hooks/useForm";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { formData, handleChange, setFormField } = useForm({
        email : "",
        username : "",
        password: "",
        token: "",
        jobCategory : "",
        ageGroup : "",
        one_liner : ""
    });
    

    return (
        <AuthContext.Provider 
            value={{ 
                formData, 
                handleChange, 
                setFormField 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);