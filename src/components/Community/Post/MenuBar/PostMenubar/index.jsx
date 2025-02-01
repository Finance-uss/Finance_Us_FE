import React, { useState } from 'react';
import * as S from '../../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../../assets/icons/common/X.svg';

const PostMenuBar = ({ isOpen, closeModal, isOwner, onEdit, onDelete, onReport, postId}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });  
  if (!isOpen) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const editText = `게시글 수정`;
  const deleteText = `게시글 삭제`;
  const reportText = `게시글 신고`;

  return (
    <S.ModalOverlay onClick={closeModal}>
      <S.ModalContent
        onClick={handleClick}
      >
        <S.Menu>
          {isOwner ? (
            <>
              <S.MenuItem onClick={onEdit}>{editText}</S.MenuItem>
              <S.MenuItem onClick={onDelete}>{deleteText}</S.MenuItem>
            </>
          ) : (
            <S.MenuItem onClick={onReport}>{reportText}</S.MenuItem>
          )}
        </S.Menu>
        <S.CloseButton onClick={closeModal} src={closeIcon} alt="창닫기" />
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default PostMenuBar;
