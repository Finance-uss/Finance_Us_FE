import React from 'react';
import SwipeableCard from '../../SwipeableCard';
import styled from 'styled-components';

const ActivityItem = ({ activity, onDeleteSuccess, activeSwipeId, setActiveSwipeId }) => {
    
    const handleSwipeStart = () => {
        if(activeSwipeId !== activity.accountId) {
            setActiveSwipeId(activity.accountId);
        }
    };

    return (
        <SwipeableCard 
            onSwipeStart={handleSwipeStart}
            itemId={activity.accountId}
            paddingLeft={'0px'}
            onDeleteSuccess={onDeleteSuccess}
            activeSwipeId={activeSwipeId}
            imageName={activity.imageName}
        >
            <Image src={activity.imageUrl} alt={activity.title} />
            <Content>
                <Subtitle>{activity.title}</Subtitle>
                <SubInfo>
                    <Subtitle>{activity.subName}</Subtitle>
                    <Price>{activity.amount.toLocaleString()}원</Price>
                </SubInfo>
            </Content>
        </SwipeableCard>
    );
};

export default ActivityItem;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 66px);
`;

const Subtitle = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #818C99;
`;

const SubInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 38px;
`;

const Price = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #818C99;
`;