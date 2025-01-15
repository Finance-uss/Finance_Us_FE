import React from "react";
import * as S from "../../../styles/Alarm/style";
const getCategory = (category, title, user) => {
  switch (category) {
    case "댓글":
      return (
        <>
          <S.TitleText>{title}</S.TitleText> 
          <S.ContentText>해당 게시글에 댓글이 달렸습니다.</S.ContentText>
        </>
      );
    case "답글":
      return (
        <>
          <S.TitleText>{title}</S.TitleText> <S.ContentText>해당 게시글에 답글이 달렸습니다.</S.ContentText>
        </>
      );
    case "반응":
      return (
        <>
          <S.TitleText>{title}</S.TitleText> 
          <S.ContentText>해당 가계부에 느낌을 표시했습니다.</S.ContentText>
        </>
      );
    case "팔로우":
      return (
        <>
          <S.ContentText>{user}님이 팔로우했습니다.</S.ContentText>
        </>
      );
    default:
      return "새로운 알림이 있습니다.";
  }
};

const AlarmCard = ({ category, title, user }) => {
  const content = getCategory(category, title, user);

  return (
    <S.AlarmContainer>
      <S.Category>{category} 알림</S.Category>
      <S.Content>{content}</S.Content>
    </S.AlarmContainer>
  );
};

export default AlarmCard;
