import React, { useState } from "react";
import * as S from "../../../../styles/Community/PostDetail/Content/style";
import moreIcon from "../../../../assets/icons/common/Community/more.svg";
import submitIcon from "../../../../assets/icons/common/Community/CommentSubmit.svg";

const Comment = ({ comments, handleAddComment }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <S.CommentSection>
        {comments.map((comment, index) => (
          <S.CommentItem key={index}>
            <S.CommentAuthor>{comment.author}</S.CommentAuthor>
            <S.CommentText>{comment.text}</S.CommentText>
            <S.CommentDate>{comment.date}</S.CommentDate>
            <S.StatIcon src={moreIcon} alt="더보기 아이콘" onClick={toggleMenu} />
          </S.CommentItem>
        ))}
      </S.CommentSection>

      <S.CommentInputWrapper>
        <S.CommentInput
          placeholder="Message"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              handleAddComment(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <S.CommentSubmit
          onClick={() => {
            const input = document.querySelector("input");
            if (input.value.trim()) {
              handleAddComment(input.value);
              input.value = "";
            }
          }}
        >
          <img src={submitIcon} alt="댓글 등록 아이콘" style={{ width: "16px", height: "19px" }} />
        </S.CommentSubmit>
      </S.CommentInputWrapper>
    </>
  );
};

export default Comment;
