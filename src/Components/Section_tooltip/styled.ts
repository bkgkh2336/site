import styled from "styled-components";
import { Block_ } from "../Block/styled";

export const TooltipItem = styled.button<{ $active?: boolean }>`
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 9px 14px;
    border: none;
    border-radius: 8px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.3;
    text-align: left;
    cursor: pointer;
    user-select: none;
    background: ${({ $active }) => ($active ? 'rgba(40, 167, 69, 0.12)' : 'transparent')};
    color: ${({ $active }) => ($active ? '#28a745' : 'inherit')};
    font-weight: ${({ $active }) => ($active ? 700 : 'normal')};
    transition: background-color 0.15s ease;

    &:hover {
        background: rgba(40, 167, 69, 0.1);
    }

    &:active {
        background: rgba(40, 167, 69, 0.18);
    }
`;

export const Section_tooltip_ = styled(Block_)<{ $visible?: boolean }>`
    position: absolute;
    z-index: 3;
    box-sizing: border-box;
    flex-direction: column;
    flex-wrap: nowrap;
    background-color: white;
    max-width: 15%;
    min-width: 240px;
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;

    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
    transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(-6px)')};
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;

    @media (max-width: 1200px) {
        max-width: 25%;
        min-width: 200px;
    }
    
    @media (max-width: 768px) {
        max-width: 35%;
        min-width: 180px;
        max-height: 200px;
    }
`
