import React, { useState } from 'react';
import * as S from '../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../assets/icons/common/X.svg';

const MenuBar = ({ isOpen, closeModal, isOwner, onEdit, onDelete, onReport, postId, commentId }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const type = postId ? "게시글" : commentId ? "댓글" : "";
  const editText = `${type} 수정`;
  const deleteText = `${type} 삭제`;
  const reportText = `${type} 신고`;

  return (
    <S.ModalOverlay onClick={closeModal}>
      <S.ModalContent
        onClick={handleClick}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
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

export default MenuBar;
