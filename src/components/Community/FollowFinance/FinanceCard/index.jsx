import React, { useState } from 'react';
import * as S from '../../../../styles/Community/FollowFinance/FinanceCard/style';
const CommunityPost = ({ title, preview, image, satisfaction, like, thumbs }) => {
  const [likesCount, setLikesCount] = useState(like);
  const [thumbsCount, setThumbsCount] = useState(thumbs);
  const [isLiked, setIsLiked] = useState(false);
  const [isThumbed, setIsThumbed] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleThumb = () => {
    if (isThumbed) {
      setThumbsCount((prev) => prev - 1);
    } else {
      setThumbsCount((prev) => prev + 1);
    }
    setIsThumbed(!isThumbed);
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

export default CommunityPost;
