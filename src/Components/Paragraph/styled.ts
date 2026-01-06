import styled from "styled-components";

export const StyledParagraph = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #495057;
    margin-bottom: 15px;
    
    &:last-child {
        margin-bottom: 0;
    }
    
    a {
        color: #007bff;
        text-decoration: none;
    }
    
    a:hover {
        color: #0056b3;
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 12px;
    }
`;