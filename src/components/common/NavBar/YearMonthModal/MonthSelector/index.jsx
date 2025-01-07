import React, { useState, useRef, useEffect } from "react";
import * as S from "../../../../../styles/common/NavBar/YearMonthModal/YearSelector/style.js";

const MonthSelector = ({ onDateChange, initialMonth }) => {
    const ITEM_HEIGHT = 34;
    const ref = useRef(null);
    const [selected, setSelected] = useState(parseInt(initialMonth));
    const isScrolling = useRef(false);
    
    
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = (selected - 1) * ITEM_HEIGHT;
        }
    }, []);

    const handleScroll = () => {
        if (!ref.current || isScrolling.current) return;
        
        isScrolling.current = true; // 스크롤이 진행 중임을 표시

        const smoothScroll = () => {
            let currentScrollTop = ref.current.scrollTop;
            const targetIndex = Math.floor((currentScrollTop + (ITEM_HEIGHT / 2)) / ITEM_HEIGHT); // 가장 가까운 인덱스 계산
            const targetScrollTop = targetIndex * ITEM_HEIGHT; // 목표 스크롤 위치 설정

            // 🚀 한 번의 스크롤 이동량을 `ITEM_HEIGHT` 이하로 제한
            const maxScrollChange = ITEM_HEIGHT;
            let scrollChange = (targetScrollTop - currentScrollTop) * 0.1;
            
            // 최대 이동량을 `ITEM_HEIGHT`로 제한
            if (Math.abs(scrollChange) > maxScrollChange) {
                scrollChange = maxScrollChange;
            }

            ref.current.scrollTop += scrollChange;

            if (Math.abs(targetScrollTop - currentScrollTop) > 3) {
                requestAnimationFrame(smoothScroll);
            } else {
                ref.current.scrollTop = targetScrollTop; // 최종 위치 조정
                setSelected(targetIndex + 1);
                onDateChange(targetIndex + 1);
                isScrolling.current = false; // 스크롤 완료
            }
        };

        requestAnimationFrame(smoothScroll);
    };

    return (
        <S.List ref={ref} onScroll={handleScroll}>
            {[
                "",
                "",
                ...Array.from({ length: 12 }, (_, i) => ((i + 1))),
                "",
                ""
            ].map((item, index) => (
                    <S.ListItem key={index} $isSelected={item === selected}>
                        {item !== "" ? `${item}월` : ""}
                    </S.ListItem>
            ))}
        </S.List>
    );
};

export default MonthSelector;