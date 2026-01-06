import styled from "styled-components";

export const StyledList = styled.ul`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #495057;
    padding-left: 25px;
    margin: 0;
    list-style-type: disc;
    
    li {
        margin-bottom: 12px;
        
        &:last-child {
            margin-bottom: 0;
        }
        
        &::marker {
            color: #28a745;
        }
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.6;
        padding-left: 20px;
        
        li {
            margin-bottom: 10px;
        }
    }
`;