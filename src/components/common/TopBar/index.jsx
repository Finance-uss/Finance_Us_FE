import React, { useState } from 'react';
import {
  TopContainer,
  LeftTopButton,
  RightTopButton,
  TopText,
  LeftTopUnderline,
  RightTopUnderline
} from '../../../styles/common/TopBar/style';
import underline from '../../../assets/icons/common/Hide-Indicator.svg';

const TopBar = ({ leftText, rightText }) => {
  const [selectedTab, setSelectedTab] = useState(0); // 기본 왼쪽(선택1) 활성화

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <TopContainer>
      {/* 왼쪽 버튼 */}
      <LeftTopButton onClick={() => handleTabClick(0)}>
        <TopText $isSelected={selectedTab === 0}>{leftText}</TopText> {/* $isSelected로 변경 */}
        {selectedTab === 0 && <LeftTopUnderline src={underline} alt="underline" />}
      </LeftTopButton>

      {/* 오른쪽 버튼 */}
      <RightTopButton onClick={() => handleTabClick(1)}>
        <TopText $isSelected={selectedTab === 1}>{rightText}</TopText> {/* $isSelected로 변경 */}
        {selectedTab === 1 && <RightTopUnderline src={underline} alt="underline" />}
      </RightTopButton>
    </TopContainer>
  );
};

export default TopBar;
