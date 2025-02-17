import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../../../api/axiosInstance';
import BackHeader from '../../../../components/User/BackHeader';
import ChangeProfile from '../../../../components/User/ChangeProfile';
import ProfileForm from '../../../../components/User/ProfileForm';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const ChangeProfilePage = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: '',
        ageGroup: '',
        jobCategory: '', 
        one_liner: '',
        imgUrl: ''
    });
    const [nicknameMessage, setNicknameMessage] = useState('');
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [originalName, setOriginalName] = useState("");

    const handleBackClick = () => {
        navigate('/user');
    };

    // 회원 정보 조회 API 호출
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get("/api/user");
                if (response.data.isSuccess) {
                    const userData = response.data.result;
                    console.log("회원 정보 조회 성공:", userData);

                    setProfileData({
                        id: userData.id || "",
                        name: userData.name || "",
                        ageGroup: userData.age || "", 
                        jobCategory: userData.job || "", 
                        one_liner: userData.one_liner || "",
                        imgUrl: userData.imgUrl || "",
                    });
                    setOriginalName(userData.name);
                }
            } catch (error) {
                console.error("회원 정보 조회 실패:", error);
            }
        };

        fetchProfileData();
    }, []);

    if (!profileData) return null;

    // 닉네임 중복 확인 (디바운싱 적용)
    const checkNickname = async (name) => {
        if (!name.trim()) {
            setNicknameMessage('');
            setIsNicknameValid(false);
            return;
        }
        try {
            console.log(`닉네임 중복 확인 요청: ${name}`);
            const response = await axiosInstance.get(`/api/user/nameCheck?name=${name}`);
            if (response.data.isSuccess) {
                setNicknameMessage('사용 가능한 닉네임입니다.');
                setIsNicknameValid(true);
                console.log('사용 가능한 닉네임');
            } else {
                setNicknameMessage('이미 사용 중인 닉네임입니다.');
                setIsNicknameValid(false);
                console.log('닉네임 중복됨');
            }
        } catch (error) {
            console.error('닉네임 중복 확인 오류:', error);
            setNicknameMessage("닉네임 확인 중 오류 발생");
            setIsNicknameValid(false);
        }
    };

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));

        if (name === 'name' && value !== originalName) {
            checkNickname(value); // 닉네임 입력 시 실시간 중복 확인
        }
    };
    
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const token = localStorage.getItem("token"); // Bearer 토큰 가져오기
            if (!token) {
                throw new Error("토큰이 없습니다.");
            }

            const response = await axiosInstance.post('/api/user/image', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // 토큰을 실제 값으로 변경
                },
            });
    
            if (response.data.isSuccess) {
                setProfileData((prev) => ({ ...prev, imgUrl: response.data.result.imageUrl }));
                alert('프로필 사진이 성공적으로 업로드되었습니다.');
            }
        } catch (error) {
            console.error('이미지 업로드 오류:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    // 프로필 이미지 선택 핸들러
    const handleImageSelect = (file) => {
        handleImageUpload(file);
    };

    // 프로필 저장
    const handleSave = async () => {
        if (profileData.name !== originalName && !isNicknameValid) {
            console.log("⚠️ 닉네임 확인 필요 (중복 검사 미통과)");
            alert("닉네임을 확인해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            const ageGroupMap = {
                "10대": "TEENS",
                "20대": "TWENTIES",
                "30대": "THIRTIES",
                "40대": "FORTIES",
                "50대": "FIFTIES",
                "60대 이상": "SIXTIES_AND_ABOVE"
            };
    
            const jobCategoryMap = {
                "학생": "STUDENT",
                "기획/전략": "PLANNING_STRATEGY",
                "마케팅/광고": "MARKETING_ADVERTISING",
                "영업/판매": "SALES",
                "재무/회계": "FINANCE_ACCOUNTING",
                "인사/교육": "HR_EDUCATION",
                "고객 서비스": "CUSTOMER_SERVICE",
                "IT/개발": "IT_DEVELOPMENT",
                "디자이너": "DESIGNER",
                "생산/품질 관리": "MANUFACTURING_QUALITY_CONTROL",
                "연구/설계": "RESEARCH_DESIGN",
                "전문직(의료/법률/회계 등)": "PROFESSIONAL",
                "창업/프리랜서": "ENTREPRENEUR_FREELANCER",
                "공공/행정직": "PUBLIC_ADMINISTRATION",
                "기타 (직접 입력)": "OTHERS"
            };

            const sendData = {
                id: profileData.id || "",
                name: profileData.name || "",
                ageGroup: ageGroupMap[profileData.ageGroup],
                jobCategory: jobCategoryMap[profileData.jobCategory],
                one_liner: profileData.one_liner || "",
                imgUrl: profileData.imgUrl || "",
            };

            console.log("[PATCH 요청] 회원 정보 수정 API 호출");
            console.log("보낼 데이터 구조 확인:", JSON.stringify(sendData, null, 2));

            const response = await axiosInstance.patch('/api/user', sendData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("[PATCH 응답] 서버 응답:", response);

            if (response.data.isSuccess) {
                alert("프로필이 성공적으로 변경되었습니다.");
                console.log("회원 정보 수정 완료!");
            }
            else {
                console.log("회원 정보 수정 실패:", response.data);
            }
        } catch (error) {
            console.error("프로필 변경 오류:", error);
            if (error.response) {
                console.error("🚨 서버 응답 상태 코드:", error.response.status);
                console.error("🚨 서버 응답 데이터:", error.response.data);
            }
            alert("프로필 변경에 실패했습니다.");
        }
    };
    
    const handleComplete = async () => {
        await handleSave();
        navigate('/user'); // 완료 후 User 페이지로 이동
    };

    return (
        <Container>
            <BackHeader title="프로필 변경" onBackClick={handleBackClick} />
            <ChangeProfileSection>
                <ChangeProfile onImageSelect={handleImageSelect} />
            </ChangeProfileSection>
            <ProfileFormSection>
                <ProfileForm 
                    initialData={profileData} 
                    onChange={handleChange} 
                    nicknameMessage={nicknameMessage}  
                    isNicknameValid={isNicknameValid} 
                />
            </ProfileFormSection>
            <CompleteButtonComponent label="프로필 변경 완료" onSave={handleComplete} />
        </Container>
    );
};

export default ChangeProfilePage;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 0 20px 24px 20px; 
    gap: 20px;
`;

const ChangeProfileSection = styled.div`
    position: relative;
    margin-top: 20px; 
    left: 0; /* 왼쪽 정렬 */
`;

const ProfileFormSection = styled.div`
    margin-top: 20px; 
`;
