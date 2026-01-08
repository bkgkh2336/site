import styled, { keyframes } from "styled-components";

const gradients = [
    'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)',
    'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)'
];

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

export const Vacancy_ = styled.a<{index: number}>`
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 12px 16px;
    width: 100%;
    gap: 8px;
    box-sizing: border-box;
    color: black;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    border: 2px solid transparent;
    align-items: start;
    background: ${props => gradients[props.index % gradients.length]};
    position: relative;
    overflow: hidden;
    
    animation: ${fadeIn} 0.5s ease-out;
    animation-delay: ${props => props.index * 0.05}s;
    animation-fill-mode: both;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(180deg, #28a745 0%, #20c997 100%);
        border-radius: 4px 0 0 4px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(40, 167, 69, 0.2);
        border-color: #28a745;

        &::before {
            opacity: 1;
        }
    }

    &:active {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(40, 167, 69, 0.15);
    }
`

export const VacancyContent = styled.div`
    display: flex;
    padding: 0;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const VacancyInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: flex-start;
    gap: 4px;
`

export const VacancyHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0;
    gap: 10px;
    flex-wrap: wrap;
`

export const LocationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`