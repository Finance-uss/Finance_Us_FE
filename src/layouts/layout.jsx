import React from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import SearchHeader from "../components/common/SearchHeader";
import CommunityWriteButton from "../components/common/FloatingButton/CommunityWriteButton";
import FinanceButton from "../components/common/FloatingButton/FinancePlusButton";

const Layout = () => {
  const location = useLocation(); 

  const floatingButton = () => {
    if (location.pathname === "/finance") {
      return <FinanceButton />;
    } else if (location.pathname === "/community") {
      return <CommunityWriteButton />;
    }
    return null; 
  };

  return (
    <div>
      <SearchHeader />
      {/* <TopBar /> */}
      {floatingButton()} 
      <BottomBar />
    </div>
  );
};

export default Layout;
