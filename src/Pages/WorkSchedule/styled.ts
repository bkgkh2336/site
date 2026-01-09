import styled from "styled-components";
import { Block_ } from "../../Components/Block/styled";

export const WorkSchedule_ = styled(Block_)`
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
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 90%;
        max-width: 1000px;
        
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

export const LocationCard = styled.div`
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
    
    .card-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(40, 167, 69, 0.1);
        
        h3 {
            margin: 0;
            font-size: 1.3rem;
            color: #333;
            line-height: 1.3;
            
            @media (max-width: 480px) {
                font-size: 1.15rem;
            }
        }
        
        @media (max-width: 480px) {
            gap: 12px;
        }
    }
    
    .card-content {
        display: flex;
        flex-direction: column;
        gap: 18px;
        
        @media (max-width: 480px) {
            gap: 15px;
        }
    }
    
    .reception-link {
        text-align: center;
        padding: 12px;
        background: rgba(40, 167, 69, 0.05);
        border-radius: 8px;
        margin-bottom: 10px;
        
        a {
            text-decoration: none;
            transition: opacity 0.2s ease;
            
            &:hover {
                opacity: 0.8;
            }
        }
    }
    
    .info-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        
        &.lunch-row {
            margin-top: -10px;
        }
    }
    
    .info-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;
        
        .label {
            color: #666;
            font-size: 0.95rem;
            
            @media (max-width: 480px) {
                font-size: 0.9rem;
            }
        }
        
        .value {
            color: #333;
            line-height: 1.6;
            
            @media (max-width: 480px) {
                font-size: 0.95rem;
            }
        }
    }
    
    .map-container {
        margin-top: 10px;
        padding-top: 18px;
        border-top: 1px solid rgba(40, 167, 69, 0.1);
        
        iframe {
            border: 1px solid rgba(40, 167, 69, 0.1);
            transition: all 0.3s ease;
            
            &:hover {
                border-color: rgba(40, 167, 69, 0.3);
            }
        }
        
        @media (max-width: 480px) {
            iframe {
                height: 250px;
            }
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
    
    ${LocationCard}:hover & {
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