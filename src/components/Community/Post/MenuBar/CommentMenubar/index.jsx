import React, { useState } from 'react';
import * as S from '../../../../../styles/Community/MenuBar/style';
import closeIcon from '../../../../../assets/icons/common/X.svg';
import useComment from '../../../../../hooks/useComment';
import ConfirmModal from '../../../../User/ConfirmModal';

const CommentMenuBar = ({ isOpen, closeModal, isOwner, commentId, onReport, onEditClick, onDelete, index }) => {
  if (!isOpen) return null;
  const { handleEditComment, deleteComment } = useComment(commentId); 
  const [editContent, setEditContent] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
  };


  const handleDelete = async () => {
    console.log('삭제 댓글 ID:', commentId);
    await deleteComment(commentId); 
    closeModal(); 
  };

  const topPosition = `${300 + index * 50}px`;

  return (
    <S.ModalOverlay onClick={closeModal} top={topPosition}>
      <S.ModalContent onClick={handleClick}>
        <S.Menu>
          {isOwner ? (
            <>
              <S.MenuItem onClick={() => {
                console.log("수정 버튼 클릭됨. commentID:",commentId);
                onEditClick(commentId, editContent);  // 부모 컴포넌트에서 수정 모드로 전환
                closeModal();
              }}>댓글 수정</S.MenuItem>
              <S.MenuItem onClick={() => setDeleteModalOpen(true)}>댓글 삭제</S.MenuItem>
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
