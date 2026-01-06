import styled from "styled-components";
import { Block_ } from "../../../Components/Block/styled";

export const ListDocuments_ = styled(Block_)`
    flex-direction: column;
    gap: 16px;
    padding: 0;
    background: transparent;
    box-shadow: none;
    align-items: stretch;
    height: fit-content;
    flex: 1;
    
    @media (max-width: 768px) {
        gap: 12px;
        width: 100%;
    }
    
    @media (max-width: 480px) {
        gap: 10px;
    }
`;

export const DocumentCard = styled.a`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    text-decoration: none;
    color: #495057;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: #28a745;
        transform: scaleY(0);
        transition: transform 0.3s ease-in-out;
    }
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(40, 167, 69, 0.25);
        border-color: #28a745;
        
        &::before {
            transform: scaleY(1);
        }
    }
    
    &:active {
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        gap: 14px;
        padding: 16px;
        
        &:hover {
            transform: translateY(-2px);
        }
    }
    
    @media (max-width: 480px) {
        gap: 12px;
        padding: 14px;
        border-radius: 10px;
        
        &:hover {
            transform: none;
        }
        
        &:active {
            transform: scale(0.98);
        }
    }
`;

export const DocumentIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: #e7f3e9;
    color: #28a745;
    flex-shrink: 0;
    
    svg {
        width: 24px;
        height: 24px;
    }
    
    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        
        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

export const DocumentInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const DocumentName = styled.span`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #212529;
    word-break: break-word;
    
    @media (max-width: 768px) {
        font-size: 0.9375rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.875rem;
    }
`;

export const DocumentMeta = styled.span`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.875rem;
    color: #6c757d;
    
    @media (max-width: 480px) {
        font-size: 0.8125rem;
    }
`;

export const DocumentAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #e7f3e9;
    color: #28a745;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    flex-shrink: 0;
    
    svg {
        width: 20px;
        height: 20px;
    }
    
    &:hover {
        background: #28a745;
        color: white;
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    @media (max-width: 480px) {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        
        svg {
            width: 18px;
            height: 18px;
        }
        
        &:hover {
            transform: none;
            background: #28a745;
            color: white;
        }
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    text-align: center;
    color: #6c757d;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    height: 100%;
    border-radius: 12px;
    
    svg {
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
        opacity: 0.5;
        color: #28a745;
    }
    
    h3 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: #212529;
        margin: 0 0 8px 0;
    }
    
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1rem;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        padding: 36px 24px;
        
        svg {
            width: 56px;
            height: 56px;
        }
        
        h3 {
            font-size: 1.125rem;
        }
        
        p {
            font-size: 0.9375rem;
        }
    }
    
    @media (max-width: 480px) {
        padding: 32px 20px;
        
        svg {
            width: 48px;
            height: 48px;
            margin-bottom: 12px;
        }
        
        h3 {
            font-size: 1rem;
        }
        
        p {
            font-size: 0.875rem;
        }
    }
`;