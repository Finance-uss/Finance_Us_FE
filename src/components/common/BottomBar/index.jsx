import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bottom, Button, StyledIcon}from '../../../styles/common/BottomBar/style';
import FinanceIconActive from "../../../assets/icons/common/Bottombar/FinanceActive.svg";
import FinanceIconInactive from "../../../assets/icons/common/Bottombar/Finance.svg";
import CommunityIconActive from "../../../assets/icons/common/Bottombar/CommunityActive.svg";
import CommunityIconInactive from "../../../assets/icons/common/Bottombar/Community.svg";
import StatisticsIconActive from "../../../assets/icons/common/Bottombar/StatisticsActive.svg";
import StatisticsIconInactive from "../../../assets/icons/common/Bottombar/Statistics.svg";
import MypageIconActive from "../../../assets/icons/common/Bottombar/MypageActive.svg";
import MypageIconInactive from "../../../assets/icons/common/Bottombar/Mypage.svg";

const BottomBar = () => {
  const location = useLocation(); 
  const [activeIcon, setActiveIcon] = useState(location.pathname); 
  const handleClick = (path) => {
    setActiveIcon(path);
  };

  return (
    <Bottom>
      <NavButton
        to="/finance"
        Icon={activeIcon === "/finance" ? FinanceIconActive : FinanceIconInactive}
        label="가계부"
        onClick={() => handleClick("/finance")}
        active={location.pathname === "/finance" ? "true" : "false"}
      />
      <NavButton
        to="/community"
        Icon={activeIcon === "/community" ? CommunityIconActive : CommunityIconInactive}
        label="커뮤니티"
        onClick={() => handleClick("/community")}
        active={location.pathname === "/community" ? "true" : "false"}
      />
      <NavButton
        to="/statistics"
        Icon={activeIcon === "/statistics" ? StatisticsIconActive : StatisticsIconInactive}
        label="통계"
        onClick={() => handleClick("/statistics")}
        active={location.pathname === "/statistics"? "true" : "false"}
      />
      <NavButton
        to="/user"
        Icon={activeIcon === "/user" ? MypageIconActive : MypageIconInactive}
        label="마이페이지"
        onClick={() => handleClick("/user")}
        active={location.pathname === "/user"? "true" : "false"}
      />
    </Bottom>
  );
};

const NavButton = ({ to, Icon, label, onClick, active }) => {
  return (
    <Button to={to} active={active} onClick={onClick}>
      <StyledIcon src={Icon} alt={label} />
      {label}
    </Button>
  );
};

export default BottomBar;
