import styled from "styled-components";
import { Block_ } from "../../../Components/Block/styled";

export const Contact_ = styled(Block_)`
    flex-direction: column;
    width: 13%;
    justify-content: center;
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
    
    @media (max-width: 1200px) {
        width: 18%;
        min-width: 180px;
    }
    
    @media (max-width: 992px) {
        width: 22%;
        min-width: 200px;
    }
    
    @media (max-width: 768px) {
        width: 45%;
        min-width: 160px;
        padding: 15px;
    }
    
    @media (max-width: 480px) {
        width: 100%;
        min-width: unset;
        max-width: 280px;
        margin: 0 auto;
    }
`