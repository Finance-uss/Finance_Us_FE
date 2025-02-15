import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const useSwipe = (onSwipeStart, onSwipeEnd, onClick) => {
    const [translateX, setTranslateX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false); // 스와이프 시작 여부 확인
    const maxSwipe = -62;

    const handlers = useSwipeable({
        onSwiping: ({ deltaX, dir }) => {
            if (!hasStarted) {
                setHasStarted(true);
                if (onSwipeStart) {
                    onSwipeStart(); // ✅ 처음 스와이프 시작 시 `onSwipeStart` 실행
                }
            }

            const newX = dir === 'Left' 
                ? Math.max(maxSwipe, translateX - Math.abs(deltaX)) // 왼쪽으로 스와이프
                : Math.min(0, translateX + Math.abs(deltaX)); // 오른쪽으로 스와이프

            setTranslateX(newX);
        },
        onSwiped: ({ velocity }) => {
            setIsSwiping(false);
            setHasStarted(false); // ✅ 스와이프 종료 후 초기화

            const finalTranslateX = translateX <= maxSwipe / 2 ? maxSwipe : 0;
            setTranslateX(finalTranslateX);

            if (onSwipeEnd) {
                onSwipeEnd(finalTranslateX);
            }
        },
        onTap: (event) => {
            if (onClick) {
                onClick(event);
            }
        },
        trackMouse: true,
    });

    const resetSwipe = () => {
        setTranslateX(0);
    };

    return { translateX, isSwiping, handlers, resetSwipe };
};
