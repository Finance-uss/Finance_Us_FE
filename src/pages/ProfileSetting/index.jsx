import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
    Container,
    Title,
    Input,
    Message,
    CheckButton,
    InputContainer,
    ButtonContainer 
} from "../../styles/ProfileSetting/style";
import SubmitButton from '../../components/common/SubmitButton'; 
import Dropdown from '../../components/Dropdown'; 

const URL = import.meta.env.VITE_API_URL;

const ProfileSetting = () => {
    const navigate = useNavigate();
    const { formData, setFormField } = useAuth();
    const [customJob, setCustomJob] = useState(""); 
    const [nicknameError, setNicknameError] = useState("");
    const [nicknameValid, setNicknameValid] = useState("");
    const [introductionError, setIntroductionError] = useState(""); 
    const [buttonColor, setButtonColor] = useState("#d4d4d4"); 

    // AgeGroup과 JobCategory 매핑
    const ageGroupMapping = {
        "10대": "TEENS",
        "20대": "TWENTIES",
        "30대": "THIRTIES",
        "40대": "FORTIES",
        "50대": "FIFTIES",
        "60대 이상": "SIXTIES_AND_ABOVE"
    };

    const jobCategoryMapping = {
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
        "기타": "OTHERS"
    };

    const checkNickname = async () => {
        const nicknamePattern = /^[가-힣a-zA-Z]{1,10}$/;
        if (!nicknamePattern.test(formData.username)) {
            setNicknameError("한글 또는 영어 1~10자 이내여야 합니다.");
            setNicknameValid("");
            return;
        }

        try {
            const response = await axios.get(`${URL}/api/user/nameCheck`, { 
                params: { 
                    name: formData.username 
                } 
            });
            if(response.data.isSuccess) {
                setNicknameValid("사용 가능한 닉네임입니다.");
                setNicknameError("");
            } else {
                setNicknameError(response.data.message);
                setNicknameValid("");
            }
        } catch (error) {
            console.error(error);
            setNicknameError(error);
        }
    };

    const handleIntroductionChange = (e) => {
        setFormField("one_liner", e.target.value);

        if (e.target.value.length > 25) {
            setIntroductionError("글자 수 25자 이내여야 합니다.");
        } else {
            setIntroductionError("");
        }
    };

    const isFormComplete = formData.username && formData.ageGroup && (formData.jobCategory || customJob) && !nicknameError && !introductionError;

    const handleSubmit = async () => {
        if (isFormComplete) {
            try {
                console.log("회원가입 시도:", formData);


                const requestData = {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password, 
                    jobCategory: jobCategoryMapping[formData.jobCategory] || formData.jobCategory, // 매핑된 직업 카테고리
                    ageGroup: ageGroupMapping[formData.ageGroup] || formData.ageGroup, // 매핑된 나이대
                    one_liner: formData.one_liner
                };

                console.log("전송할 데이터:", requestData); 

                const response = await axios.post(`${URL}/api/auth/userSignup`, requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });

                if (response.data.isSuccess) {
                    console.log("회원가입 성공");
                    const { email, name, id, role } = response.data.result; 
                    console.log("사용자 정보:", { email, name, id, role });
                    navigate("/finance");
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    };

    useEffect(() => {
        setButtonColor(formData.username ? "#142755" : "#d4d4d4");
    }, [formData.username]);

    return (
        <Container>
            <Title>프로필 입력</Title>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="닉네임"
                    value={formData.username}
                    onChange={(e) => setFormField("username", e.target.value)}
                />
                <CheckButton 
                    onClick={checkNickname} 
                    style={{ backgroundColor: buttonColor }}
                >
                    중복 확인
                </CheckButton>
            </InputContainer>
            {nicknameError && <Message $error>{nicknameError}</Message>}
            {nicknameValid && <Message $valid>{nicknameValid}</Message>}
            
            <Dropdown 
                items={["10대", "20대", "30대", "40대", "50대", "60대 이상"]} 
                selectedItem={formData.ageGroup} 
                setSelectedItem={(value) => setFormField("ageGroup", value)} 
                placeholder="나이대" 
            />
            <Dropdown 
                items={[
                    "학생", "기획/전략", "마케팅/광고", "영업/판매", 
                    "재무/회계", "인사/교육", "고객 서비스", "IT/개발", 
                    "디자이너", "생산/품질 관리", "연구/설계", 
                    "전문직(의료/법률/회계 등)", "창업/프리랜서", 
                    "공공/행정직", "기타"
                ]} 
                selectedItem={formData.jobCategory} 
                setSelectedItem={(value) => {
                    setFormField("jobCategory", value);
                    if (value !== "기타") {
                        setCustomJob("");
                    }
                }} 
                placeholder="직업 (선택)" 
            />
            {formData.jobCategory === "기타" && (
                <Input
                    type="text"
                    placeholder="직업을 입력하세요"
                    value={customJob}
                    onChange={(e) => setCustomJob(e.target.value)}
                />
            )}
            <Input
                type="text"
                placeholder="25자 내 한 줄 소개 (선택)"
                value={formData.one_liner}
                onChange={handleIntroductionChange}
            />
            {introductionError && <Message $error>{introductionError}</Message>} 
            <ButtonContainer>
                <SubmitButton
                    text="프로필 완성"
                    onClick={handleSubmit}
                    customOpacity={isFormComplete ? 1 : 0.4}
                />
            </ButtonContainer>
        </Container>
    );
};

export default ProfileSetting;
