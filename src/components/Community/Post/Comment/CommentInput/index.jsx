import React, { useState, useEffect } from 'react';
import SubmitIcon from '../../../../../assets/icons/common/Community/commentSubmit.svg';
import * as S from "../../../../../styles/Community/PostDetail/CommentInput/style";

const CommentInput = ({ onSubmit, replyTo }) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (replyTo) {
      setComment(`@${replyTo} `);
    }
  }, [replyTo]);

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
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
        placeholder={replyTo ? `@${replyTo}님에게 답글 남기는 중..` : "Message"}
      />
      <S.SubmitButton src={SubmitIcon} alt="댓글작성버튼" onClick={handleSubmit} />
    </S.CommentInputContainer>
  );
};

export default CommentInput;
