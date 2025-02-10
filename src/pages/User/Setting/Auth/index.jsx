import React, { useState } from 'react';
import * as S from '../../../../styles/User/Auth/style';
import BeforeHeader from '../../../../components/common/BeforeHeader';
import SubmitButton from '../../../../components/common/SubmitButton';
import CameraIconSrc from '../../../../assets/icons/common/Camera.svg';
import CateSelect from '../../../../components/Community/Category/CateSelect';
import axiosInstance from '../../../../api/axiosInstance';  // axiosInstance import 확인

const PostWriteAuth = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); 
        }
    };

    const handleSubmit = async () => {
        console.log("버튼 실행");
        if (!selectedCategory || !title || !content ) {
            alert('항목을 입력해주세요.');
            return;
        }
        console.log("handleSubmit 실행!..");
        setLoading(true);
    };

    return (
        <S.Container>
            <BeforeHeader text="사용자 인증 뱃지 신청" />
            <S.Wrapper>
            <S.NoticeContainer>
                 {/* <S.NoticeTitle>사용자 인증 안내</S.NoticeTitle> */}
                 <S.NoticeText>안녕하세요! 😊</S.NoticeText>
                 <S.NoticeText>
                   피너스(<S.Highlight>Finance Us</S.Highlight>)를 이용해 주셔서 감사합니다.
                 </S.NoticeText>
                 <S.NoticeText>
                   더 나은 정보 제공을 위해 <S.Highlight>사용자 인증 제도</S.Highlight>를 운영하고 있습니다. <br/>
                   인증된 사용자만 <S.Highlight>정보게시판에 글을 작성할 수 있는 권한</S.Highlight>이 부여됩니다!
                 </S.NoticeText>

                 <S.NoticeTitle>💡 인증 시 이점</S.NoticeTitle>
                 <S.List>
                    <S.ListItem>
                      <S.Icon>✅</S.Icon> 정보게시판에 글 작성 가능
                    </S.ListItem>
                    <S.ListItem>
                      <S.Icon>✅</S.Icon> 검증된 사용자 간 신뢰를 바탕으로 한 커뮤니티 형성
                    </S.ListItem>
                 </S.List>

                 {/* <S.NoticeTitle>🔍 인증 조건</S.NoticeTitle>
                 <S.List>
                    <S.ListItem>
                      <S.Icon>1️⃣</S.Icon> 사용자 
                    </S.ListItem>
                    <S.ListItem>
                      <S.Icon>2️⃣</S.Icon> 관리자 확인 필요 (인증 요청 메일 전송)
                    </S.ListItem>
                 </S.List> */}
                 <S.NoticeText>
                  자세한 내용은 아래 노션 링크에서 확인해주시길 바랍니다. <br/>
                  <S.NoticeLink onClick={() => window.open('https://ultra-clove-3bf.notion.site/1888467e978880fcbad7ce9eb1a77627', '_blank')}>
                    사용자 인증 뱃지 안내 링크
                    </S.NoticeLink>


                 </S.NoticeText>
              </S.NoticeContainer>
                {/* <S.Title
                    placeholder="제목"
                    value={title}
                    onChange={handleTitleChange}
                    maxLength={50}
                /> */}
                <S.Line />
                {imageFile && <S.ImagePreview src={URL.createObjectURL(imageFile)} alt="선택한 이미지" />}
                <S.Content
                    placeholder="본인이 해당하는 인증 기준(예: 브런치 작가, 강연 경험 등)과 활동 증빙 링크(예: 인스타그램/브런치 링크, 강연 자료, 책 출간 정보 등)"
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
            <SubmitButton text="제출" disabled={!selectedCategory || !title || !content} onClick={handleSubmit} />
            </S.Footer>
            
        </S.Container>
    );
};

export default PostWriteAuth;
