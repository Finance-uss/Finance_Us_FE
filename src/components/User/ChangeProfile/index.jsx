import React, { useRef, useState } from 'react';
import { ProfileContainer, ProfileText, ProfileButton, ProfileImage, HiddenInput } from '../../../styles/User/ChangeProfile/style'; // 스타일 경로
import ProfilePlaceholder from '../../../assets/icons/common/User/ChangeProfile.svg';

const ChangeProfile = ({ onImageSelect }) => {
    const [profileImage, setProfileImage] = useState(ProfilePlaceholder); // 초기값은 기본 프로필 이미지
    const fileInputRef = useRef(null);

    // 버튼 클릭 시 파일 입력창 열기
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // 파일 선택 시 호출되는 함수
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // 선택된 파일의 URL 생성
            setProfileImage(imageUrl); // 프로필 이미지를 선택된 파일로 업데이트
            if (onImageSelect) {
                onImageSelect(file); // 부모 컴포넌트에 선택된 파일 전달
            }
        }
    };

    return (
        <ProfileContainer>
            <ProfileText>프로필 사진</ProfileText>
            <ProfileButton onClick={handleButtonClick}>
                <ProfileImage src={profileImage} alt="프로필 이미지" />
            </ProfileButton>
            <HiddenInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </ProfileContainer>
    );
};

export default ChangeProfile;