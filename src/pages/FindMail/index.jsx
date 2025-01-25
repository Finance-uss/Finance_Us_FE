import React, { useState, useEffect } from "react";
import { Container, Title, Input, LinkContainer } from "../../styles/FindMail/style";
import SubmitButton from '../../components/common/SubmitButton';
import { useNavigate } from "react-router-dom"; 

const FindMail = () => {
    const navigate = useNavigate(); 
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState(""); 
    const [buttonOpacity, setButtonOpacity] = useState(0.4); 
    const [errorMessage, setErrorMessage] = useState(""); 

    const registeredUsers = [
        { nickname: "user", email: "user@example.com" },
        { nickname: "anotherUser", email: "another@example.com" }
    ];

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setErrorMessage(""); 
        setEmail(""); 
    };

    useEffect(() => {
        setButtonOpacity(nickname ? 1 : 0.4);
    }, [nickname]);

    const handleEmailFind = () => {
        const user = registeredUsers.find(user => user.nickname === nickname);

        if (user) {
            setEmail(user.email); 
            setErrorMessage(""); 
        } else {
            setErrorMessage("가입되지 않은 닉네임입니다."); 
            setEmail(""); 
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
