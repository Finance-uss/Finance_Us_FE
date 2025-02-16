import React, { useState } from 'react';
import ActivityItem from './Item';
import styled from 'styled-components';


const Activity = ({ title, activities, onDeleteSuccess }) => {
    const [showAll, setShowAll] = useState(false);
    const [activeSwipeId, setActiveSwipeId] = useState(null);
    const displayedActivities = showAll ? activities : activities.slice(0, 2);
    const hasMore = activities.length > 2;
    const handleShowMore = () => {
        setShowAll(true);
    };

    return (
        <Section>
            <Title>
                {title}
            </Title>
            {displayedActivities.map((activity) => (
                <ActivityItem 
                    key={activity.accountId} 
                    activity={activity}
                    onDeleteSuccess={onDeleteSuccess}
                    activeSwipeId={activeSwipeId}
                    setActiveSwipeId={setActiveSwipeId}
                />
            ))}
            {!showAll && hasMore && (
                <MoreButton onClick={handleShowMore}>더보기</MoreButton>
            )}
        </Section>
    );
};

export default Activity;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    background: #F7F7F7;
    width: calc(100% - 16px);
    height: auto;
    padding-left: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: 5px;
    gap: 20px;
    box-shadow: 0px 0px 3px 0px #00000040;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    color: #142755;
`;

const MoreButton = styled.button`
    padding-left: 0px;
    padding-right: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
    color: #B4B4B4;
    background: transparent;
    border: none;
`;