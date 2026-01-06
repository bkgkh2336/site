import styled from "styled-components";

export const Gallery = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    
    @media (max-width: 768px) {
        padding: 15px;
        gap: 15px;
    }
`;

export const Image = styled.img`
    width: 100%;
    border-radius: 8px;
`;