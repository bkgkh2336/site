import styled from "styled-components";
import { Block_ } from "../../../Components/Block/styled";

export const Contact_ = styled(Block_)`
    flex-direction: column;
    flex: 0 0 auto;
    width: calc(16.666% - 25px);
    min-width: 180px;
    max-width: 250px;
    justify-content: flex-start;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 249, 250, 0.6));
    border-radius: 25px;
    padding: 20px;
    transition: all 0.3s ease;
    border: 1px solid transparent;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        border-color: #28a745;
    }
    
    @media (max-width: 1400px) {
        width: calc(20% - 24px);
    }
    
    @media (max-width: 1200px) {
        width: calc(25% - 22.5px);
    }
    
    @media (max-width: 992px) {
        width: calc(33.333% - 20px);
    }
    
    @media (max-width: 768px) {
        width: calc(50% - 15px);
        min-width: 160px;
        padding: 15px;
    }
    
    @media (max-width: 900px) and (orientation: landscape) {
        width: calc(33.333% - 20px);
        min-width: 140px;
        padding: 12px;
    }
    
    @media (max-width: 480px) {
        width: 100%;
        min-width: unset;
        max-width: 100%;
        margin: 0;
    }
`