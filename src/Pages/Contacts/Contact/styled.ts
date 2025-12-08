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
`
