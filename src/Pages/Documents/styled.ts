import styled from "styled-components";
import { Block_ } from "../../Components/Block/styled";

export const DocumentsHeader = styled.div`
    max-width: 90%;
    width: 100%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    @media (max-width: 768px) {
        max-width: 95%;
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
    
    &:focus-within {
        border-color: #28a745;
        box-shadow: 0 4px 16px rgba(40, 167, 69, 0.25);
    }
    
    .search-icon {
        flex-shrink: 0;
    }
    
    @media (max-width: 768px) {
        padding: 10px 16px;
        gap: 10px;
    }
    
    @media (max-width: 480px) {
        padding: 8px 12px;
        border-radius: 10px;
        
        .search-icon {
            width: 18px !important;
            height: 18px !important;
        }
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
    
    @media (max-width: 768px) {
        font-size: 0.9375rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.875rem;
    }
`;

export const Documents_ = styled(Block_)`
    max-width: 90%;
    width: 100%;
    margin: 20px auto;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 24px;
    
    @media (max-width: 1024px) {
        gap: 20px;
    }
    
    @media (max-width: 768px) {
        max-width: 95%;
        flex-direction: column;
        gap: 16px;
    }
    
    @media (max-width: 480px) {
        padding: 0 12px;
        margin: 16px auto;
    }
`