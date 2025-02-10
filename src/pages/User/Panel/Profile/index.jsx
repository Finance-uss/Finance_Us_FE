import React from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import ChangeProfile from '../../../../components/User/ChangeProfile';
import ProfileForm from '../../../../components/User/ProfileForm';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const ChangeProfilePage = () => {
    const navigate = useNavigate();

    const profileData = {
        name: '김우원',
        age: '20대',
        job: '대학생',
        intro: '멍청소비 그만!',
    };
   
    const handleBackClick = () => {
        navigate('/user');
    };

    // 완료 버튼 클릭 시 저장 로직
    const handleSave = () => {
        console.log('프로필 저장 완료');
        navigate('/user');
    };

    const handleImageSelect = (file) => {
        console.log('선택된 파일:', file);
        // 파일 업로드 처리 로직 추가 예정
    };

    return (
        <Container>
            <BackHeader title="프로필 변경" onBackClick={handleBackClick} />
            <ChangeProfileSection>
                <ChangeProfile />
            </ChangeProfileSection>
            <ProfileFormSection>
                <ProfileForm initialData={profileData} />
            </ProfileFormSection>
            <CompleteButtonComponent label="프로필 변경 완료" onSave={handleSave} />
        </Container>
    );
};

export default ChangeProfilePage;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 0 20px 24px 20px; 
    gap: 20px;
`;

const ChangeProfileSection = styled.div`
    position: relative;
    margin-top: 20px; 
    left: 0; /* 왼쪽 정렬 */
`;

const ProfileFormSection = styled.div`
    margin-top: 20px; 
`;