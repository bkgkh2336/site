import styled, { keyframes } from "styled-components";

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

export const Container = styled.div`
    width: 85%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 15px auto;
        gap: 15px;
    }
`;

export const BackButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    background: rgba(40, 167, 69, 0.1);
    border: 2px solid #28a745;
    border-radius: 12px;
    color: #28a745;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: flex-start;
    
    &:hover {
        background: #28a745;
        color: white;
    }
`;