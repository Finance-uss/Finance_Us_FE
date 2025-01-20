import React, { useState } from 'react';
import { TopContainer, LeftTopButton, RightTopButton, TopText, LeftTopUnderline, RightTopUnderline } from '../../../styles/common/TopBar/style';
import underline from '../../../assets/icons/common/Hide-Indicator.svg';

const TopBar = ({ leftText, rightText, onTabClick, selectedTab }) => {
    // 내부 상태로 기본 동작 처리 (기존 코드와 호환)
    const [internalTab, setInternalTab] = useState(0);
    const isControlled = selectedTab !== undefined && onTabClick;

    // 선택된 탭 결정 (외부에서 전달된 상태 or 내부 상태)
    const activeTab = isControlled ? selectedTab : internalTab;
  
    const handleTabClick = (index) => {
      if (isControlled) {
        // 외부 상태 관리 함수 호출
        onTabClick(index);
      } else {
        // 내부 상태 업데이트 (기존 동작 유지)
        setInternalTab(index);
      }
    };
  
    return (
      <TopContainer>
        {/* 왼쪽 버튼 */}
        <LeftTopButton onClick={() => handleTabClick(0)}>
          <TopText isSelected={activeTab === 0}>{leftText}</TopText>
          {activeTab === 0 && <LeftTopUnderline src={underline} alt="underline" />}
        </LeftTopButton>
  
        {/* 오른쪽 버튼 */}
        <RightTopButton onClick={() => handleTabClick(1)}>
          <TopText isSelected={activeTab === 1}>{rightText}</TopText>
          {activeTab === 1 && <RightTopUnderline src={underline} alt="underline" />}
        </RightTopButton>
      </TopContainer>
    );
};

export default TopBar;
