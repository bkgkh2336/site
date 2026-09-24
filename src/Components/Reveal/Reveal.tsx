import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { RevealBox } from './styled';

interface RevealProps {
    children: ReactNode;
    /** Задержка перед появлением, мс — для каскада карточек */
    delay?: number;
    /** Растянуть ребёнка на всю высоту обёртки (для grid/flex-элементов) */
    fill?: boolean;
    className?: string;
    style?: CSSProperties;
}

export const Reveal = ({ children, delay = 0, fill = false, className, style }: RevealProps) => {
    const [ref, inView] = useInView<HTMLDivElement>();

    return (
        <RevealBox
            ref={ref}
            $visible={inView}
            $delay={delay}
            $fill={fill}
            className={className}
            style={style}
        >
            {children}
        </RevealBox>
    );
};
