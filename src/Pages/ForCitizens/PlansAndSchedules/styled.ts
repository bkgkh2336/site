import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const PlansContainer = styled.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (max-width: 768px) {
        max-width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`;


export const DocumentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const DocumentItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
    background: rgba(40, 167, 69, 0.05);
    border-radius: 12px;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
    
    &:hover {
        background: rgba(40, 167, 69, 0.1);
        border-left-color: #28a745;
        transform: translateX(5px);
    }
    
    @media (max-width: 768px) {
        padding: 15px;
        gap: 12px;
    }
`;