import React, { createContext, useState, useContext } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    });

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => useContext(DateContext);