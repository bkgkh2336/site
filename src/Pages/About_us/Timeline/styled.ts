import styled from "styled-components";
import { Block_ } from "../../../Components/Block/styled";

export const Timeline_ = styled(Block_)`
    flex-direction: column;
    gap: 0;
    box-sizing: border-box;
    width: 100%;
`

export const Line_ = styled.div`
    width: 3px;
    height: 5rem;
    background-color: #28a745;
    margin: auto;
`
export const Dot_ = styled.div`
    display: flex;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #28a745;
    margin: auto;
    text-align: center;
    > span {
        margin: 0;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        margin: auto;
    }
`

export const DescriptionEvent_ = styled(Block_)`
    flex-direction: column;
    align-items: normal;
    position: absolute;
    background-color: white;
    padding: 20px;
    bottom: 0px;
    border: 1px solid #28a745;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 30%;
`
