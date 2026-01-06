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

export const ProceduresContainer = styled.div`
    width: 90%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`;

export const SectionTitle = styled.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #212529;
    margin: 20px 0;
    text-align: center;
    line-height: 1.6;
    
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;