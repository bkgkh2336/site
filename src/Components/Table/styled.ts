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

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    animation: ${fadeIn} 0.6s ease-out;
    
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
        height: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(40, 167, 69, 0.05);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(40, 167, 69, 0.3);
        border-radius: 4px;
        
        &:hover {
            background: rgba(40, 167, 69, 0.5);
        }
    }
    
    @media (max-width: 768px) {
        border-radius: 12px;
        
        &::-webkit-scrollbar {
            height: 6px;
        }
    }
`;

export const StyledTable = styled.table`
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    @media (max-width: 768px) {
        min-width: 500px;
    }
`;

export const TableHeaderRow = styled.thead`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
`;

export const TableHeader = styled.th`
    padding: 18px 24px;
    text-align: left;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
    
    &:first-child {
        border-top-left-radius: 16px;
    }
    
    &:last-child {
        border-top-right-radius: 16px;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.85rem;
        
        &:first-child {
            border-top-left-radius: 12px;
        }
        
        &:last-child {
            border-top-right-radius: 12px;
        }
    }
`;

export const TableRow = styled.tr`
    transition: all 0.3s ease;
    
    &:not(:first-child):hover {
        background: rgba(40, 167, 69, 0.05);
    }
    
    &:not(:last-child) {
        border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    }
`;

export const TableCell = styled.td`
    padding: 18px 24px;
    color: #212529;
    font-weight: 500;
    font-size: 0.95rem;
    
    &:first-child {
        font-weight: 600;
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.85rem;
    }
`;