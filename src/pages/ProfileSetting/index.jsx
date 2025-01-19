import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Title,
    Input,
    Select,
    Message,
    CheckButton,
    InputContainer,
    ButtonContainer 
} from "../../styles/ProfileSetting/style";
import SubmitButton from '../../components/common/SubmitButton'; 

const ProfileSetting = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [job, setJob] = useState("");
    const [customJob, setCustomJob] = useState(""); 
    const [introduction, setIntroduction] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [nicknameValid, setNicknameValid] = useState("");
    const [introductionError, setIntroductionError] = useState(""); 
    const [buttonColor, setButtonColor] = useState("#d4d4d4"); 

    const checkNickname = () => {
        const nicknamePattern = /^[가-힣]{1,10}$/; 
        if (!nicknamePattern.test(nickname)) {
            setNicknameError("한글 1~10자 이내여야 합니다.");
            setNicknameValid("");
            return;
        }

        const existingNicknames = ["홍길동", "이순신"]; // 예시 중복 닉네임
        if (existingNicknames.includes(nickname)) {
            setNicknameError("중복되는 닉네임 입니다.");
            setNicknameValid("");
        } else {
            setNicknameError("");
            setNicknameValid("사용 가능한 닉네임입니다.");
        }
    };

    const handleIntroductionChange = (e) => {
        const value = e.target.value;
        setIntroduction(value);

        // 글자 수 체크
        if (value.length > 25) {
            setIntroductionError("글자 수 25자 이내여야 합니다.");
        } else {
            setIntroductionError("");
        }
    };

    const isFormComplete = nickname && age && (job || customJob) && introduction && !nicknameError && !introductionError;

    const handleSubmit = () => {
        if (isFormComplete) {
            // 가계부 페이지로 이동
            navigate("/finance");
        }
    };

    useEffect(() => {
        setButtonColor(nickname ? "#142755" : "#d4d4d4");
    }, [nickname]);

    return (
        <Container>
            <Title>프로필 입력</Title>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="닉네임 (한글 1~10자)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
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
            
            <Select
                value={age}
                onChange={(e) => setAge(e.target.value)}
            >
                <option value="">나이대 선택</option>
                <option value="10대">10대</option>
                <option value="20대">20대</option>
                <option value="30대">30대</option>
                <option value="40대">40대</option>
                <option value="50대">50대</option>
                <option value="60대 이상">60대 이상</option>
            </Select>
            <Select
                value={job}
                onChange={(e) => {
                    setJob(e.target.value);
                    if (e.target.value !== "기타") {
                        setCustomJob(""); 
                    }
                }}
            >
                <option value="">직업 (선택)</option>
                <option value="학생">학생</option>
                <option value="기획/전략">기획/전략</option>
                <option value="마케팅/광고">마케팅/광고</option>
                <option value="영업/판매">영업/판매</option>
                <option value="재무/회계">재무/회계</option>
                <option value="인사/교육">인사/교육</option>
                <option value="고객 서비스">고객 서비스</option>
                <option value="IT/개발">IT/개발</option>
                <option value="디자이너">디자이너</option>
                <option value="생산/품질 관리">생산/품질 관리</option>
                <option value="연구/설계">연구/설계</option>
                <option value="전문직(의료/법률/회계 등)">전문직(의료/법률/회계 등)</option>
                <option value="창업/프리랜서">창업/프리랜서</option>
                <option value="공공/행정직">공공/행정직</option>
                <option value="기타">기타 (직접 입력)</option>
            </Select>
            {job === "기타" && (
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
                value={introduction}
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
