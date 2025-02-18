import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, Input, LinkContainer, ButtonContainer, ErrorMessage } from "../../styles/Login/style"; 
import SubmitButton from '../../components/common/SubmitButton';
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../contexts/AuthContext"; 

const URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate(); 
    const { setFormField } = useAuth(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonOpacity, setButtonOpacity] = useState(0.4); 
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (email && password) {
            setButtonOpacity(1);
            setErrorMessage("");
        } else {
            setButtonOpacity(0.4);
        }
    }, [email, password]); 

    const mailCheck = async () => {
        try {
            const response = await axios.get(`${URL}/api/user/mailCheck`, {
                params: { email },
            });
            return response.data.isSuccess;
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
            return false; 
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setErrorMessage("이메일 형식이 올바르지 않습니다.");
            return;
        }
        if (email && password) {
            const accountExists = await mailCheck();

            if (!accountExists) {
                setErrorMessage("계정이 존재하지 않습니다.");
                return;
            }
            try {
                const response = await axios.post(`${URL}/api/auth/login`, {
                    email,
                    password,
                });

                if (response.data.isSuccess) {
                    const token = response.data.result.token;
                    localStorage.setItem("token", token); 
                    setFormField("token", token); 
                    navigate("/finance");
                } else {
                    setErrorMessage("비밀번호가 일치하지 않습니다.");
                }
            } catch (error) {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
            }
        } else {
            setErrorMessage("이메일과 비밀번호를 잘못 입력하셨습니다.");
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
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
