import styled from "styled-components";

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: auto;
    padding: 40px;
`;

export const LoadingText = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #28a745;
    position: relative;
    
    &::after {
        content: '';
        animation: dots 1.5s infinite;
    }
    
    @keyframes dots {
        0%, 20% {
            content: '.';
        }
        40% {
            content: '..';
        }
        60%, 100% {
            content: '...';
        }
    }
`;

export const DotsContainer = styled.div`
    display: flex;
    gap: 0;
    margin: 0;
`;

export const Loading_ = styled.div`
    width: 12px;
    height: 12px;
    background-color: #4CAF50;
    border-radius: 50%;
    margin: 0 6px;
    transform-origin: center;

    &:nth-child(1) { animation: rotate 1.2s infinite 0s ease; }
    &:nth-child(2) { animation: rotate 1.2s infinite 0.1s ease; }
    &:nth-child(3) { animation: rotate 1.2s infinite 0.2s ease; }
    &:nth-child(4) { animation: rotate 1.2s infinite 0.3s ease; }

    @keyframes rotate {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.5; }
        100% { transform: scale(1) rotate(360deg); opacity: 1; }
    }
`;