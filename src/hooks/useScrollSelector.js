import { useState, useRef, useEffect, useCallback } from "react";

export const useScrollSelector = (initialValue, itemCount, itemHeight, onDateChange) => {
    const [selected, setSelected] = useState(initialValue);
    const ref = useRef(null);
    const timerRef = useRef(null);
    const debounceTimerRef = useRef(null); // 디바운싱 타이머
    const lastInteractionRef = useRef(null); // 마지막 이벤트 추적
    const SCROLL_DEBOUNCE_TIME = 30;
    const SCROLL_UPDATE_DEBOUNCE_TIME = 100; // scroll 이벤트 디바운스 시간

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = (initialValue - 1) * itemHeight;

            const handleWheel = (e) => {
                e.preventDefault();
                lastInteractionRef.current = "wheel";
                handleScroll(e);
            };

            ref.current.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                if(ref.current) {
                    ref.current.removeEventListener("wheel", handleWheel);
                }
            };
        }
    }, [initialValue, itemHeight]);

    // ✅ scroll 이벤트에 디바운싱 적용
    useEffect(() => {
        if (ref.current) {
            const handleScrollUpdate = () => {
                if (lastInteractionRef.current === "wheel") return; // 휠 이벤트에서는 업데이트 X

                // 기존 타이머 클리어
                clearTimeout(debounceTimerRef.current);
                
                debounceTimerRef.current = setTimeout(() => {
                    const currentIndex = Math.floor((ref.current.scrollTop + itemHeight / 2) / itemHeight);
                    const newValue = currentIndex + 1;

                    setSelected((prev) => {
                        if (prev !== newValue) {
                            onDateChange(newValue);
                            return newValue;
                        }
                        return prev;
                    });
                }, SCROLL_UPDATE_DEBOUNCE_TIME); // 디바운싱 적용
            };

            ref.current.addEventListener("scroll", handleScrollUpdate, { passive: true });

            return () => {
                if (ref.current) {
                    ref.current.removeEventListener("scroll", handleScrollUpdate);
                    clearTimeout(debounceTimerRef.current);
                }
            };
        }
    }, [itemHeight, onDateChange]);

    // 스무스 스크롤 애니메이션 함수
    const smoothScrollTo = (targetScrollTop, duration) => {
        if (!ref.current) return;
        const startScrollTop = ref.current.scrollTop;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            ref.current.scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * easedProgress;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    // ✅ 휠 이벤트에서만 스크롤 동작
    const handleScroll = (e) => {
        if (!ref.current) return;

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            const direction = Math.sign(e.deltaY);
            const targetIndex = Math.min(
                Math.max(
                    0,
                    Math.floor(
                        ((ref.current.scrollTop + direction * itemHeight) + itemHeight / 2) / itemHeight
                    )
                ),
                itemCount - 1
            );

            const newScrollTop = targetIndex * itemHeight;
            smoothScrollTo(newScrollTop, 100);

            

            lastInteractionRef.current = "wheel";
            setTimeout(() => {
                lastInteractionRef.current = null;
            }, 150);
            const newValue = targetIndex + 1;
            setSelected(newValue);
            onDateChange(newValue);
        }, SCROLL_DEBOUNCE_TIME);
    };

    return { ref, selected };
};
