import React, { useState } from 'react';
import { PanelContainer, SectionTitle, Item } from '../../../styles/User/SettingPanel/style';
import Toggle from '../Toggle/index';
import { useNavigate } from 'react-router-dom';

const SettingPanel = () => {
    const navigate = useNavigate();
    const [isNotificationOn, setIsNotificationOn] = useState(false);
    const [isAccountPublic, setIsAccountPublic] = useState(false);

    const handleToggle = (setter, messageOn, messageOff) => (newValue) => {
        setter(newValue); // 상태 업데이트
        setTimeout(() => {
            alert(newValue ? messageOn : messageOff); // 상태 변경 후 알림 표시
        }, 200); // 모션이 끝난 후 실행
    };

    const handleNavigation = (path) => () => {
        navigate(path);
    };

    return (
        <PanelContainer>
            {/* 설정 섹션 */}
            <SectionTitle>설정</SectionTitle>
            <Item>
                <span>알림</span>
                <Toggle id="notification-toggle" onChange={(e) => handleToggle(setIsNotificationOn, '알림을 켬', '알림을 끔')(e.target.checked)} />
            </Item>
            <Item>
                <span>계정 공개 여부</span>
                <Toggle id="account-public-toggle" onChange={(e) => handleToggle(setIsAccountPublic, '계정이 공개됨', '계정이 비공개됨')(e.target.checked)} />
            </Item>
            <Item onClick={handleNavigation('calendar')}>캘린더 관리</Item>

            {/* 개인 정보 변경 섹션 */}
            <SectionTitle>개인 정보 변경</SectionTitle>
            <Item onClick={handleNavigation('profile-edit')}>프로필 변경</Item>
            <Item onClick={handleNavigation('email-edit')}>이메일 변경</Item>
            <Item onClick={handleNavigation('password-edit')}>비밀번호 변경</Item>

            {/* 계정 정보 섹션 */}
            <SectionTitle>계정 정보</SectionTitle>
            <Item onClick={handleNavigation('logout')}>로그아웃</Item>
            <Item onClick={handleNavigation('delete-account')}>회원 탈퇴</Item>
        </PanelContainer>
    );
};

export default SettingPanel;
