import React, { useState } from 'react';
import * as S from '../../../../styles/Community/FollowFinance/FinanceCard/style';
import axiosInstance from '../../../../api/axiosInstance'; // axios 추가

const FinanceCard = ({ title, preview, image, satisfaction, like, thumbs, accountId, accessToken }) => {
  const [likesCount, setLikesCount] = useState(like);
  const [thumbsCount, setThumbsCount] = useState(thumbs);

  const handleLike = async () => {
    try {
      const response = await axiosInstance.post('/api/account/like', { accountId }, 
        { headers: { Authorization: `Bearer ${accessToken}` } } );
      if (response.data.isSuccess) {
        setLikesCount(response.data.result.totalLike); 
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  const handleThumb = async () => {
    try {
      const response = await axiosInstance.post('/api/account/cheer',  { accountId }, 
        { headers: { Authorization: `Bearer ${accessToken}` } });
      if (response.data.isSuccess) {
        setThumbsCount(response.data.result.totalCheer); 
      }
    } catch (error) {
      console.error('응원 처리 실패:', error);
    }
  };

  const Stars = (rate) => {
    const filledStars = '★'.repeat(rate); 
    const emptyStars = '☆'.repeat(5 - rate); 
    return filledStars + emptyStars; 
  };
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        <S.Satisfaction>{Stars(satisfaction)}</S.Satisfaction>
      </S.TitleWrapper>
      
      <S.Image src={image} alt={title} />
      <S.BottomWrapper>
        <S.Preview>{preview}</S.Preview>
        <S.Emoji>
          <span onClick={handleLike}>
            ❤️ {likesCount}
          </span>
          <span onClick={handleThumb}>
            💪 {thumbsCount}
          </span>
        </S.Emoji>
      </S.BottomWrapper>
    </S.Container>
  );
};

export default FinanceCard;
