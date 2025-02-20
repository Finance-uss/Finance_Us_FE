import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { PanelContainer, SectionTitle, Item } from '../../../styles/User/SettingPanel/style';
import Toggle from '../Toggle/index';
import ConfirmModal from '../ConfirmModal';
import { useNavigate } from 'react-router-dom';

const SettingPanel = () => {
    const navigate = useNavigate();
    const [isNotificationOn, setIsNotificationOn] = useState(true);
    const [isAccountPublic, setIsAccountPublic] = useState(true);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [authToken, setAuthToken] = useState(null); 

    useEffect(() => {
        const fetchToken = () => {
            const token = localStorage.getItem("token");  // 🔹 'token' 키 사용 (일관성 유지)
            console.log("🟡 현재 저장된 토큰:", token);
            setAuthToken(token);

            // Axios 기본 헤더에 토큰 설정
            if (token) {
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        };

        fetchToken();
        window.addEventListener("storage", fetchToken);
        return () => {
            window.removeEventListener("storage", fetchToken);
        };
    }, []);

    const createDefaultUserSettings = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("🚨 로그인 필요: 토큰이 없습니다.");
                return;
            }
    
            console.log("🔹 [PATCH 요청] 기본 회원 설정 생성");
    
            const defaultSettings = {
                openSwitch: true,
                alarmSwitch: true,
            };
    
            const response = await axiosInstance.patch("/api/user/user-preference", null, {
                headers: { Authorization: `Bearer ${token}` },
                params: defaultSettings, // params로 기본 설정 전달
            });
    
            console.log("✅ 기본 회원 설정 생성 완료:", response.data);
        } catch (error) {
            console.error("⚠️ 기본 회원 설정 생성 오류:", error);
        }
    };
    
    useEffect(() => {
        const fetchUserSettings = async () => {
            try {
                const token = localStorage.getItem("token"); //  토큰 가져오기
                if (!token) {
                    console.error("로그인 필요: 토큰이 없습니다.");
                    return;
                }
        
                console.log("🟡 회원 설정 조회 API 요청 중...");
        
                const response = await axiosInstance.get("/api/user/user-preference", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
        
                console.log("회원 설정 조회 성공:", response.data);
                if (response.data.isSuccess) {
                    const userSettings = response.data.result;
                    setIsNotificationOn(userSettings.alarmSwitch ?? true);  // 알림 설정 반영
                    setIsAccountPublic(userSettings.openSwitch ?? true);    // 계정 공개 여부 반영
                } else {
                    console.warn("회원 설정 조회 실패:", response.data.message);
                }
            } catch (error) {
                console.error("⚠️ 회원 설정 조회 오류:", error);
                if (error.response?.status === 404) {
                    console.warn("📌 회원 설정이 없음 → 기본 설정 생성 실행");
                    await createDefaultUserSettings();
                }
            }
        };

        fetchUserSettings();
    }, [authToken]);

    const updateUserSetting = async (settingKey, value) => {
        if (!authToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        const updateData = { [settingKey]: value };
        console.log(`🔹 [PATCH 요청] ${settingKey} 변경:`, updateData);

        try {
            const response = await axiosInstance.patch('/api/user/user-preference', null, { 
                headers: { Authorization: `Bearer ${authToken}` },
                params: updateData // 🔹 params로 전달
            });

            console.log("✅ 설정 변경 성공:", response.data);
        } catch (error) {
            console.error("⚠️ 설정 변경 오류:", error);
        }
    };

    const handleNotificationToggle = (newValue) => {
        setIsNotificationOn(newValue);
        updateUserSetting("alarmSwitch", newValue);
    };

    const handleAccountToggle = (newValue) => {
        setIsAccountPublic(newValue);
        updateUserSetting("openSwitch", newValue);
    };

    const handleNavigation = (path) => () => {
        navigate(path);
    };

    const handleLogout = () => {
        console.log("🚪 로그아웃 시도 중...");

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        sessionStorage.clear();

        delete axiosInstance.defaults.headers.common["Authorization"];
        setAuthToken(null);

        window.location.href = '/';
    };

    const handleDeleteAccount = async () => {
        if (!authToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        console.log("[DELETE 요청] 회원 탈퇴 API 호출 중...");
        try {
            const response = await axiosInstance.delete('/api/user', {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            console.log("회원 탈퇴 응답 데이터:", response.data);

            if (response.data.isSuccess) {
                alert("회원 탈퇴가 성공적으로 처리되었습니다.");
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                sessionStorage.clear();
                window.location.href = '/';
            } else {
                alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("⚠️ 회원 탈퇴 오류:", error);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

    const handleCloseModal = () => {
        navigate('/'); // 온보딩 화면으로 이동
    };

    const handleOutNavigation = (path) => {
        // 외부 페이지 이동 처리
        if (path.startsWith('http')) {
            window.open(path, '_blank'); // 새 창에서 열기
        } else {
            navigate(path);
        }
    };

    return (
        <PanelContainer>
            {/* 설정 섹션 */}
            <SectionTitle>설정</SectionTitle>
            <Item>
                <span>알림</span>
                <Toggle 
                    id="notification-toggle" 
                    checked={isNotificationOn}
                    onChange={(e) => handleNotificationToggle(e.target.checked)} 
                />
            </Item>
            <Item>
                <span>계정 공개 여부</span>
                <Toggle 
                    id="account-public-toggle" 
                    checked={isAccountPublic}
                    onChange={(e) => handleAccountToggle(e.target.checked)} 
                />
            </Item>
            <Item onClick={handleNavigation('calendar')}>캘린더 관리</Item>

            {/* 개인 정보 변경 섹션 */}
            <SectionTitle>개인 정보 변경</SectionTitle>
            <Item onClick={handleNavigation('profile-edit')}>프로필 변경</Item>
            <Item onClick={handleNavigation('email-edit')}>이메일 변경</Item>
            <Item onClick={handleNavigation('password-edit')}>비밀번호 변경</Item>

            {/* 계정 정보 섹션 */}
            <SectionTitle>계정 정보</SectionTitle>
            <Item onClick={() => handleOutNavigation('/user/auth')}>
                인증 뱃지 신청하기
            </Item>
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
