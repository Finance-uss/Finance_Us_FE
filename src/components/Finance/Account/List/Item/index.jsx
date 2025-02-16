import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwipeableCard from '../../SwipeableCard';
import styled from 'styled-components';

const AccountItem = ({ activity, onDeleteSuccess, activeSwipeId, setActiveSwipeId }) => {
    const { accountId, score, title, amount, subName, imageUrl } = activity;
    const [isStarHidden, setIsStarHidden] = useState(false);
    const navigate = useNavigate();
    const getStarRating = (score) =>
        '★'.repeat(score) + '☆'.repeat(5 - score);

    useEffect(() => {
        if (activeSwipeId !== accountId) {
            setIsStarHidden(false);
        }
    }, [activeSwipeId]);
    const handleSwipeStart = useCallback(() => {
        if (activeSwipeId !== accountId) {
            setActiveSwipeId(accountId);
        }
    }, [activeSwipeId, setActiveSwipeId, accountId]);
    const handleSwipeEnd = (finalTranslateX) => {
        const isFullySwiped = finalTranslateX === -62;
        
        setIsStarHidden(isFullySwiped);
        if(!isFullySwiped) {
            setActiveSwipeId(null);
        }
    };
    const handleClick = () => {
        if (!isStarHidden) {
            localStorage.setItem("selectedActivity", JSON.stringify(activity));
            navigate(`account/${accountId}`);
        }
    };

    return (
        <SwipeableCard 
            onSwipeStart={handleSwipeStart}
            onSwipeEnd={handleSwipeEnd} 
            onClick={handleClick}
            itemId={accountId}
            boxShadow={'0px 0px 3px 0px rgba(0, 0, 0, 0.25)'}
            borderRadius={'5px'}
            onDeleteSuccess={onDeleteSuccess}
            activeSwipeId={activeSwipeId}
        >
            <Image src={imageUrl} alt={title} />
            <Content>
                <SubInfo>
                    {!isStarHidden && <div>{getStarRating(score)}</div>}
                    <span>{subName}</span>
                </SubInfo>
                <SubInfo>
                    <div>{title}</div>
                    <span>{amount.toLocaleString()}원</span>
                </SubInfo>
            </Content>
        </SwipeableCard>
    );
}

export default AccountItem;

/* ---------- styled-components ---------- */

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
        
    /* 자식이 하나일 때 자동 여백을 부여하여 가운데 정렬 */
        & > :only-child {
        margin-top: auto;
        margin-bottom: auto;
    }
`;

