import styled, { keyframes } from 'styled-components';

const progressAnimation = keyframes`
    0% {
        width: 0%;
    }
    50% {
        width: 70%;
    }
    100% {
        width: 100%;
    }
`;

export const LoadingBar = styled.div<{ $isLoading: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #28a745, #20c997);
    z-index: 9999;
    transition: opacity 0.3s ease;
    opacity: ${props => props.$isLoading ? '1' : '0'};
    width: ${props => props.$isLoading ? '100%' : '0%'};
    animation: ${props => props.$isLoading ? progressAnimation : 'none'} 0.5s ease-in-out;
    box-shadow: 0 2px 4px rgba(40, 167, 69, 0.3);
`;