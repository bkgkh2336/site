import styled from "styled-components";

export const StyledLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    background: #28a745;
    border: none;
    border-radius: 10px;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 15px;
    
    &:hover {
        background: #218838;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
`;