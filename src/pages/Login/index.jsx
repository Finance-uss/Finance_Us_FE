// src/pages/Login/index.jsx
import React, { useState, useEffect } from "react";
import { Container, Title, Input, LinkContainer, ButtonContainer } from "../../styles/Login/style";
import SubmitButton from '../../components/common/SubmitButton';
import { useNavigate } from "react-router-dom"; 


const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonOpacity, setButtonOpacity] = useState(0.4); 

    useEffect(() => {
        if (email && password) {
            setButtonOpacity(1);
        } else {
            setButtonOpacity(0.4);
        }
    }, [email, password]); 

    const handleLogin = () => {
        console.log("로그인 시도:", { email, password });
        if (email && password) {
            navigate("/finance");
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
            <ButtonContainer>
                <SubmitButton text="로그인" onClick={handleLogin} customOpacity={buttonOpacity} />
            </ButtonContainer>
            <LinkContainer>
                <span onClick={() => navigate("/login/findId")}>아이디 찾기</span>
                <span style={{ margin: "0 10px", color: "#b4b4b4" }}>|</span>
                <span onClick={() => navigate("/login/findPw")}>비밀번호 찾기</span>
            </LinkContainer>
        </Container>
    );
};

export default Login;