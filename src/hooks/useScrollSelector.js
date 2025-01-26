import { useState, useRef, useEffect } from "react";

export const useScrollSelector = (initialValue, itemCount, itemHeight, onDateChange) => {
    const [selected, setSelected] = useState(initialValue);
    const ref = useRef(null);
    const timerRef = useRef(null);
    const SCROLL_DEBOUNCE_TIME = 30;

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = (initialValue - 1) * itemHeight;

            const handleWheel = (e) => {
                e.preventDefault();
                handleScroll(e);
            };

            ref.current.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                if(ref.current){
                    ref.current.removeEventListener("wheel", handleWheel);
                }
            };
        }
    }, [initialValue, itemHeight]);

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

            const newValue = targetIndex + 1;
            setSelected(newValue);
            onDateChange(newValue);
        }, SCROLL_DEBOUNCE_TIME);
    };

    return { ref, selected };
};