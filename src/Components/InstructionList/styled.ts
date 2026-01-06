import styled from "styled-components";

export const StyledList = styled.ol`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    padding-left: 20px;
    color: #495057;
    li {
        &::marker {
            color: #28a745;
            font-weight: 700;
        }
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.6;
    }
`;