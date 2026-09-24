import { useEffect, useRef, useState } from 'react';

/**
 * Отслеживает появление элемента во вьюпорте.
 * Срабатывает один раз и отключает наблюдатель.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15, rootMargin = '0px 0px -40px 0px') {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, inView] as const;
}
