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

export const AssistanceContainer = styled.div`
    width: 85%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${fadeIn} 0.6s ease-out;
    min-height: 60vh;
    
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
    
    @media (max-width: 768px) {
        padding: 30px;
        border-radius: 12px;
    }
`;

export const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    
    @media (max-width: 768px) {
        padding: 40px 25px;
        border-radius: 12px;
    }
`;