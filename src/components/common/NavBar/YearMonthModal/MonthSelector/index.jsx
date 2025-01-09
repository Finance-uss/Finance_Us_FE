import React, { useState, useRef, useEffect } from "react";
import * as S from "../../../../../styles/common/NavBar/YearMonthModal/YearSelector/style.js";

const MonthSelector = ({ onDateChange, initialMonth }) => {
    const SCROLL_DEBOUNCE_TIME = 30;
    const ITEM_HEIGHT = 34; 
    const [selected, setSelected] = useState(parseInt(initialMonth));
    const ref = useRef(null);
    const timerRef = useRef(null);
    
    // 🔹 newList 배열 선언
    const newList = [
        "",
        "",
        ...Array.from({ length: 12 }, (_, i) => i + 1),
        "",
        ""
    ];
    
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = (selected - 1) * ITEM_HEIGHT;

            const scrollElement = ref.current;

            if (!scrollElement) return;

            const handleWheel = (e) => {
                e.preventDefault(); // 🛑 preventDefault 허용
                handleScroll(e);
            };

            scrollElement.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                scrollElement.removeEventListener("wheel", handleWheel);
            };
        }
    }, []);

    const smoothScrollTo = (element, targetScrollTop, duration) => {
        const startScrollTop = element.scrollTop;
        const startTime = performance.now();
    
        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
    
            // 부드러운 이동을 위한 ease-out 적용
            const easedProgress = 1 - Math.pow(1 - progress, 3);
    
            element.scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * easedProgress;
    
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
    
        requestAnimationFrame(animateScroll);
    };

    const handleScroll = (e) => {
        if (!ref.current) return;

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            const direction = Math.sign(e.deltaY);

            // targetIndex값이 0~11 사이의 값이 되도록 설정
            const targetIndex = Math.min(
                Math.max(
                    0,
                    Math.floor(((ref.current.scrollTop + (direction * ITEM_HEIGHT)) + (ITEM_HEIGHT / 2)) / ITEM_HEIGHT)
                ),
                11
            );

            const newScrollTop = (targetIndex * ITEM_HEIGHT);

            // 부드러운 스크롤 효과 적용
            smoothScrollTo(ref.current, newScrollTop, 100); // 100ms 동안 부드럽게 이동

            setSelected(targetIndex + 1);
            onDateChange(targetIndex + 1);
        }, SCROLL_DEBOUNCE_TIME);
    };

    return (
        <S.List 
            ref={ref} 
            onWheel={handleScroll}
        >
            {newList.map((item, index) => (
                <S.ListItem 
                    key={index} 
                    $isSelected={item === selected}
                >
                    {item !== "" ? `${item}월` : ""}
                </S.ListItem>
            ))}
        </S.List>
    );
};

export default MonthSelector;