import React from 'react';
import styled from 'styled-components';

import Profile from '../../components/Community/Profile';
import icon from '../../assets/icons/common/Community/exam.png';

import SearchHeader from '../../components/common/SearchHeader';
import BottomBar from '../../components/common/BottomBar';
import TopBar from '../../components/common/TopBar';
import FloatingButton from '../../components/common/FloatingButton/CommunityWriteButton';
import CateButton from '../../components/Community/Category/CateButton';

const Community = () => {
    return (
        <>
        <Container>
            <SearchHeader/>
            <ProfileList>
                <Profile image={icon} name="김동글"/>
                <Profile image={icon} name="김동글"/>
                <Profile image={icon} name="김동글"/>
                <Profile image={icon} name="김동글"/>
            </ProfileList>
            <TopBar leftText="자유게시판" rightText="정보게시판"/>
            <CateButton/>
            <FloatingButton/>
            <BottomBar/>
        </Container>
        
        </>
    );
};

export default Community;

const ProfileList = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: flex-start; 
`;
const Container = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin:20px auto;
    padding-bottom: 65px;
    // background-color: #142755;
`;