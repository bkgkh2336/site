import styled from 'styled-components';

export const Button_ = styled.button`
    transition: 0.3s all ease-in-out;
    word-wrap: break-word;
    white-space: normal;
    user-select: none;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    
    &:hover{
        transform: translateY(-5px);
        background-color: #e7f3e9;
        color: #0c3e14ff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    &:active{
        transform: translateY(-5px);
        scale: 0.95
    }
    
    @media (max-width: 768px) {
        padding: 8px;
        font-size: 0.95rem;
    }
    
    @media (max-width: 480px) {
        padding: 6px 8px;
        font-size: 0.9rem;
    }
`;
