import styled from "styled-components";

export const Section = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
        padding: 15px;
    }
`;

export const Title = styled.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #28a745;
    margin-bottom: 15px;
    
    @media (max-width: 768px) {
        font-size: 1.3rem;
        margin-bottom: 12px;
    }
`;