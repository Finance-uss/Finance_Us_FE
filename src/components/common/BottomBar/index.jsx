import React from "react";
import { useLocation } from "react-router-dom";
import { Bottom, Button, StyledIcon } from "../../../styles/common/BottomBar/style";
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

  return (
    <Bottom>
      <NavButton
        to="/finance"
        Icon={location.pathname === "/finance" ? FinanceIconActive : FinanceIconInactive}
        label="가계부"
        active={location.pathname === "/finance" ? "true" : "false"}
      />
      <NavButton
        to="/community"
        Icon={location.pathname === "/community" ? CommunityIconActive : CommunityIconInactive}
        label="커뮤니티"
        active={location.pathname === "/community" ? "true" : "false"}
      />
      <NavButton
        to="/statistics"
        Icon={location.pathname === "/statistics" ? StatisticsIconActive : StatisticsIconInactive}
        label="통계"
        active={location.pathname === "/statistics" ? "true" : "false"}
      />
      <NavButton
        to="/user"
        Icon={location.pathname === "/user" ? MypageIconActive : MypageIconInactive}
        label="마이페이지"
        active={location.pathname === "/user" ? "true" : "false"}
      />
    </Bottom>
  );
};

const NavButton = ({ to, Icon, label, active }) => {
  return (
    <Button to={to} active={active}>
      <StyledIcon src={Icon} alt={label} />
      {label}
    </Button>
  );
};

export default BottomBar;
