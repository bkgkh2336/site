import styled from 'styled-components';
import { articleBodyCss } from '../../../styles/articleBody';

export const PublicationDate = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    color: #6c757d;
    padding: 10px 16px;
    background: rgba(40, 167, 69, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(40, 167, 69, 0.15);
    align-self: flex-start;

    svg {
        flex-shrink: 0;
        color: #28a745;
    }

    span {
        font-weight: 500;
    }

    @media (max-width: 480px) {
        font-size: 0.85rem;
        padding: 6px 12px;
        gap: 6px;
    }
`;

export const HeroImage = styled.img`
    width: 100%;
    max-width: 640px;
    max-height: 380px;
    object-fit: cover;
    height: auto;
    border-radius: 12px;
    display: block;
    margin: 0 auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Lead = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    text-align: justify;
    line-height: 1.8;

    @media (max-width: 768px) {
        font-size: 1.15rem;
        text-align: left;
    }
`;

export const ArticleBody = styled.div`
    ${articleBodyCss}
`;

export const GalleryCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
`;

export const GalleryImage = styled.img`
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    transition: filter 0.2s ease;

    &:hover {
        filter: brightness(0.92);
    }
`;
