import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SwipeableCard from '../../SwipeableCard';
import styled from 'styled-components';

//하나의 아이템
const AccountItem = ({ activity }) => {
    const { accountId, score, title, amount, subName, imageUrl } = activity;
    // 스와이프가 완전히 끝났을 때 별점을 숨길지 여부
    const [isStarHidden, setIsStarHidden] = useState(false);
    const navigate = useNavigate();
    // 별점 표시 유틸 함수
    const getStarRating = (score) =>
        '★'.repeat(score) + '☆'.repeat(5 - score);

      // 스와이프 종료 시 별점 상태를 업데이트하는 콜백
    const handleSwipeEnd = (finalTranslateX) => {
        // maxSwipe 값이 -62이므로, -62가 설정되면 별점을 숨기고, 그렇지 않으면 보여줌
        if (finalTranslateX === -62) {
        setIsStarHidden(true);
        } else {
        setIsStarHidden(false);
        }
    };

    // 클릭(탭) 이벤트 핸들러: 예를 들어 상세 페이지로 이동
    const handleClick = (event) => {
        // 스와이프 중이 아닐 때만 클릭 이벤트를 처리하도록 추가 검증 가능
        if (!isStarHidden) {
            localStorage.setItem("selectedActivity", JSON.stringify(activity));
            navigate(`account/${accountId}`);
        }
    };

    return (
        <SwipeableCard 
            onSwipeEnd={handleSwipeEnd} 
            onClick={handleClick}
            itemId={accountId}
            boxShadow={'0px 0px 3px 0px rgba(0, 0, 0, 0.25)'}
            borderRadius={'5px'}
        >
            <Image src={imageUrl} alt={title} />
            <Content>
                <SubInfo>
                    {/* ★ 변경: 별점은 isStarHidden=false일 때만 렌더링 */}
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

