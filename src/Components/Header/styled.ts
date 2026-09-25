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
    
    @media (max-width: 1410px) {
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
    
    @media (max-width: 515px) {
        gap: 6px;
        
        img {
            height: 30px !important;
        }
        
        .full-name {
            display: none;
        }
        
        .short-name {
            display: block;
        }
    }
`;

export const Nav = styled(Block_)`
    gap: 10px;
    padding: 0;
    
    @media (max-width: 1410px) {
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
    
    @media (max-width: 1410px) {
        display: none;
    }
`;

export const MobileActions = styled.div`
    display: none;
    
    @media (max-width: 1410px) {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
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
    
    @media (max-width: 1410px) {
        display: flex;
    }
    
    @media (max-width: 768px) {
        padding: 4px 6px;
        font-size: 0.9rem;
    }
    
    @media (max-width: 515px) {
        font-size: 0.85rem;
        
        span {
            display: none;
        }
    }
`;

export const HamburgerButton = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    flex-shrink: 0;
    z-index: 1001;
    
    &:hover {
        background-color: rgba(40, 167, 69, 0.1);
    }
    
    @media (max-width: 1410px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @media (max-width: 768px) {
        padding: 6px;
    }
`;

export const HamburgerIcon = styled.div<{ $open: boolean }>`
    width: 24px;
    height: 18px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    
    span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: #28a745;
        border-radius: 2px;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
        
        &:nth-child(1) {
            transform: ${({ $open }) => $open ? 'rotate(45deg) translate(4px, 4px)' : 'none'};
        }
        
        &:nth-child(2) {
            opacity: ${({ $open }) => $open ? 0 : 1};
            transform: ${({ $open }) => $open ? 'scaleX(0)' : 'none'};
        }
        
        &:nth-child(3) {
            transform: ${({ $open }) => $open ? 'rotate(-45deg) translate(4px, -4px)' : 'none'};
        }
    }
`;

export const MobileMenuOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    
    &.visible {
        opacity: 1;
        visibility: visible;
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

export const BottomSheet = styled.div<{ $open: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: white;
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.12),
                0 -2px 12px rgba(0, 0, 0, 0.06);
    max-height: 75vh;
    overflow-y: auto;
    overscroll-behavior: none;
    touch-action: pan-y;
    transform: translateY(${({ $open }) => $open ? 0 : '100%'});
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(40, 167, 69, 0.3);
        border-radius: 4px;
    }
`;

export const BottomSheetHandle = styled.div`
    display: flex;
    justify-content: center;
    padding: 12px 0 4px;
    cursor: grab;
    
    &:active {
        cursor: grabbing;
    }
    
    @media (max-width: 515px) {
        padding: 8px 0 2px;
    }
`;

export const BottomSheetHandleBar = styled.div`
    width: 36px;
    height: 4px;
    background: rgba(40, 167, 69, 0.3);
    border-radius: 4px;
    transition: background 0.3s ease;
    
    &:hover {
        background: rgba(40, 167, 69, 0.5);
    }
`;

export const BottomSheetContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 16px 24px;
    
    @media (max-width: 515px) {
        padding: 4px 12px 20px;
    }
`;

export const SheetDivider = styled.div`
    height: 1px;
    background: rgba(40, 167, 69, 0.12);
    margin: 8px 0;
`;

export const SheetContactSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 16px 20px;
    border-top: 1px solid rgba(40, 167, 69, 0.1);
    margin-top: 4px;
    
    @media (max-width: 515px) {
        padding: 8px 12px 16px;
    }
`;

export const SheetContactItem = styled.a`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 12px;
    border-radius: 12px;
    text-decoration: none;
    color: #333;
    font-weight: 600;
    transition: background 0.2s ease;
    
    &:hover {
        background: rgba(40, 167, 69, 0.06);
    }
    
    @media (max-width: 515px) {
        padding: 10px;
        font-size: 0.9rem;
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
    
    @media (max-width: 1410px) {
        padding: 10px 16px;
        justify-content: space-between;
        gap: 8px;
    }
    
    @media (max-width: 768px) {
        padding: 8px 12px;
        border-radius: 20px;
        gap: 6px;
    }
    
    @media (max-width: 515px) {
        padding: 8px 10px;
        gap: 6px;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
`
