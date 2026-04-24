import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BreadcrumbsContainer = styled.nav`
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    padding: 16px 0;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const BreadcrumbsList = styled.ol`
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0 24px;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        padding: 0 16px;
        gap: 8px;
    }
`;

export const BreadcrumbItem = styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #5a6c7d;
    font-weight: 400;
    letter-spacing: 0.2px;

    svg {
        color: #9ca3af;
        flex-shrink: 0;
        transition: color 0.2s ease;
    }

    @media (max-width: 768px) {
        font-size: 13px;
        gap: 7px;

        svg {
            width: 14px;
            height: 14px;
        }
    }
`;

export const BreadcrumbLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 7px;
    color: #28a745;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    padding: 4px 8px;
    border-radius: 6px;
    margin: -4px -8px;

    &:hover {
        color: #218838;
        background-color: rgba(40, 167, 69, 0.08);
        
        svg {
            color: #28a745;
        }
    }

    &:active {
        background-color: rgba(40, 167, 69, 0.12);
    }

    span {
        @media (max-width: 480px) {
            display: none;
        }
    }
`;

export const BreadcrumbText = styled.span`
    color: #2c3e50;
    font-weight: 600;
    letter-spacing: 0.3px;
`;