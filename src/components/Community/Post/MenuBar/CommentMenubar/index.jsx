import React, { useState } from 'react';
import * as S from '../../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../../assets/icons/common/X.svg';
import useComment from '../../../../../api/useComment';

const CommentMenuBar = ({ isOpen, closeModal, isOwner, commentId, onReport }) => {
  if (!isOpen) return null;
  // const isOwner = true;
  const { updateComment, deleteComment } = useComment();  
  const [editContent, setEditContent] = useState('');

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    if (editContent.trim()) {
      updateComment(commentId, editContent); 
      closeModal();
    }
  };

  const handleDelete = () => {
    deleteComment(commentId);
    closeModal();
  };

  return (
    <S.ModalOverlay onClick={closeModal}>
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
    </S.ModalOverlay>
  );
};

export default CommentMenuBar;
