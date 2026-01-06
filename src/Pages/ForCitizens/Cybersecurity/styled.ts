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

export const CybersecurityContainer = styled.div`
    width: 85%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`;

export const HighlightBox = styled.div`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 16px;
    padding: 40px;
    color: white;
    box-shadow: 0 10px 40px rgba(40, 167, 69, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h2, p {
        color: white;
    }
    
    @media (max-width: 768px) {
        padding: 30px;
        border-radius: 12px;
    }
`;

export const VideoContainer = styled.div`
    margin-bottom: 30px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const InfoBox = styled.div`
    background: rgba(220, 53, 69, 0.1);
    border: 2px solid #dc3545;
    border-radius: 16px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 768px) {
        padding: 25px;
    }
`;