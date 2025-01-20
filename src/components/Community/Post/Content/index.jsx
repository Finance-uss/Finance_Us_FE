import React, { useState } from "react";
import * as S from "../../../../styles/Community/PostDetail/Content/style";
import likeIcon from "../../../../assets/icons/common/Community/heart.svg";
import commentIcon from "../../../../assets/icons/common/Community/comment.svg";
import moreIcon from "../../../../assets/icons/common/Community/more.svg";
import examIcon from "../../../../assets/icons/common/Community/exam.png";
import bookmarkIcon from "../../../../assets/icons/common/bookmark.svg";

const Content = ({ commentsLength, toggleMenu, isMenuOpen }) => {
  return (
    <S.PageContainer>
      <S.PostConatiner>
        <S.Header>
          <S.Title>멍청비용 또 늘었다</S.Title>
          <S.StatIcon src={moreIcon} alt="더보기 아이콘" onClick={toggleMenu} />
          {isMenuOpen && (
            <S.Menu>
              <S.MenuItem onClick={() => alert("게시글 수정 기능")}>수정</S.MenuItem>
              <S.MenuItem onClick={() => alert("게시글 삭제 기능")}>삭제</S.MenuItem>
            </S.Menu>
          )}
          <S.AuthorInfo>
            <S.UserIcon src={examIcon} />
            <S.User>김동글</S.User>
            <S.Date>10/22 10:00</S.Date>
          </S.AuthorInfo>
        </S.Header>

        <S.PostContent>
          <S.PostText>나 진짜 미쳐버리겠다!!</S.PostText>
          <S.PostImage src={examIcon} alt="게시글 이미지" />
        </S.PostContent>

        <S.Stats>
          <S.Stat>
            <S.StatIcon src={likeIcon} alt="좋아요 아이콘" />
            <S.StatText>10</S.StatText>
          </S.Stat>
          <S.Stat>
            <S.StatIcon src={commentIcon} alt="댓글 아이콘" />
            <S.StatText>{commentsLength}</S.StatText>
          </S.Stat>
          <S.Stat>
            <S.StatIcon src={bookmarkIcon} alt="북마크 아이콘" />
          </S.Stat>
        </S.Stats>
      </S.PostConatiner>
    </S.PageContainer>
  );
};

export default Content;
