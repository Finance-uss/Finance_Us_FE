import React, { useState, useEffect } from 'react';
import * as S from '../../../../styles/User/Auth/style';
import BeforeHeader from '../../../../components/common/BeforeHeader';
import SubmitButton from '../../../../components/common/SubmitButton';
import ImageUploader from "../../../../components/User/ImageUploader";
import { authAPI } from "../../../../api/authAPI";
import useApi from "../../../../hooks/useApi.js";
import { postS3 } from "../../../../api/s3API.js";

const UserAuthWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [hasApplied, setHasApplied] = useState(false); // 인증 신청 여부 상태

    const request = useApi();

    // 페이지 로드 시 이미 신청 여부 확인
    useEffect(() => {
        const applied = localStorage.getItem('authApplied');
        if (applied === 'true') {
            setHasApplied(true);
        }
    }, []);

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

        // // 이미 신청한 경우
        // if (hasApplied) {
        //     alert("이미 인증 신청을 하셨습니다. 인증 완료까지는 1일~3일 정도 소요될 수 있습니다.");
        //     return;
        // }

        setLoading(true);
        try {
            let imgUrl = null;
            
            // 이미지 업로드 진행 (선택한 파일이 있는 경우)
            if (selectedFile) {
                const response = await request(postS3(selectedFile));
                imgUrl = response.result.imageUrl;
            }

            await authAPI.sendAuthRequest({ content, imgUrl });

            // 인증 신청이 성공하면 상태 업데이트 후 알림
            localStorage.setItem('authApplied', 'true');
            setHasApplied(true);

            alert("인증 요청이 완료되었습니다!");
            window.history.back(); // 이전 페이지로 돌아가기
        } catch (error) {
            alert("인증 요청에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

     // 이미지 삭제
    const handleImageDelete = () => {
        setSelectedFile(null); // 선택한 파일 상태 초기화
    };

    return (
        <S.Container>
            <BeforeHeader text="사용자 인증 뱃지 신청" />
            <S.Wrapper>
                <S.NoticeContainer>
                    <S.NoticeText>안녕하세요! 😊</S.NoticeText>
                    <S.NoticeText>
                    <S.Highlight>피너스 (Finance Us)</S.Highlight>를 이용해 주셔서 감사합니다.
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
                {selectedFile && (
                    <S.ImagePreviewWrapper>
                        <S.ImagePreview src={URL.createObjectURL(selectedFile)} alt="선택한 이미지" />
                        <S.DeleteButton onClick={handleImageDelete}>삭제</S.DeleteButton> {/* 삭제 버튼 추가 */}
                    </S.ImagePreviewWrapper>
                )}
                <S.Content
                    placeholder="본인이 해당하는 인증 기준과 증빙 자료 링크를 입력해주세요."
                    value={content}
                    onChange={handleContentChange}
                    maxLength={1000}
                />
            </S.Wrapper>
            <S.Footer>
            <ImageUploader key={selectedFile ? selectedFile.name : "image-uploader"} onFileSelect={setSelectedFile} /> {/* key 추가 */}
                <SubmitButton text="제출" disabled={!content || hasApplied} onClick={handleSubmit} />
            </S.Footer>
        </S.Container>
    );
};

export default UserAuthWrite;