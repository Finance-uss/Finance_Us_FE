import React, { useState } from 'react';
import * as S from '../../../../styles/User/Auth/style';
import BeforeHeader from '../../../../components/common/BeforeHeader';
import SubmitButton from '../../../../components/common/SubmitButton';
import CameraIconSrc from '../../../../assets/icons/common/Camera.svg';
import axiosInstance from '../../../../api/axiosInstance'; 
import ImageUploader from "../../../../components/User/ImageUploader";
import { authAPI } from "../../../../api/authAPI";
import { uploadImageToS3 } from "../../../../utils/uploadImage"

const PostWriteAuth = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); 
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

    const handleSubmit = async () => {
        if (!content) {
            alert("항목을 입력해주세요.");
            return;
        }

        setLoading(true);
        try {
            let imgUrl = null;
            
            // 이미지 업로드 진행 (선택한 파일이 있는 경우)
            if (selectedFile) {
                const uploadResponse = await uploadImageToS3(selectedFile);
                console.log(uploadResponse);
                imgUrl = uploadResponse.result.imageUrl;
                console.log("imageUrl", imgUrl);
            }

            await authAPI.sendAuthRequest({ content, imgUrl });
            alert("인증 요청이 완료되었습니다!");
        } catch (error) {
            alert("인증 요청에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>
            <BeforeHeader text="사용자 인증 뱃지 신청" />
            <S.Wrapper>
                <S.NoticeContainer>
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
                    <S.NoticeText>
                        자세한 내용은 아래 노션 링크에서 확인해주시길 바랍니다. <br/>
                        <S.NoticeLink onClick={() => window.open('https://ultra-clove-3bf.notion.site/1888467e978880fcbad7ce9eb1a77627', '_blank')}>
                            사용자 인증 뱃지 안내 링크
                        </S.NoticeLink>
                    </S.NoticeText>
                </S.NoticeContainer>
                <S.Line />
                <S.Content
                    placeholder="본인이 해당하는 인증 기준과 증빙 자료 링크를 입력해주세요."
                    value={content}
                    onChange={handleContentChange}
                    maxLength={1000}
                />
            </S.Wrapper>
            <S.Footer>
                <ImageUploader onFileSelect={setSelectedFile} />
                <SubmitButton text="제출" disabled={!content} onClick={handleSubmit} />
            </S.Footer>
        </S.Container>
    );
};

export default PostWriteAuth;  