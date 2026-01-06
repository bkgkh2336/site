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

export const ScheduleContainer = styled.div`
    width: 90%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 20px auto;
        gap: 12px;
    }
`;

export const SectionTitle = styled.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #212529;
    margin: 20px 0 10px 0;
    text-align: center;
    line-height: 1.5;
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

export const ScheduleTable = styled.table`
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    @media (max-width: 768px) {
        min-width: 700px;
    }
`;

export const TableHeader = styled.th`
    padding: 18px 24px;
    text-align: left;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
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
    
    &:hover {
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
    
    strong {
        color: #28a745;
        font-weight: 700;
    }
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.85rem;
    }
`;

export const NoticeText = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #495057;
    margin: 15px 0;
    padding: 16px 20px;
    background: rgba(220, 53, 69, 0.1);
    border-left: 4px solid #dc3545;
    border-radius: 8px;
    line-height: 1.6;
    font-weight: 500;
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.9rem;
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
    padding: 20px;
    background: rgba(76, 175, 80, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(76, 175, 80, 0.2);
`;