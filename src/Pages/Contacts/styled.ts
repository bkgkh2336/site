import styled from "styled-components";
import { Block_ } from "../../Components/Block/styled";

export const Contacts_ = styled(Block_)`
    flex-direction: column;
    padding: 20px;
    
    @media (max-width: 768px) {
        padding: 15px 10px;
    }
`

export const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    animation: fadeIn 0.6s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`