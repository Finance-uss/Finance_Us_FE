import React, { useState, useEffect } from "react";
import { Container, Title, Input, LinkContainer, ButtonContainer } from "../../styles/Login/style";
import SubmitButton from '../../components/common/SubmitButton';
import { useNavigate } from "react-router-dom"; 

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonOpacity, setButtonOpacity] = useState(0.4); 
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

    useEffect(() => {
        if (email && password) {
            setButtonOpacity(1);
            setErrorMessage(""); // 로그인 시도 시 에러 메시지 초기화
        } else {
            setButtonOpacity(0.4);
        }
    }, [email, password]); 

    const handleLogin = () => {
        console.log("로그인 시도:", { email, password });
        
        // 예시: 존재하는 계정 리스트
        const existingAccounts = ["user1@example.com", "user2@example.com", "user3@example.com"]; // 실제 계정 리스트로 대체 필요

        if (email && password) {
            // 입력한 이메일이 존재하는지 확인
            if (existingAccounts.includes(email)) {
                navigate("/finance"); // 존재하면 페이지 이동
            } else {
                setErrorMessage("계정이 존재하지 않습니다."); // 계정이 없으면 에러 메시지 설정
            }
        }
    };

    return (
        <Container>
            <Title>로그인</Title>
            <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* 에러 메시지 표시 */}
            <ButtonContainer>
                <SubmitButton text="로그인" onClick={handleLogin} customOpacity={buttonOpacity} />
            </ButtonContainer>
            <LinkContainer>
                <span onClick={() => navigate("/findMail")}>이메일 찾기</span>
                <span style={{ margin: "0 10px", color: "#b4b4b4" }}>|</span>
                <span onClick={() => navigate("/findPw")}>비밀번호 찾기</span>
            </LinkContainer>
        </Container>
    );
};

export default Login;
