import React, { useState } from 'react';
import ActivityItem from './Item';
import * as S from '../../../../styles/Finance/Account/Activity/style';

const Activity = ({ title, activities }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedActivities = showAll ? activities : activities.slice(0, 2);
    const hasMore = activities.length > 2;

    const handleShowMore = () => {
        setShowAll(true);
    };

    return (
        <S.Section>
            <S.Title>
                {title}
            </S.Title>
            {displayedActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
            ))}
            {!showAll && hasMore && (
                <S.MoreButton onClick={handleShowMore}>더보기</S.MoreButton>
            )}
        </S.Section>
    );
};

export default Activity;
