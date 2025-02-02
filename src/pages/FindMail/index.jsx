import React, { useState, useEffect } from "react";
import axios from "axios"; // axios 추가
import { Container, Title, Input, LinkContainer } from "../../styles/FindMail/style";
import SubmitButton from '../../components/common/SubmitButton';
import { useNavigate } from "react-router-dom"; 

const URL = import.meta.env.VITE_API_URL; // API URL 가져오기

const FindMail = () => {
    const navigate = useNavigate(); 
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState(""); 
    const [buttonOpacity, setButtonOpacity] = useState(0.4); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const [authorization, setAuthorization] = useState(""); // Authorization 상태 추가

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
            // API 요청
            const response = await axios.patch(`${URL}/api/user/resetMail`, {
                headers: {
                    'Authorization': `Bearer ${authorization}`, // Authorization 헤더 추가
                },
                params: {
                    email: formData.email // 닉네임으로 이메일 찾기
                }
            });

            if (response.data.isSuccess) {
                setEmail(response.data.result.email); // 이메일 설정
                setErrorMessage(""); 
            } else {
                setErrorMessage("가입되지 않은 닉네임입니다."); 
                setEmail(""); 
            }
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요."); // 에러 처리
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
                <p style={{ color: "red", marginTop: "10px", marginBottom: "10px" }}>
                    {errorMessage}
                </p>
            )}
            {email && ( 
                <p style={{ color: "#142755", marginTop: "10px" }}>
                    이메일은 {email}입니다.
                </p>
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
