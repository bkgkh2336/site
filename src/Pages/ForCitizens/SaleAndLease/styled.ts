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

export const SaleLeaseContainer = styled.div`
    width: 90%;
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

export const ContentSection = styled.section`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    
    @media (max-width: 768px) {
        padding: 20px;
        border-radius: 12px;
    }
`;

export const HighlightBox = styled.div`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 16px;
    padding: 35px;
    color: white;
    box-shadow: 0 10px 40px rgba(40, 167, 69, 0.2);
    
    @media (max-width: 768px) {
        padding: 25px;
        border-radius: 12px;
    }
`;

export const InfoBlock = styled.div`
    background: rgba(40, 167, 69, 0.08);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px 30px;
    
    strong {
        color: #28a745;
        font-size: 1.1rem;
    }
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;