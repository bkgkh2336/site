import styled, { keyframes } from "styled-components";
import { Block_ } from "../../Components/Block/styled";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Vacancies_ = styled(Block_)`
    padding: 20px;
    flex: 1;
    flex-direction: column;
    align-items: start;
    animation: ${fadeIn} 0.6s ease-out;
`