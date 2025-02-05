import React from 'react';
import SwipeableCard from '../../SwipeableCard';
import * as S from '../../../../../styles/Finance/Account/Activity/style';

const ActivityItem = ({ activity }) => {

    return (
        <SwipeableCard>
            <S.Image src={activity.imageUrl} alt={activity.title} />
            <S.Content>
                <S.Subtitle>{activity.title}</S.Subtitle>
                <S.SubInfo>
                    <S.Subtitle>{activity.subName}</S.Subtitle>
                    <S.Price>{activity.amount.toLocaleString()}원</S.Price>
                </S.SubInfo>
            </S.Content>
        </SwipeableCard>
    );
};

export default ActivityItem;
