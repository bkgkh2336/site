import styled from "styled-components";
import { Link } from "react-router-dom";

export const ServicesContainer = styled.div`
    width: 80%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 768px) {
        width: 90%;
        margin: 30px auto;
    }
    
    @media (max-width: 480px) {
        width: 95%;
        margin: 20px auto;
    }
`;

export const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

const cardStyles = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 2px solid transparent;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #4CAF50;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
    }
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 24px #4CAF5033;
        border-color: #4CAF50;
        
        &::before {
            transform: scaleX(1);
        }
    }
    
    &:active {
        transform: translateY(-4px);
    }
`;

export const ServiceCard = styled(Link)`
    ${cardStyles}
`;

export const ServiceCardDiv = styled.div`
    ${cardStyles}
`;

export const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #4CAF5015;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
    
    ${ServiceCard}:hover &, ${ServiceCardDiv}:hover & {
        background: #4CAF5025;
        transform: scale(1.1) rotate(5deg);
    }
`;

export const CardTitle = styled.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #212529;
    margin: 0 0 12px 0;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 1.15rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
`;

export const CardDescription = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #6c757d;
    margin: 0;
    text-align: center;
    line-height: 1.5;
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;