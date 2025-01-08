import React from 'react';
import CateButton from "../../components/common/CateButton";
import PlusButton from '../../components/common/PlusButton';
import TopBar from '../../components/common/TopBar';

const User = () => {
    const handleAdd = () => {
        alert('새로운 항목이 추가됨!');
    }

    const handleClose = () => {
        alert('엑스 버튼 클릭!');
      };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>마이페이지</h1>
            <div style={styles.buttonContainer}>
                <CateButton 
                    label="소분류" 
                    onClose={handleClose} 
                />
                <PlusButton
                    onClick={handleAdd}
                />
            </div>
            <TopBar />
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        minHeight: '100vh',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-start', // 버튼 왼쪽 정렬
        alignItems: 'center',
        gap: '16px', // 버튼 간 간격
        width: '100%',
    },
};

export default User;
