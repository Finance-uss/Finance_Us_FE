import { createContext, useState } from "react";

export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    });

    return (
        <FinanceContext.Provider value={{selectedDate, setSelectedDate}}>
            {children}
        </FinanceContext.Provider>
    );
}