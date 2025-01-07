import React, { useState, useRef, useEffect } from "react";
import * as S from "../../../../../styles/common/NavBar/YearMonthModal/YearSelector/style.js";

const YearSelector = ({ onDateChange, initialYear }) => {
    const ITEM_HEIGHT = 34;
    const ref = useRef(null);
    const [selected, setSelected] = useState(parseInt(initialYear));
    const isScrolling = useRef(false);     
    const START_YEAR = 2000;
    const END_YEAR = 2050;

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = (selected - START_YEAR) * ITEM_HEIGHT;
        }
    }, []);

    const handleScroll = () => {
        if (!ref.current || isScrolling.current) return;

        isScrolling.current = true; // 스크롤이 진행 중임을 표시

        const smoothScroll = () => {
            let currentScrollTop = ref.current.scrollTop;
            const targetIndex = Math.floor((currentScrollTop + (ITEM_HEIGHT / 2)) / ITEM_HEIGHT); // 가장 가까운 인덱스 계산
            const targetScrollTop = targetIndex * ITEM_HEIGHT; // 목표 스크롤 위치 설정

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
                setSelected(targetIndex + START_YEAR);
                onDateChange(targetIndex + START_YEAR);
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
                ...Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i),
                "",
                ""
            ].map((item, index) => (
                <S.ListItem key={index} $isSelected={item === selected}>
                    {item !== "" ? `${item}년` : ""}
                </S.ListItem>
            ))}
        </S.List>
        
        
    );
};

export default YearSelector;