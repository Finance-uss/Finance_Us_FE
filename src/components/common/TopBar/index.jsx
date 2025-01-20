import React from 'react';
import { TopContainer, LeftTopButton, RightTopButton, TopText, LeftTopUnderline, RightTopUnderline } from '../../../styles/common/TopBar/style';
import underline from '../../../assets/icons/common/Hide-Indicator.svg';

const TopBar = ({ leftText, rightText, onLeftClick, onRightClick, selectedTab }) => {
    return (
        <TopContainer>
            {/* 왼쪽 버튼 */}
            <LeftTopButton onClick={onLeftClick}>
                <TopText isSelected={selectedTab === 0}>{leftText}</TopText>
                {selectedTab === 0 && <LeftTopUnderline src={underline} alt="underline" />}
            </LeftTopButton>

            {/* 오른쪽 버튼 */}
            <RightTopButton onClick={onRightClick}>
                <TopText isSelected={selectedTab === 1}>{rightText}</TopText>
                {selectedTab === 1 && <RightTopUnderline src={underline} alt="underline" />}
            </RightTopButton>
        </TopContainer>
    );
};

export default TopBar;
