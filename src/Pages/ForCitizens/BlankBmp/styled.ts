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

export const BlankBmpContainer = styled.div`
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

export const ContentSection = styled.section``

export const InfoBox = styled.div`
    background: rgba(40, 167, 69, 0.08);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px 30px;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;