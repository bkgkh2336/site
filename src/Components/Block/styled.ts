import styled from "styled-components"

export const Block_ = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    transition: 0.3s all ease-in-out;
    padding: 10px;
    border-radius: 10px;
    
    @media (max-width: 768px) {
        gap: 8px;
        padding: 8px;
    }
    
    @media (max-width: 480px) {
        gap: 6px;
        padding: 6px;
    }
`
