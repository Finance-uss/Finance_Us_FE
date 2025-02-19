import React, { useState, useEffect } from 'react';
import SubmitIcon from '../../../../../assets/icons/common/Community/CommentSubmit.svg';
import * as S from "../../../../../styles/Community/PostDetail/CommentInput/style";
import closeIcon from '../../../../../assets/icons/common/X.svg';

const CommentInput = ({ onSubmit, replyTo, content = '', isEditing = false, onCancel, commentId }) => {
  const [comment, setComment] = useState(content);

  useEffect(() => {
    if (replyTo) {
      setComment(`@${replyTo.userName} `); 
    } else if (isEditing) {
      setComment(content); 
    }
  }, [replyTo, content, isEditing]);

  const handleSubmit = () => {
    if (!comment.trim()) return; 
    onSubmit({content:comment, commentId}); 
    setComment(""); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <S.CommentInputContainer>
      <S.CommentInputBar
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={replyTo ? `@${replyTo.userName}님에게 답글 남기는 중..` : "Message"}  
      />
      {isEditing && <S.CancelButton src={closeIcon} alt="취소" onClick={onCancel}/>}
      <S.SubmitButton src={SubmitIcon} alt="댓글작성버튼" onClick={handleSubmit} />
    </S.CommentInputContainer>
  );
};

export default CommentInput;
