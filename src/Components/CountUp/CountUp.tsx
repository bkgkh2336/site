import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

interface CountUpProps {
    to: number;
    suffix?: string;
    duration?: number;
}

/**
 * Анимированный счётчик: набегает от 0 до `to`,
 * когда элемент попадает во вьюпорт (один раз).
 * При prefers-reduced-motion сразу показывает финальное значение.
 */
export const CountUp = ({ to, suffix = '', duration = 1400 }: CountUpProps) => {
    const [ref, inView] = useInView<HTMLSpanElement>(0.5);
    const [value, setValue] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!inView || startedRef.current) {
            return;
        }
        startedRef.current = true;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(to);
            return;
        }

        const startTime = performance.now();
        let frame = 0;

        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, to, duration]);

    return (
        <span ref={ref}>
            {value}
            {suffix}
        </span>
    );
};
