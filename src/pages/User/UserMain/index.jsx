import React from 'react';
import styled from 'styled-components';

import UserProfile from '../../../components/User/UserProfile/index';
import SettingOption from '../../../components/User/SettingOption';
import SettingPanel from '../../../components/User/SettingPanel';
import SearchHeader from '../../../components/common/SearchHeader';
import BottomBar from '../../../components/common/BottomBar';

const UserMain = () => {
    const categoryOptions = [
        { label: '카테고리', path: 'expense-category' },
        { label: '자산', path: 'assets' },
    ];
    
    const targetOptions = [
        { label: '지출', path: 'expense' },
        { label: '수익', path: 'income' }, 
    ];

    const communityOptions = [
        { label: '내가 작성한 글', path: 'my-posts'},
        { label: '내가 좋아요한 글', path: 'liked-posts'},
        { label: '내가 댓글 단 글', path: 'commented-posts'},
        { label: '내가 스크랩한 글', path: 'scrapped-posts'},
    ]

    return (
        <UserMainContainer>
            <HeaderWrapper>
                <PageTitle>마이 페이지</PageTitle>
                <SearchHeaderWrapper>
                    <SearchHeader />
                </SearchHeaderWrapper>
            </HeaderWrapper>
            <ContentContainer>
                <UserProfileWrapper>
                    <UserProfile />
                </UserProfileWrapper>
                <SettingOption title="가계부 분류 설정" options={categoryOptions} />
                <SettingOption title="목표 금액 설정" options={targetOptions} />
                <SettingOption title="커뮤니티" options={communityOptions} multiRow />
                <SettingPanelWrapper>
                    <SettingPanel />
                </SettingPanelWrapper>
            </ContentContainer>
            <BottomBarWrapper>
                <BottomBar />
            </BottomBarWrapper>
        </UserMainContainer>
    );
};

export default UserMain;

const UserMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    padding-top: 120px;
`;

const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 12vh; 
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background: #ffffff;
    z-index: 100;
`;

const PageTitle = styled.div`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    font-weight: 700;
    line-height: 33px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin: 0;
`;

const SearchHeaderWrapper = styled.div`
    position: absolute;
    top: 45px; /* 원하는 위치로 조정 */
    right: 20px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    padding: 20px;
    align-items: center;
    margin-top: 50px;
`;

const UserProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px; 
    margin-bottom: 20px;
`;

const BottomBarWrapper = styled.div`
    position: sticky;
    bottom: 0;
    width: 100%;
    z-index: 10;
`;

const SettingPanelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;
