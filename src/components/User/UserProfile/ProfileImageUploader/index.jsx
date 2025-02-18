import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import defaultImage from "../../../../assets/icons/common/Community/commentProfile.svg";
import useApi from "../../../../hooks/useApi.js";
import { postS3, deleteS3 } from "../../../../api/s3API";
import { imageUpload } from "../../../../api/userImageAPI";

const ProfileImageUploader = ({ imgUrl, imageName, onUpdateImage }) => {
  const [image, setImage] = useState(imgUrl || defaultImage);
  const [currentImageName, setCurrentImageName] = useState(imageName || "");
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef(null);
  const { request } = useApi();

  useEffect(() => {
    setImage(imgUrl || defaultImage);
    setCurrentImageName(imageName || "");
  }, [imgUrl, imageName]);

  const handleImageClick = () => {
    setShowOptions(true);
  };

  const handleImageDelete = async () => {
    if (image !== defaultImage) {
      try {
        // await request(deleteS3(currentImageName));
        setImage(defaultImage);
        setCurrentImageName("");
        onUpdateImage("", ""); // 🔥 삭제 후 빈 값 전달
        setShowOptions(false);
      } catch (error) {
        console.error("이미지 삭제 실패:", error);
      }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {

      const newResponse = await request(postS3(file));

      if (newResponse.isSuccess) {
        const newImageUrl = newResponse.result.imageUrl;
        const newImageName = newResponse.result.imageName;
        console.log(newImageName);
        setImage(newImageUrl);
        setCurrentImageName(newImageName);
        onUpdateImage(newImageUrl, newImageName); // 🔥 이미지 URL과 이름 전달

        setShowOptions(false);
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
    }
  };

  return (
    <>
      <ProfileImage src={image} alt="Profile" onClick={handleImageClick} />

      {showOptions && (
        <ModalOverlay onClick={() => setShowOptions(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalOption onClick={() => fileInputRef.current.click()}>이미지 변경</ModalOption>
            <ModalOption onClick={handleImageDelete}>이미지 삭제</ModalOption>
            <ModalOption onClick={() => setShowOptions(false)}>닫기</ModalOption>
          </ModalContent>
        </ModalOverlay>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </>
  );
};

export default ProfileImageUploader;

// ✅ 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalOption = styled.div`
  font-size: 16px;
  color: #000000;
  padding: 10px 0;
  width: 100%;
  cursor: pointer;
  text-align: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  &:hover {
    font-weight: bold;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
