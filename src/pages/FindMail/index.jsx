import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, Input, LinkContainer, Message } from "../../styles/FindMail/style"; // Message 임포트
import SubmitButton from '../../components/common/SubmitButton';
import { useNavigate } from "react-router-dom"; 

const URL = import.meta.env.VITE_API_URL;

const FindMail = () => {
    const navigate = useNavigate(); 
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState(""); 
    const [buttonOpacity, setButtonOpacity] = useState(0.4); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const [authorization, setAuthorization] = useState("");
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setErrorMessage(""); 
        setEmail(""); 
    };

    useEffect(() => {
        setButtonOpacity(nickname ? 1 : 0.4);
    }, [nickname]);

    const handleEmailFind = async () => {
        try {
            const response = await axios.get(`${URL}/api/user/findMail`, {
                headers: {
                    'Authorization': `Bearer ${authorization}`, 
                },
                params: {
                    name: nickname
                }
            });

            if (response.data.isSuccess) {
                setEmail(response.data.result.Email); 
                setErrorMessage(""); 
            } else {
                setErrorMessage("가입되지 않은 닉네임입니다."); 
                setEmail(""); 
            }
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요."); 
        }
    };

    return (
        <Container>
            <Title>이메일 찾기</Title>
            <Input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={handleNicknameChange}
            />
            {errorMessage && ( 
                <Message $error>{errorMessage}</Message> 
            )}
            {email && ( 
                <Message>{`이메일은 ${email}입니다.`}</Message> 
            )}
            
            <SubmitButton 
                text="이메일 찾기" 
                onClick={handleEmailFind} 
                customOpacity={buttonOpacity} 
            />
            
            <LinkContainer>
                <span style={{ color: "#b4b4b4" }} onClick={() => navigate("/login")}>로그인하기</span> 
                <span style={{ margin: "0 10px", color: "#b4b4b4" }}>|</span>
                <span style={{ color: "#b4b4b4" }} onClick={() => navigate("/findPw")}>비밀번호 찾기</span>
            </LinkContainer>
        </Container>
    );
};

export default FindMail;
