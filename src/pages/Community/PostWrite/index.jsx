import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../../styles/Community/PostWrite/style';
import BeforeHeader from '../../../components/common/BeforeHeader';
import SubmitButton from '../../../components/common/SubmitButton';
import CameraIconSrc from '../../../assets/icons/common/Camera.svg';
import CateSelect from '../../../components/Community/Category/CateSelect';
import axiosInstance from '../../../api/axiosInstance';  // axiosInstance import 확인
import { createPost } from '../../../api/post';

const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        if (e.target.value.length <= 50) {
            setTitle(e.target.value);
        }
    };

    const handleContentChange = (e) => {
        if (e.target.value.length <= 1000) {
            setContent(e.target.value);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); 
        }
    };

    const handleSubmit = async () => {
        if (!title || !content || !selectedCategory) {
          alert('모든 필드를 입력해주세요.');
          return;
        }
        let postType = 'FREE'; 
        let category = ''; 
    
        switch (selectedCategory) {
            case '자유':
                category = 'FREE';
                break;
            case '정보':
                category = 'INFO';
                break;
            case '낭비했어요':
                category = 'WASTE';
                break;
            case '절약했어요':
                category = 'SAVE';
                break;
            case '칼럼':
                category = 'COLUMN';
                postType = 'INFO';
                break;
            case '강연':
                category = 'LECTURE';
                postType = 'INFO';
                break;
            case '홍보':
                category = 'PROMOTION';
                postType = 'INFO';
                break;
            default:
                category = 'FREE'; 
                break;
        }
    
        const postData = {
          title,
          content,
          postType,  
          category,  
          imageUrl: '',  
        };

        try {
            const response = await createPost(postData);
            if (response?.isSuccess) {
                navigate(`/community/postdetail/${response.result.postId}`);
            } else {
                alert('게시글 생성 실패: ' + response.message);
            }
        } catch (error) {
            alert('오류 발생: ' + error.message);
        }
      };
      

    return (
        <S.Container>
            <BeforeHeader text="게시글 작성" />
            <S.Wrapper>
                <CateSelect onCategoryChange={handleCategoryChange} isAuth={true} />
                <S.Title
                    placeholder="제목"
                    value={title}
                    onChange={handleTitleChange}
                    maxLength={50}
                />
                <S.Line />
                {imageFile && <S.ImagePreview src={URL.createObjectURL(imageFile)} alt="선택한 이미지" />}
                <S.Content
                    placeholder="내용 입력"
                    value={content}
                    onChange={handleContentChange}
                    maxLength={1000}
                />
            </S.Wrapper>
            <S.Footer>
            <S.CameraButton src={CameraIconSrc} alt="카메라 아이콘" onClick={() => document.getElementById("image-upload").click()}/>
            <input
                type="file"
                id="image-upload"
                onChange={handleImageChange} 
                accept="image/*"
                style={{ display: 'none' }}  
            />
            <SubmitButton text="작성 완료" disabled={!selectedCategory || !title || !content} onClick={handleSubmit} />
            </S.Footer>
        </S.Container>
    );
};

export default PostWrite;
