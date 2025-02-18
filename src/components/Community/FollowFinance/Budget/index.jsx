import React from 'react';
import * as S from '../../../../styles/Community/FollowFinance/Budget/style';
const Budget = ({ name, percentage }) => {
  return (
    <S.Container>
      <S.Content>
        <S.Text>{name} 님은 전체 예산 중</S.Text>
        <S.ProgressContainer>
          <S.Percentage>{percentage}%</S.Percentage>
          <S.Consume>소비 중이에요</S.Consume>
        </S.ProgressContainer>
      </S.Content>
      <S.Bar>
        <S.BarText percentage={percentage}>{percentage}%</S.BarText>
        <S.Fill percentage={percentage} />
      </S.Bar>
    </S.Container>
  );
};

export default Budget;
