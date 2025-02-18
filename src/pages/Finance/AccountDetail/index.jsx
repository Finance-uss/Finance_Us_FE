import React from "react";
import { AccountDetailProvider } from "../../../contexts/AccountDetailContext";
import AccountDetailContent from "./AccountDetailContent";

const AccountDetail = () => {
    return (
        <AccountDetailProvider>
            <AccountDetailContent />
        </AccountDetailProvider>
    );
};

export default AccountDetail;