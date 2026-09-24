import styled, { css } from 'styled-components';

interface RevealBoxProps {
    $visible: boolean;
    $delay: number;
    $fill: boolean;
}

export const RevealBox = styled.div<RevealBoxProps>`
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transition-delay: ${(props) => props.$delay}ms;

    ${(props) => props.$visible && css`
        opacity: 1;
        transform: translateY(0);
    `}

    /* Растягивает ребёнка на высоту обёртки — для элементов сеток,
       чтобы карточки в строке оставались одной высоты */
    ${(props) => props.$fill && css`
        height: 100%;

        > * {
            height: 100%;
        }
    `}
`;
