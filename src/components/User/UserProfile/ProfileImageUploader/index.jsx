import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { postS3, deleteS3 } from "../../../../api/s3API";
import defaultImage from "../../../../assets/icons/common/Community/commentProfile.svg";
import useApi from "../../../../hooks/useApi.js";
import {imageUpload } from "../../../../api/userImageAPI";
import styled from "styled-components";

const ProfileImageUploader = ({ imgUrl, onUpdateImage }) => {
  const [image, setImage] = useState(imgUrl || defaultImage); // 초기 이미지
  const fileInputRef = useRef(null);
  const { request } = useApi();

  useEffect(() => {
    if (imgUrl) {
      setImage(imgUrl); // 🔥 imgUrl이 변경되면 반영
    }
  }, [imgUrl]);

  /** 프로필 사진 클릭 시 파일 선택창 열기 */
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  /** 새 이미지 업로드 핸들러 */
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {

      // 기존 이미지 삭제 (있다면)
      if (imgUrl && imgUrl !== defaultImage) {
        const imageName = imgUrl.split("/").pop(); // 기존 파일명 추출
        const response = await request(deleteS3(imageName));
        console.log(response);
      }

      // 새 이미지 업로드
      
    const newresponse = await request(postS3(file));
    console.log(newresponse);

    if (newresponse.isSuccess) {
        const newImageUrl = newresponse.result.imageUrl;
        const newImageName = newresponse.result.imageName;

        // 이미지 업데이트
        setImage(newImageUrl);
        onUpdateImage(newImageUrl); // 부모 컴포넌트로 변경된 이미지 전달

        // 서버에 프로필 사진 업데이트
        const response = await request({ ...imageUpload(newImageUrl, newImageName) });
        console.log(response);
        
      } else {
        console.error("이미지 업로드 실패:", newresponse.message);
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
    }
  };

  return (
    <ImageContainer>
      <ProfileImage src={image} alt="Profile" onClick={handleImageClick} />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </ImageContainer>
  );
};

export default ProfileImageUploader;

// 스타일링
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

