import React, { useState } from 'react';
import * as S from '../../../styles/Community/PostWrite/style';
import BeforeHeader from '../../../components/common/BeforeHeader';
import SubmitButton from '../../../components/common/SubmitButton';
import CameraIconSrc from '../../../assets/icons/common/Camera.svg';
import CateSelect from '../../../components/Community/Category/CateSelect';


const Community = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    return (
        <S.Container>
            <BeforeHeader text="게시글 작성" />
            <S.Wrapper>
                <CateSelect onCategoryChange={handleCategoryChange} />
                <S.Title
                    placeholder="제목"
                    value={title}
                    onChange={handleTitleChange}
                    maxLength={50}
                />
                <S.Line />
                <S.Content
                    placeholder="내용 입력"
                    value={content}
                    onChange={handleContentChange}
                    maxLength={1000}
                />
            </S.Wrapper>
            <S.CameraButton src={CameraIconSrc} alt="카메라 아이콘" />
            <SubmitButton text="작성 완료" disabled={!selectedCategory || !title || !content} />
        </S.Container>
    );
};

export default Community;
