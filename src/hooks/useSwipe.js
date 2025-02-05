import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const useSwipe = (onSwipeEnd) => {
    const [translateX, setTranslateX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const maxSwipe = -62;

    const handlers = useSwipeable({
        onSwiping: ({ deltaX, dir }) => {
            setIsSwiping(true);
            let newX = translateX + (dir === 'Left' ? -Math.abs(deltaX) : Math.abs(deltaX));
            if (newX < maxSwipe) newX = maxSwipe;
            if (newX > 0) newX = 0;
            setTranslateX(newX);
        },
        onSwiped: () => {
            setIsSwiping(false);
            // 이동 거리가 절반 이상이면 고정, 아니면 원래 위치로 복귀
            const finalTranslateX = translateX <= maxSwipe / 2 ? maxSwipe : 0;
            setTranslateX(finalTranslateX);
            if (onSwipeEnd) {
                onSwipeEnd(finalTranslateX);
            }        
        },
        trackMouse: true, // PC에서도 마우스 드래그 인식
    });

    return { translateX, isSwiping, handlers };
};