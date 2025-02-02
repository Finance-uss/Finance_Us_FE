import React from 'react';
import SubmitButton from '../../components/common/SubmitButton';
import Logo from '../../assets/icons/common/Logo.svg';
import Subtitle from '../../assets/icons/common/Subtitle.svg';
import { useNavigate } from "react-router-dom";


const Onboarding = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login"); // 로그인 페이지로 이동
    };

    const handleSignUpClick = () => {
        navigate("/signup"); // 회원가입 페이지로 이동
    };

    return (
        <div style={styles.container}>
            <img src={Logo} alt="Finus" style={styles.image} />
            <img src={Subtitle} alt="text" style={styles.subtitle} />
            <div style={styles.buttonContainer}>
                <SubmitButton text="로그인하기" onClick={handleLoginClick} />
                <SubmitButton text="가입하기" onClick={handleSignUpClick} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        padding: '20px',
    },
    image: {
        width: '380px',
        height: 'auto',
        marginBottom: '20px',
        marginLeft: '16px',
        marginTop: '200px',
    },
    subtitle: {
        width: '181px',
        height: 'auto',
        margin: '0 192px 20px 20px',
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '15px',
        margin: '300px 16px 15px 16px',
    },
};

export default Onboarding;