import styled from 'styled-components';

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

// Layout for articles from CUSTOM_ARTICLES (shared header for all of them)
export const CustomContainer = styled.div`
    max-width: 90%;
    width: 100%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        max-width: 95%;
        margin: 30px auto;
    }

    @media (max-width: 480px) {
        margin: 20px auto;
    }
`;

export const CustomDate = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    color: #6c757d;
    margin-bottom: 20px;
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

    @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 8px 14px;
    }

    @media (max-width: 480px) {
        font-size: 0.85rem;
        padding: 6px 12px;
        gap: 6px;

        svg {
            width: 14px;
            height: 14px;
        }
    }
`;

export const CustomContent = styled.div`
    width: 100%;
    background: transparent;
    line-height: 1.6;
`;

export const CustomImage = styled.img<{ $wide?: boolean }>`
    width: 100%;
    max-width: ${props => props.$wide ? '600px' : '450px'};
    ${props => props.$wide ? '' : 'max-height: 300px; object-fit: cover;'}
    height: auto;
    border-radius: 12px;
    margin-bottom: 30px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        margin-bottom: 25px;
    }
`;

export const CustomLead = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 25px;
    text-align: justify;
    line-height: 1.8;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.15rem;
        text-align: left;
    }
`;
