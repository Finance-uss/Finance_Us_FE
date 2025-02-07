import React, { useState } from 'react';
import * as S from '../../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../../assets/icons/common/X.svg';

const PostMenuBar = ({ isOpen, closeModal, isOwner, onEdit, onDelete, onReport, postId}) => { 
  if (!isOpen) return null;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <S.ModalOverlay onClick={closeModal} >
      <S.ModalContent
        onClick={handleClick}
      >
        <S.Menu>
          {isOwner ? (
            <>
              <S.MenuItem onClick={onEdit}>게시글 수정</S.MenuItem>
              <S.MenuItem onClick={onDelete}>게시글 삭제</S.MenuItem>
            </>
          ) : (
            <S.MenuItem onClick={onReport}>게시글 신고</S.MenuItem>
          )}
        </S.Menu>
        <S.CloseButton onClick={closeModal} src={closeIcon} alt="창닫기" />
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default PostMenuBar;
