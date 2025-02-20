import React from "react";
import * as S from "../../../styles/Alarm/style";
import { useNavigate } from "react-router-dom";

const getCategory = (type, resourceTitle, user, message) => {
  switch (type) {
    case "COMMENT": case "REPLY": case "EMOJI": case "LIKE":
      return (
        <>
          <S.TitleText>{resourceTitle}</S.TitleText>
          <S.ContentText>{message}</S.ContentText>
        </>
      );
    case "FOLLOW":
      return (
        <>
          <S.ContentText>{message}</S.ContentText>
        </>
      );
    default:
      return "새로운 알림이 있습니다.";
  }
};

const AlarmCard = ({ alarm, markRead }) => {
  const navigate = useNavigate();
  const { id, type, resourceType, resourceId } = alarm;

  const handleClick = async () => {
    await markRead(id);
    if (resourceType === "POST") {
      navigate(`/community/postdetail/${resourceId}`); 
    } else if (resourceType === "ACCOUNT") {
      navigate(`/finance`); 
    } else {
      navigate(`/community`);
    }    
  }; 
  const getType = (type) => {
    switch (type) {
      case "COMMENT":
        return "댓글";
      case "REPLY":
        return "답글";
      case "EMOJI": case"LIKE":
        return "반응";
      case "FOLLOW":
        return "팔로우";
      default:
        return "새로운 알림";
    }
  };

  return (
    <S.AlarmContainer onClick={handleClick}>
      <S.Category>{getType(type)} 알림</S.Category>
      <S.Content>{getCategory(type, alarm.resourceTitle , alarm.user||"", alarm.message, resourceType)}</S.Content>
    </S.AlarmContainer>
  );
};

export default AlarmCard;
