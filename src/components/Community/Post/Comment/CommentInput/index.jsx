import React, { useState, useEffect } from 'react';
import SubmitIcon from '../../../../../assets/icons/common/Community/CommentSubmit.svg';
import * as S from "../../../../../styles/Community/PostDetail/CommentInput/style";

const CommentInput = ({ onSubmit, replyTo, content = '', isEditing = false, onCancel }) => {
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
    console.log("댓글 입력 값:", comment);
    onSubmit(comment, replyTo?.parentCommentId); 
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
      <S.SubmitButton src={SubmitIcon} alt="댓글작성버튼" onClick={handleSubmit} />
      {isEditing && <button onClick={onCancel}>취소</button>}
    </S.CommentInputContainer>
  );
};

export default CommentInput;
