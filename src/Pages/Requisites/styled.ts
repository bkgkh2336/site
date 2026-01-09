import styled from "styled-components";
import { Block_ } from "../../Components/Block/styled";

export const Requisites_ = styled(Block_)`
    align-items: center;
    flex-direction: column;
    gap: 40px;
    padding: 40px 20px;
    background: linear-gradient(to bottom, rgba(40, 167, 69, 0.02) 0%, transparent 100%);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    * {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .header-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        text-align: center;
        margin-bottom: 20px;
        
        h1 {
            color: rgb(40, 167, 69);
            margin: 0;
        }
    }
    
    .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 25px;
        width: 90%;
        max-width: 1200px;
        
        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
            max-width: 700px;
        }
        
        @media (max-width: 768px) {
            width: 95%;
            gap: 20px;
        }
        
        @media (max-width: 480px) {
            width: 100%;
            gap: 15px;
            padding: 0 5px;
        }
    }
`;

export const InfoCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 28px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(40, 167, 69, 0.1);
    
    &:hover {
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.15);
        transform: translateY(-2px);
    }
    
    &.wide-card {
        grid-column: 1 / -1;
        
        @media (max-width: 1024px) {
            grid-column: 1;
        }
    }
    
    .card-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(40, 167, 69, 0.1);
        
        h3 {
            margin: 0;
            font-size: 1.25rem;
            color: #333;
            
            @media (max-width: 480px) {
                font-size: 1.1rem;
            }
        }
        
        @media (max-width: 480px) {
            gap: 12px;
        }
    }
    
    .card-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
        
        @media (max-width: 480px) {
            gap: 12px;
        }
    }
    
    .bank-grid {
        display: flex;
        flex-direction: column;
        gap: 18px;
        
        @media (max-width: 480px) {
            gap: 15px;
        }
    }
    
    @media (max-width: 768px) {
        padding: 24px;
    }
    
    @media (max-width: 480px) {
        padding: 18px;
        border-radius: 12px;
    }
`;

export const IconWrapper = styled.div<{ color?: string; size?: 'normal' | 'small' }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.size === 'small' ? '36px' : '48px'};
    height: ${props => props.size === 'small' ? '36px' : '48px'};
    min-width: ${props => props.size === 'small' ? '36px' : '48px'};
    background: ${props => props.color ? `${props.color}15` : 'rgba(40, 167, 69, 0.1)'};
    border-radius: 12px;
    color: ${props => props.color || 'rgb(40, 167, 69)'};
    transition: all 0.3s ease;
    
    ${InfoCard}:hover & {
        background: ${props => props.color ? `${props.color}25` : 'rgba(40, 167, 69, 0.2)'};
        transform: scale(1.05);
    }
    
    @media (max-width: 480px) {
        width: ${props => props.size === 'small' ? '32px' : '40px'};
        height: ${props => props.size === 'small' ? '32px' : '40px'};
        min-width: ${props => props.size === 'small' ? '32px' : '40px'};
        
        svg {
            width: ${props => props.size === 'small' ? '16px' : '20px'};
            height: ${props => props.size === 'small' ? '16px' : '20px'};
        }
    }
`;

export const DetailRow = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    
    .label {
        color: #555;
        min-width: 140px;
        
        @media (max-width: 768px) {
            min-width: 120px;
            font-size: 0.95rem;
        }
        
        @media (max-width: 480px) {
            min-width: 100%;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
    }
    
    .value {
        flex: 1;
        color: #333;
        line-height: 1.6;
        word-break: break-word;
        
        a {
            color: rgb(40, 167, 69);
            text-decoration: none;
            transition: all 0.2s ease;
            display: inline-block;
            
            &:hover {
                color: rgb(32, 134, 55);
                text-decoration: underline;
            }
        }
        
        .separator {
            margin: 0 8px;
            color: #ccc;
            
            @media (max-width: 480px) {
                display: none;
            }
        }
        
        @media (max-width: 768px) {
            font-size: 0.95rem;
        }
        
        @media (max-width: 480px) {
            font-size: 0.9rem;
            
            a {
                display: block;
                margin-bottom: 8px;
                
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
    
    .value-with-copy {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        flex-wrap: wrap;
        
        @media (max-width: 480px) {
            gap: 8px;
        }
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        gap: 5px;
    }
`;

export const CopyButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: transparent;
    border: 1px solid rgba(40, 167, 69, 0.3);
    border-radius: 6px;
    color: rgb(40, 167, 69);
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 28px;
    min-height: 28px;
    
    &:hover {
        background: rgba(40, 167, 69, 0.1);
        border-color: rgb(40, 167, 69);
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    svg {
        width: 16px;
        height: 16px;
    }
`;