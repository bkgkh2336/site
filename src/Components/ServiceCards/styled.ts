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

const glow = keyframes`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
`;

export const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const ServiceCard = styled.div`
    position: relative;
    background-color: white;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    animation: ${fadeIn} 0.6s ease-out;
    
    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 16px 48px rgba(40, 167, 69, 0.2);
        border-color: #28a745;
        
        & > div:first-child {
            opacity: 1;
        }
    }
`;

export const CardGlow = styled.div`
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(40, 167, 69, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    animation: ${glow} 3s ease-in-out infinite;
`;

export const ServiceNumber = styled.div`
    display: inline-block;
    background: #28a745;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 6px 16px;
    border-radius: 50px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const ServiceName = styled.h3`
    font-size: 1.15rem;
    font-weight: 600;
    color: #212529;
    margin: 0 0 20px 0;
    line-height: 1.5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 50px;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PriceLabel = styled.span`
    font-size: 0.85rem;
    color: #6c757d;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const PriceValue = styled.span<{ $highlight?: boolean }>`
    font-size: ${props => props.$highlight ? '1.3rem' : '1.1rem'};
    font-weight: 700;
    color: ${props => props.$highlight ? '#28a745' : '#212529'};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;