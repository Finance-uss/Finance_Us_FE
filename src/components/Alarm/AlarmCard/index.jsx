import React from "react";
import * as S from "../../../styles/Alarm/style";
import { useNavigate } from "react-router-dom";

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
          <S.TitleText>{title}</S.TitleText>
          <S.ContentText>해당 게시글에 답글이 달렸습니다.</S.ContentText>
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

const AlarmCard = ({ alarm, markRead }) => {
  const navigate = useNavigate();
  const { id, type, title, resourceType, resourceId } = alarm;

  const handleClick = async () => {
    await markRead(id);
    switch (type) {
      case "댓글":
      case "답글":
        navigate(`/community/postdetail/${resourceId}`); // 게시글 페이지로 이동
        break;
      case "반응":
        navigate(`/finance`); // 가계부 페이지로 이동
        break;
      case "팔로우":
        navigate(`/community`); 
        break;
      default:
        return;
    }

    
  }; 

  return (
    <S.AlarmContainer onClick={handleClick}>
      <S.Category>{type} 알림</S.Category>
      <S.Content>{getCategory(type, title, resourceType)}</S.Content>
    </S.AlarmContainer>
  );
};

export default AlarmCard;
