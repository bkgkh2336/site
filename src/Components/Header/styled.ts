import styled from "styled-components";
import { Block_ } from "../Block/styled";

export const Logo = styled(Block_)`
    gap: 12px;
    align-items: center;
    &:hover {
        cursor: pointer;
        color: #28a745;
    }
    
    .full-name {
        display: block;
    }
    
    .short-name {
        display: none;
    }
    
    @media (max-width: 1300px) {
        gap: 8px;
        
        img {
            height: 35px !important;
        }
        
        .full-name {
            font-size: 0.85rem;
            line-height: 1.2;
        }
    }
    
    @media (max-width: 768px) {
        img {
            height: 32px !important;
        }
        
        .full-name {
            font-size: 0.75rem;
        }
    }
    
    @media (max-width: 480px) {
        gap: 8px;
        flex-basis: 100%;
        
        img {
            height: 30px !important;
        }
        
        .full-name {
            font-size: 0.7rem;
            line-height: 1.3;
        }
    }
`;

export const Nav = styled(Block_)`
    gap: 10px;
    padding: 0;
    
    @media (max-width: 1300px) {
        display: none;
    }
`;

export const ContactInfo = styled(Block_)`
    gap: 8px;
    align-items: center;
    
    a {
        transition: color 0.3s ease;
        
        &:hover {
            color: #28a745;
        }
    }
    
    @media (max-width: 1300px) {
        display: none;
    }
`;

export const MobileActions = styled.div`
    display: none;
    
    @media (max-width: 480px) {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-basis: 100%;
        justify-content: space-between;
    }
`;

export const MobileContactInfo = styled.a`
    display: none;
    background: none;
    border: none;
    color: #28a745;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-weight: bold;
    flex-shrink: 0;
    
    &:hover {
        background-color: rgba(40, 167, 69, 0.1);
    }
    
    @media (max-width: 1300px) {
        display: flex;
    }
    
    @media (max-width: 768px) {
        padding: 4px 6px;
        font-size: 0.9rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
    }
`;

export const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: #28a745;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    flex-shrink: 0;
    
    &:hover {
        background-color: rgba(40, 167, 69, 0.1);
    }
    
    @media (max-width: 1300px) {
        display: block;
    }
    
    @media (max-width: 768px) {
        padding: 4px 6px;
    }
`;

export const MobileMenuOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    animation: fadeIn 0.3s ease;
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const HeaderContainer = styled.div`
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 90%;
    width: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    
    @media (max-width: 768px) {
        max-width: 95%;
    }
`;

export const MobileMenu = styled.div`
    height: fit-content;
    max-height: 50vh;
    width: 100%;
    max-width: 350px;
    align-self: flex-end;
    background: white;
    border-radius: 25px;
    border: 1px solid rgba(76, 175, 80, 0.2);
    box-shadow: -4px 0 32px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    padding: 20px;
    animation: slideIn 0.3s ease;
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    @media (max-width: 480px) {
        width: 85%;
        max-width: 320px;
    }
`;

export const Header_ = styled(Block_)`
    width: 100%;
    padding: 0px;   
    justify-content: space-around;
    gap: 10px;

    border-radius: 25px;
    border: 1px solid rgba(76, 175, 80, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
                0 2px 8px rgba(0, 0, 0, 0.05);
    
    background-color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
                    0 4px 12px rgba(0, 0, 0, 0.08);
        border-color: rgba(76, 175, 80, 0.3);
    }
    
    @media (max-width: 1300px) {
        padding: 10px 16px;
        justify-content: space-between;
        gap: 8px;
    }
    
    @media (max-width: 768px) {
        padding: 8px 12px;
        border-radius: 20px;
        gap: 6px;
    }
    
    @media (max-width: 480px) {
        padding: 8px 10px;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: space-between;
        
        > ${MobileContactInfo}, > ${MobileMenuButton} {
            display: none;
        }
    }
`