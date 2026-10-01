import styled, { keyframes } from "styled-components";
import {
    ServicePageContainer,
    PageHeader as SharedPageHeader,
    HeaderIcon as SharedHeaderIcon,
    ViewToggleWrapper as SharedViewToggleWrapper,
    SearchContainer as SharedSearchContainer,
    SearchInput as SharedSearchInput,
    EmptyState as SharedEmptyState,
    NoticeContainer as SharedNoticeContainer,
    NoticeItem as SharedNoticeItem,
    fadeIn
} from "../../../Components/ServicePageComponents";

// Re-export shared components
export const TransportContainer = ServicePageContainer;
export const PageHeader = SharedPageHeader;
export const HeaderIcon = SharedHeaderIcon;
export const ViewToggleWrapper = SharedViewToggleWrapper;
export const SearchContainer = SharedSearchContainer;
export const SearchInput = SharedSearchInput;
export const EmptyState = SharedEmptyState;
export const NoticeContainer = SharedNoticeContainer;
export const NoticeItem = SharedNoticeItem;

// Стили для карточек
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
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    animation: ${fadeIn} 0.6s ease-out;
    
    &:hover {
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

// Стили для таблицы
export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
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
        border-radius: 16px;
        
        &::-webkit-scrollbar {
            height: 6px;
        }
    }
`;

export const Table = styled.table`
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    
    @media (max-width: 768px) {
        min-width: 700px;
    }
`;

export const TableHeader = styled.thead`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
`;

export const TableRow = styled.tr`
    transition: background-color 0.2s ease;
    
    &:hover,
    &.group-hover {
        background-color: rgba(40, 167, 69, 0.05);
    }
`;

export const TableHeaderCell = styled.th`
    padding: 16px 20px;
    text-align: left;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 0.8rem;
    }
`;

export const TableCell = styled.td<{ $highlight?: boolean }>`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    color: ${props => props.$highlight ? '#28a745' : '#212529'};
    font-weight: ${props => props.$highlight ? '700' : '400'};
    
    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 0.85rem;
    }
`;

export const VariantRow = styled.div`
    margin-bottom: 8px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;
