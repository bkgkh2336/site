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

const float = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`;

export const HeatingContainer = styled.div`
    width: 90%;
    max-width: 1400px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`;

export const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.2);
    border-radius: 12px;
    color: #28a745;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.1);
    
    &:hover {
        background: #28a745;
        color: #ffffff;
        transform: translateX(-4px);
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.25);
    }
    
    &:active {
        transform: translateX(-2px);
    }
    
    @media (max-width: 768px) {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
`;

export const PageHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
        gap: 15px;
        margin-bottom: 5px;
    }
`;

export const HeaderIcon = styled.div`
    min-width: 80px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #e7f3e9;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
    animation: ${float} 3s ease-in-out infinite;
    
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

export const ViewToggleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    transition: all 0.3s ease-in-out;
    flex: 1;
    
    &:focus-within {
        border-color: #28a745;
        box-shadow: 0 4px 16px rgba(40, 167, 69, 0.25);
    }
    
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #212529;
    
    &::placeholder {
        color: #6c757d;
    }
`;


export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 48px;
    text-align: center;
    color: #6c757d;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(40, 167, 69, 0.1);
    border-radius: 24px;
    animation: ${fadeIn} 0.6s ease-out;
    
    h3 {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: #212529;
        margin: 16px 0 8px 0;
    }
    
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1rem;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        padding: 60px 24px;
        
        h3 {
            font-size: 1.25rem;
        }
        
        p {
            font-size: 0.9rem;
        }
    }
`;

export const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
    animation: ${fadeIn} 0.6s ease-out;
`;

export const NoticeItem = styled.div`
    padding: 16px 20px;
    background: rgba(220, 53, 69, 0.1);
    border-left: 4px solid #dc3545;
    border-radius: 8px;
    color: #dc3545;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    font-weight: 500;
    
    @media (max-width: 768px) {
        padding: 14px 16px;
        font-size: 0.9rem;
    }
`;