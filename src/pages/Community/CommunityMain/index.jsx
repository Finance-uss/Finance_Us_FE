import React, { useState } from 'react';
import { Container, ProfileList } from '../../../styles/Community/CommunityMain/style';

import Profile from '../../../components/Community/Profile';
import icon from '../../../assets/icons/common/Community/exam.png';

import SearchHeader from '../../../components/common/SearchHeader';
import BottomBar from '../../../components/common/BottomBar';
import TopBar from '../../../components/common/TopBar';
import FloatingButton from '../../../components/common/FloatingButton/CommunityWriteButton';
import CateButton from '../../../components/Community/Category/CateButton';

const CommunityMain = () => {
    const [selectedTab, setSelectedTab] = useState(0); 

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    const categoryFreeBoard = ['자유', '정보', '낭비했어요', '절약했어요'];
    const categoryInfoBoard = ['칼럼', '강연', '홍보'];

    return (
        <Container>
            <SearchHeader/>
            <ProfileList>
                <Profile image={icon} name="김동글"/>
                <Profile image={icon} name="김동글"/>
                <Profile image={icon} name="김동글"/>
                <Profile image={icon} name="김동글"/>
            </ProfileList>
            <TopBar 
                leftText="자유게시판" 
                rightText="정보게시판" 
                onTabClick={handleTabClick} 
                selectedTab={selectedTab} 
            />
            {/* selectedTab 값에 따라 다른 카테고리 버튼 렌더링 */}
            {selectedTab === 0 && <CateButton categories={categoryFreeBoard}/>}
            {selectedTab === 1 && <CateButton categories={categoryInfoBoard}/>}

            <FloatingButton/>
            <BottomBar/>
        </Container>
    );
};

export default CommunityMain;
