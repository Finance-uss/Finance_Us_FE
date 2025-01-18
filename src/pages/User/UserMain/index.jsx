import React from 'react';
import styled from 'styled-components';

import UserProfile from '../../../components/User/UserProfile/index';
import SettingOption from '../../../components/User/SettingOption';
import SettingPanel from '../../../components/User/SettingPanel';
import SearchHeader from '../../../components/common/SearchHeader';
import BottomBar from '../../../components/common/BottomBar';

const UserMain = () => {
    const categoryOptions = [
        { label: '카테고리', path: 'category' },
        { label: '자산', path: 'assets' },
    ];
    
    const targetOptions = [
        { label: '지출', path: 'expense' },
        { label: '수익', path: 'income' }, //나중에 라우트 바꿈
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
                <SearchHeader />
                <PageTitle>마이 페이지</PageTitle>
            </HeaderWrapper>
            <UserProfile />
            <SettingOptionWrapper top="209px">
                <SettingOption title="가계부 분류 설정" options={categoryOptions} />
            </SettingOptionWrapper>
            <SettingOptionWrapper top="309px">
                <SettingOption title="목표 금액 설정" options={targetOptions} />
            </SettingOptionWrapper>
            <SettingOptionWrapper top="409px">
                <SettingOption title="커뮤니티" options={communityOptions} multiRow />
            </SettingOptionWrapper>
            <SettingPanelWrapper top="550px">
                <SettingPanel />
            </SettingPanelWrapper>
            <BottomBar />
        </UserMainContainer>
    );
};

export default UserMain;

const UserMainContainer = styled.div`
    display: flex;
    flex-direction: column; 
    width: 100%;
    justify-content: center; 
    align-items: center;
    margin: 20px auto;
`;

const HeaderWrapper = styled.div`
    position: fixed;
    z-index: 10;
    width: 100%;
    padding: 20px 0;
`;

const PageTitle = styled.div`
    position: absolute;
    top: 50%;
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

const SettingOptionWrapper = styled.div`
    position: absolute;
    top: ${(props) => props.top}; /* 각 요소의 고정 위치 설정 */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
`;

const SettingPanelWrapper = styled.div`
    position: absolute;
    top: ${(props) => props.top}; /* SettingsPanel의 top 값을 설정 */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: auto; /* 높이를 유동적으로 설정 */
    overflow: visible; /* 내부 요소가 잘리지 않도록 */
`;