import styled from "styled-components";
import { Block_ } from "../../../Components/Block/styled";

export const ListGroup_ = styled(Block_)`
    flex-direction: column;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    padding: 10px;
    gap: 8px;
    height: fit-content;
    position: sticky;
    top: 20px;
    min-width: 250px;
    width: 250px;
    flex-shrink: 0;
    
    @media (max-width: 1024px) {
        min-width: 220px;
        width: 220px;
    }
    
    @media (max-width: 768px) {
        position: static;
        min-width: 100%;
        width: 100%;
        max-width: 100%;
        padding: 12px;
    }
    
    @media (max-width: 480px) {
        border-radius: 16px;
        padding: 10px;
    }
`;

export const GroupButton = styled.button<{ $isActive?: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    background: ${props => props.$isActive 
        ? '#28a745' 
        : 'white'};
    color: ${props => props.$isActive 
        ? 'white' 
        : '#495057'};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.9375rem;
    font-weight: ${props => props.$isActive ? 600 : 500};
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: ${props => props.$isActive 
        ? '0 4px 12px rgba(40, 167, 69, 0.3)' 
        : '0 2px 4px rgba(0, 0, 0, 0.05)'};
    border: 1px solid ${props => props.$isActive 
        ? 'transparent' 
        : 'rgba(40, 167, 69, 0.1)'};
    
    &:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
        background: ${props => props.$isActive 
            ? '#28a745' 
            : '#e7f3e9'};
        color: ${props => props.$isActive 
            ? 'white' 
            : '#0c3e14'};
        border-color: ${props => props.$isActive 
            ? 'transparent' 
            : '#28a745'};
    }
    
    &:active {
        transform: translateX(2px);
        box-shadow: 0 2px 6px rgba(40, 167, 69, 0.2);
    }
    
    svg {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }
    
    span {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    @media (max-width: 768px) {
        &:hover {
            transform: none;
        }
        
        span {
            white-space: normal;
            word-break: break-word;
        }
    }
    
    @media (max-width: 480px) {
        padding: 10px 14px;
        font-size: 0.875rem;
        gap: 10px;
        
        svg {
            width: 18px;
            height: 18px;
        }
    }
`;

export const DocumentCount = styled.div<{ $isActive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 8px;
    border-radius: 12px;
    background: ${props => props.$isActive 
        ? 'rgba(255, 255, 255, 0.2)' 
        : '#e7f3e9'};
    color: ${props => props.$isActive 
        ? 'white' 
        : '#28a745'};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
`;