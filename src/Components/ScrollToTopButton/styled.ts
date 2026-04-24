import styled from 'styled-components';

export const ScrollButton = styled.button<{ $isVisible: boolean }>`
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
    transition: all 0.3s ease;
    z-index: 999;
    opacity: ${props => props.$isVisible ? '1' : '0'};
    visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
    transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};

    &:hover {
        background-color: #218838;
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(40, 167, 69, 0.4);
    }

    &:active {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        bottom: 20px;
        left: 20px;
        width: 45px;
        height: 45px;
    }
`;