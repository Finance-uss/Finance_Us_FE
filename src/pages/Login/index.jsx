import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, Input, LinkContainer, ButtonContainer } from "../../styles/Login/style";
import SubmitButton from '../../components/common/SubmitButton';
import { useNavigate } from "react-router-dom"; 

const URL = import.meta.env.VITE_API_URL;

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

    const FindMail = async () => {
        try {
            const response = await axios.get(`${URL}/api/user/mailCheck`, {
                params: { email },
            });
            if(response.data.isSuccess) {
                setErrorMessage("계정이 존재하지 않습니다."); // 계정이 없으면 에러 메시지 설정
            }
            else{
                setErrorMessage("비밀번호가 일치하지 않습니다."); // 비밀번호가 일치하지 않으면 에러 메시지 설정
            }
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.")
        }
    };

    const handleLogin = async () => {

        if (email && password) {
            try {
                const response = await axios.post(`${URL}/api/auth/login`, {
                    email,
                    password,
                });
                // 입력한 이메일이 존재하는지 확인
                if (response.data.isSuccess) {
                    localStorage.setItem("token", response.data.result.token); // 토큰 저장
                    navigate("/finance"); // 존재하면 페이지 이동
                } else {
                    FindMail();
                }
            } catch (error) {
                FindMail();
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
