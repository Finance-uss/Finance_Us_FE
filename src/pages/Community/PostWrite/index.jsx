import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../../../styles/Community/PostWrite/style';
import BeforeHeader from '../../../components/common/BeforeHeader';
import SubmitButton from '../../../components/common/SubmitButton';
import CameraIconSrc from '../../../assets/icons/common/Camera.svg';
import CateSelect from '../../../components/Community/Category/CateSelect';
import { createPost, updatePost, getPost } from '../../../api/post';

const PostWrite = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (postId) { // postId가 있을 때만 호출
      const fetchPost = async () => {
        try {
          const response = await getPost(postId);
          const postData = response.result;
          console.log(postData);
          setTitle(postData.title);
          setContent(postData.content);
          setSelectedCategory(postData.category);  // 카테고리 값을 받아옴
          setImageFile(postData.imageUrl);
        } catch (error) {
          console.error('게시글 불러오기 실패:', error);
        }
      };
      fetchPost();
    }
  }, [postId]);

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
    setSelectedCategory(category); // 카테고리 값 업데이트
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !selectedCategory) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    let postType = 'FREE';
    let category = '';

    switch (selectedCategory) {
      case '자유': category = 'FREE'; break;
      case '정보': category = 'INFO'; break;
      case '낭비했어요': category = 'WASTE'; break;
      case '절약했어요': category = 'SAVE'; break;
      case '칼럼': category = 'COLUMN'; postType = 'INFO'; break;
      case '강연': category = 'LECTURE'; postType = 'INFO'; break;
      case '홍보': category = 'PROMOTION'; postType = 'INFO'; break;
      default: category = 'FREE'; break;
    }

    const postData = {
      title,
      content,
      postType,
      category,
      imageUrl: '', // TODO: 이미지 업로드 처리 필요
    };

    try {
      if (postId) {  // 게시글 수정
        const response = await updatePost(postId, postData);
        if (response?.isSuccess) {
          navigate(`/community/postdetail/${postId}`);
        } else {
          alert('게시글 수정 실패: ' + response.message);
        }
      } else {  // 게시글 작성
        const response = await createPost(postData);
        if (response?.isSuccess) {
          navigate(`/community/postdetail/${response.result.postId}`);
        } else {
          alert('게시글 생성 실패: ' + response.message);
        }
      }
    } catch (error) {
      alert('오류 발생: ' + error.message);
    }
  };

  return (
    <S.Container>
      <BeforeHeader text={postId ? '게시글 수정' : '게시글 작성'} />
      <S.Wrapper>
        <CateSelect
          onCategoryChange={handleCategoryChange} 
          isAuth={true} 
          selectedCategory={selectedCategory} // 부모에서 받아온 selectedCategory 값 전달
        />
        <S.Title
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
          maxLength={50}
        />
        <S.Line />
        {imageFile && (
          <S.ImagePreview
            src={imageFile.startsWith('http') ? imageFile : URL.createObjectURL(imageFile)}
            alt="선택한 이미지"
          />
        )}
        <S.Content
          placeholder="내용 입력"
          value={content}
          onChange={handleContentChange}
          maxLength={1000}
        />
      </S.Wrapper>
      <S.Footer>
        <S.CameraButton
          src={CameraIconSrc}
          alt="카메라 아이콘"
          onClick={() => document.getElementById("image-upload").click()}
        />
        <input
          type="file"
          id="image-upload"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <SubmitButton
          text={postId ? '수정 완료' : '작성 완료'}
          disabled={!selectedCategory || !title || !content}
          onClick={handleSubmit}
        />
      </S.Footer>
    </S.Container>
  );
};

export default PostWrite;
