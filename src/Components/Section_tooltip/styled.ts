import styled from "styled-components";
import { Block_ } from "../Block/styled";

export const Section_tooltip_ = styled(Block_)`
    position: absolute;
    z-index: 3;
    box-sizing: border-box;
    flex-direction: column;
    background-color: white;
    max-width: 15%;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    will-change: opacity, transform;
    animation: fade-in 0.3s ease-out;
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
`
