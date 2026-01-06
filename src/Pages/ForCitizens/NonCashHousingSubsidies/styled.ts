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

export const SubsidiesContainer = styled.div`
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
    padding: 35px;
    color: white;
    box-shadow: 0 10px 40px rgba(40, 167, 69, 0.2);
    
    h2, p, a {
        color: white;
    }
    
    @media (max-width: 768px) {
        padding: 25px;
        border-radius: 12px;
    }
`;

export const InfoBox = styled.div`
    background: rgba(40, 167, 69, 0.08);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px 30px;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ListItem = styled.li`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #212529;
    padding-left: 30px;
    position: relative;
    
    &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #28a745;
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    strong {
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
        padding-left: 25px;
    }
`;

export const SubsidyImage = styled.img`
    width: 100%;
    max-width: 800px;
    height: auto;
    margin: 30px auto;
    display: block;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;