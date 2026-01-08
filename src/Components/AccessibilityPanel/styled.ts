import styled from 'styled-components';

export const Panel = styled.div`
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: min(350px, 90vw);
    max-height: 90vh;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideUp 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        bottom: 70px;
        right: 15px;
        width: min(320px, 90vw);
        max-height: 85vh;
    }
    
    @media (max-width: 480px) {
        bottom: 65px;
        right: 10px;
        left: 10px;
        width: auto;
        max-height: 80vh;
    }
`;

export const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #e0e0e0;
    flex-shrink: 0;
    background: white;
    border-radius: 12px 12px 0 0;
    
    @media (max-width: 768px) {
        padding: 14px 16px;
    }
    
    @media (max-width: 480px) {
        padding: 12px 14px;
    }
`;

export const PanelTitle = styled.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #28a745;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        gap: 8px;
        
        svg {
            width: 18px;
            height: 18px;
        }
    }
    
    @media (max-width: 480px) {
        font-size: 0.95rem;
        gap: 6px;
        
        svg {
            width: 16px;
            height: 16px;
        }
    }
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
        background: #f0f0f0;
        color: #28a745;
    }
`;

export const PanelContent = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    flex: 1;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #28a745;
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #20c997;
    }
    
    @media (max-width: 768px) {
        padding: 15px;
        gap: 15px;
    }
    
    @media (max-width: 480px) {
        padding: 12px;
        gap: 12px;
    }
`;

export const SettingGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const SettingLabel = styled.label`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
    
    svg {
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.9rem;
        gap: 6px;
        
        svg {
            width: 16px;
            height: 16px;
        }
    }
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

export const SettingButton = styled.button<{ $active?: boolean }>`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    background: ${props => props.$active ? '#28a745' : '#f0f0f0'};
    color: ${props => props.$active ? 'white' : '#333'};
    border: 1px solid ${props => props.$active ? '#28a745' : '#e0e0e0'};
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.$active ? '#20c997' : '#e0e0e0'};
        border-color: ${props => props.$active ? '#20c997' : '#ccc'};
    }
    
    @media (max-width: 768px) {
        padding: 7px 14px;
        font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 0.8rem;
    }
`;

export const ResetButton = styled.button`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    padding: 12px 20px;
    font-size: 0.95rem;
    font-weight: 600;
    background: #f0f0f0;
    color: #666;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
    
    &:hover {
        background: #e0e0e0;
        color: #28a745;
    }
    
    svg {
        transition: transform 0.3s ease;
    }
    
    &:hover svg {
        transform: rotate(-180deg);
    }
    
    @media (max-width: 768px) {
        padding: 10px 18px;
        font-size: 0.9rem;
        gap: 6px;
    }
    
    @media (max-width: 480px) {
        padding: 9px 16px;
        font-size: 0.85rem;
    }
`;