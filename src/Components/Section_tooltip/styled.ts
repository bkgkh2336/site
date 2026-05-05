import styled from "styled-components";
import { Block_ } from "../Block/styled";

export const Section_tooltip_ = styled(Block_)`
    position: absolute;
    z-index: 3;
    box-sizing: border-box;
    flex-direction: column;
    flex-wrap: nowrap;
    background-color: white;
    max-width: 15%;
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    will-change: opacity, transform;
    animation: fade-in 0.3s ease-out;
    display: none;
    
    &.visible {
        display: flex;
    }
    
    &.hiding {
        transform: translateY(-5px);
        opacity: 0;
    }
    
    @keyframes fade-in {
        0% {
            transform: translateY(-5px);
            opacity: 0;
        }
        30% {
            opacity: 1;
        }
        50% {
            transform: translateY(5px);
        }
        100% {
            transform: translateY(0);
        }
    }
    
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
