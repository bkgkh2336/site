import styled from "styled-components";
import { Block_ } from "../../Components/Block/styled";

export const Contacts_ = styled(Block_)`
    flex-direction: column;
    padding: 20px;
    
    @media (max-width: 768px) {
        padding: 15px 10px;
    }
`