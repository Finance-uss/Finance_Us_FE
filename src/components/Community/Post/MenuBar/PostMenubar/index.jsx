import React, { useState } from 'react';
import * as S from '../../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../../assets/icons/common/X.svg';
import { useNavigate } from 'react-router-dom';
import { deletePost, getPost } from '../../../../../api/post';
import ConfirmModal from '../../../../User/ConfirmModal';

const PostMenuBar = ({ isOpen, closeModal, isOwner, onReport, postId }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleUpdate = async () => {
    try {
      const postData = await getPost(postId);
      navigate(`/community/update/${postId}`, { state: postData });
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      closeModal();
      navigate('/community');
    } catch (error) {
      console.error('삭제 실패:', error);
    }
    setDeleteModalOpen(false);
  };

  return (
    <S.ModalOverlay onClick={closeModal}>
      <S.ModalContent onClick={handleClick}>
        <S.Menu>
          {isOwner ? ( 
            <>
              <S.MenuItem onClick={handleUpdate}>게시글 수정</S.MenuItem>
              <S.MenuItem onClick={() => setDeleteModalOpen(true)}>게시글 삭제</S.MenuItem>
            </>
          ) : (
            <S.MenuItem onClick={onReport}>게시글 신고</S.MenuItem>
          )}
        </S.Menu>
        <S.CloseButton onClick={closeModal} src={closeIcon} alt="창닫기" />
      </S.ModalContent>

      {isDeleteModalOpen && (
        <ConfirmModal
          message="삭제하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      )}
    </S.ModalOverlay>
  );
};

export default PostMenuBar;
