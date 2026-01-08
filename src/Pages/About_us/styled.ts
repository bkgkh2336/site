import styled from "styled-components";
import { Block_ } from "../../Components/Block/styled";

export const About_us_ = styled(Block_)`
    align-items: start;
    flex-direction: column;
    align-items: center;
    
    .intro-block {
        width: 80%;
        padding: 0;
        
        @media (max-width: 768px) {
            width: 95%;
            padding: 10px;
        }
        
        @media (max-width: 480px) {
            width: 100%;
            padding: 5px;
        }
    }
    
    .tasks-container {
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: center;
        width: 90%;
        gap: 20px;
        
        > div {
            width: 48%;
            
            @media (max-width: 968px) {
                width: 100%;
            }
        }
        
        @media (max-width: 768px) {
            width: 95%;
            gap: 15px;
        }
        
        @media (max-width: 480px) {
            width: 100%;
            gap: 12px;
        }
    }
`