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

export const SurveysContainer = styled.div`
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
    color: ${props => props.color || '#212529'};
    padding-left: 30px;
    position: relative;
    
    &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: ${props => props.color === 'white' ? 'white' : '#28a745'};
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    strong {
        color: ${props => props.color === 'white' ? 'white' : '#28a745'};
        font-weight: 700;
    }
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
        padding-left: 25px;
    }
`;

export const BenefitsList = styled(StyledList)`
    gap: 18px;
    
    ${ListItem} {
        color: white;
        
        &::before {
            color: white;
        }
        
        strong {
            color: white;
        }
    }
`;