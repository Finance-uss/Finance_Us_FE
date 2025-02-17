import React, { useState } from 'react';
import * as S from '../../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../../assets/icons/common/X.svg';
import useComment from '../../../../../hooks/useComment';
import ConfirmModal from '../../../../User/ConfirmModal';

const CommentMenuBar = ({ commentId, isOpen, closeModal, isOwner, onReport, index, onEdit, onDelete }) => {
  if (!isOpen) return null;
  const [editContent, setEditContent] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    if (editContent.trim()) {
      onEdit(commentId, editContent);
      closeModal();
    }
  };

  const handleDelete = async () => {
  if (!commentId) {
    console.error("commentId가 undefined입니다!");
    return;
  }
      try {
        await onDelete(commentId);
        closeModal();
      } catch (error) {
        console.error('삭제 실패:', error);
      }
      setDeleteModalOpen(false);
    };
    const topPosition = `${300 + index * 50}px`;
  return (
    <S.ModalOverlay onClick={closeModal} top={topPosition}>
      <S.ModalContent onClick={handleClick}>
        <S.Menu>
          {isOwner ? (
            <>
              <S.MenuItem onClick={handleEdit}>댓글 수정</S.MenuItem>
              <S.MenuItem onClick={handleDelete}>댓글 삭제</S.MenuItem>
            </>
          ) : (
            <S.MenuItem onClick={onReport}>댓글 신고</S.MenuItem>
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

export default CommentMenuBar;
