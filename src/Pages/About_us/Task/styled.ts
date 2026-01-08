import styled from "styled-components";
import { Block_ } from "../../../Components/Block/styled";

export const Task_ = styled(Block_)`
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px 24px;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 16px;
    border-radius: 12px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        box-shadow: 0 8px 24px rgba(76, 175, 80, 0.2);
        transform: translateY(-2px);
        border-color: #4CAF50;
    }
    
    @media (max-width: 768px) {
        padding: 16px 20px;
        gap: 12px;
    }
    
    @media (max-width: 480px) {
        padding: 14px 16px;
        gap: 10px;
        
        &:hover {
            transform: none;
        }
    }
`

export const CheckIcon = styled.div`
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    
    &::after {
        content: '✓';
    }
    
    @media (max-width: 768px) {
        width: 28px;
        height: 28px;
        min-width: 28px;
        font-size: 14px;
    }
    
    @media (max-width: 480px) {
        width: 24px;
        height: 24px;
        min-width: 24px;
        font-size: 12px;
    }
`
