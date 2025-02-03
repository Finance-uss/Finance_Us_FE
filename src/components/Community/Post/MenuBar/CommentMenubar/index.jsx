import React, { useState } from 'react';
import * as S from '../../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../../assets/icons/common/X.svg';
import useComment from '../../../../../hooks/useComment';

const CommentMenuBar = ({ isOpen, closeModal, isOwner, commentId, onReport }) => {
  if (!isOpen) return null;
  const { handleEditComment, handleDeleteComment, comments, setComments } = useComment(); 
  const [editContent, setEditContent] = useState('');

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    if (editContent.trim()) {
      handleEditComment(commentId, content);
      closeModal();
    }
  };

  const handleDelete = async () => {
    console.log('삭제 댓글 ID:', commentId);
    await handleDeleteComment(commentId); 
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId)); 
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
