import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

        const existingNicknames = ["홍길동", "이순신"]; 
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

        if (value.length > 25) {
            setIntroductionError("글자 수 25자 이내여야 합니다.");
        } else {
            setIntroductionError("");
        }
    };

    // introduction을 선택 사항으로 변경
    const isFormComplete = nickname && age && (job || customJob) && !nicknameError && !introductionError;

    const handleSubmit = () => {
        if (isFormComplete) {
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
            
            <Dropdown 
                items={["10대", "20대", "30대", "40대", "50대", "60대 이상"]} 
                selectedItem={age} 
                setSelectedItem={setAge} 
                placeholder="나이대" // 추가된 부분
            />
            <Dropdown 
                items={[
                    "학생", "기획/전략", "마케팅/광고", "영업/판매", 
                    "재무/회계", "인사/교육", "고객 서비스", "IT/개발", 
                    "디자이너", "생산/품질 관리", "연구/설계", 
                    "전문직(의료/법률/회계 등)", "창업/프리랜서", 
                    "공공/행정직", "기타"
                ]} 
                selectedItem={job} 
                setSelectedItem={(value) => {
                    setJob(value);
                    if (value !== "기타") {
                        setCustomJob("");
                    }
                }} 
                placeholder="직업 (선택)" 
            />
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
