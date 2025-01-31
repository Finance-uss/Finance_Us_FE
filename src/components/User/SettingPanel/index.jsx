import React, { useState } from 'react';
import { PanelContainer, SectionTitle, Item } from '../../../styles/User/SettingPanel/style';
import Toggle from '../Toggle/index';
import ConfirmModal from '../ConfirmModal';
import { useNavigate } from 'react-router-dom';

const SettingPanel = () => {
    const navigate = useNavigate();
    const [isNotificationOn, setIsNotificationOn] = useState(false);
    const [isAccountPublic, setIsAccountPublic] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleToggle = (setter, messageOn, messageOff) => (newValue) => {
        setter(newValue); // 상태 업데이트
        setTimeout(() => {
            alert(newValue ? messageOn : messageOff); // 상태 변경 후 알림 표시
        }, 200); 
    };

    const handleNavigation = (path) => () => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // 예제: 토큰 삭제
        navigate('/onboarding'); // 온보딩 화면으로 이동
    };

    const handleDeleteAccount = () => {
        // ✅ API 없이 바로 탈퇴 완료 모달 띄우기 (테스트용)
        localStorage.removeItem('authToken'); // 토큰 삭제
        setIsCompleted(true); // 탈퇴 완료 모달 띄우기
    };

    const handleCloseModal = () => {
        navigate('/onboarding'); // 온보딩 화면으로 이동
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
            <Item onClick={handleLogout}>로그아웃</Item>
            <Item onClick={() => setDeleteModalOpen(true)}>회원 탈퇴</Item>

            {/* 회원 탈퇴 확인 모달 */}
            {isDeleteModalOpen && (
                <ConfirmModal
                    message="회원 탈퇴하시겠습니까?"
                    confirmText="탈퇴하기"
                    cancelText="취소"
                    onConfirm={handleDeleteAccount}
                    onCancel={() => setDeleteModalOpen(false)}
                />
            )}

            {/* 회원 탈퇴 완료 모달 */}
            {isCompleted && (
                <ConfirmModal
                    message="탈퇴하였습니다."
                    confirmText="닫기"
                    onConfirm={handleCloseModal}
                />
            )}
        </PanelContainer>
    );
};

export default SettingPanel;
