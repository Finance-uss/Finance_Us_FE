import React from "react";
import { Outlet } from "react-router-dom";
import { DateProvider } from "../../contexts/DateContext";

const Statistics = () => {
    return (
        <DateProvider>
            <Outlet/>
        </DateProvider>
    );
    
};

export default Statistics;