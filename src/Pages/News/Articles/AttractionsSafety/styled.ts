import styled, { css } from 'styled-components';

export const ArticleContainer = styled.div`
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

export const PublicationDate = styled.div`
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

export const ArticleContent = styled.div`
    width: 100%;
    background: transparent;
    line-height: 1.6;
`;

export const ArticleImage = styled.img`
    width: 100%;
    max-width: 600px;
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

export const IntroSection = styled.div`
    background: linear-gradient(135deg, rgba(220, 53, 69, 0.05) 0%, rgba(255, 193, 7, 0.05) 100%);
    border-left: 5px solid #dc3545;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    display: flex;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: 768px) {
        padding: 20px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

export const IconWrapper = styled.div`
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;

        svg {
            width: 32px;
            height: 32px;
        }
    }
`;

export const ArticleText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    color: #333;
    margin-bottom: 20px;
    text-align: justify;
    line-height: 1.8;

    strong {
        color: #28a745;
        font-weight: 700;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.7;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
        text-align: left;
    }
`;

interface HighlightBoxProps {
    variant?: 'default' | 'warning';
}

export const HighlightBox = styled.div<HighlightBoxProps>`
    background: ${({ variant }) =>
        variant === 'warning'
            ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.08) 0%, rgba(255, 152, 0, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(220, 53, 69, 0.06) 0%, rgba(255, 107, 107, 0.06) 100%)'};
    border: 2px solid ${({ variant }) =>
        variant === 'warning' ? 'rgba(255, 193, 7, 0.3)' : 'rgba(220, 53, 69, 0.2)'};
    border-left: 5px solid ${({ variant }) =>
        variant === 'warning' ? '#ffc107' : '#dc3545'};
    border-radius: 16px;
    padding: 30px;
    margin: 30px 0;
    display: flex;
    gap: 25px;
    align-items: flex-start;
    box-shadow: 0 4px 15px ${({ variant }) =>
        variant === 'warning' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(220, 53, 69, 0.08)'};

    @media (max-width: 768px) {
        padding: 25px;
        gap: 20px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        padding: 20px;
        text-align: center;
    }
`;

interface IconVariant {
    variant?: 'default' | 'warning';
}

export const HighlightIcon = styled.div<IconVariant>`
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: ${({ variant }) =>
        variant === 'warning'
            ? 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)'
            : 'linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 15px ${({ variant }) =>
        variant === 'warning' ? 'rgba(255, 193, 7, 0.3)' : 'rgba(220, 53, 69, 0.3)'};

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;

        svg {
            width: 28px;
            height: 28px;
        }
    }
`;

export const HighlightContent = styled.div`
    flex: 1;
`;

export const HighlightTitle = styled.h3<{ variant?: 'default' | 'warning' }>`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ variant }) => (variant === 'warning' ? '#e6a800' : '#dc3545')};
    margin: 0 0 15px 0;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

export const HighlightText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    color: #333;
    line-height: 1.8;
    margin: 0;
    text-align: justify;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
        text-align: left;
    }
`;

export const QuoteSection = styled.div`
    background: linear-gradient(135deg, rgba(13, 110, 253, 0.04) 0%, rgba(0, 123, 255, 0.04) 100%);
    border: 2px solid rgba(13, 110, 253, 0.15);
    border-radius: 12px;
    padding: 25px;
    margin: 30px 0;
    border-left: 5px solid #0d6efd;

    @media (max-width: 768px) {
        padding: 20px;
    }

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const QuoteText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    color: #333;
    line-height: 1.8;
    margin: 0;
    text-align: justify;
    display: flex;
    gap: 12px;
    align-items: flex-start;

    svg {
        flex-shrink: 0;
        color: #0d6efd;
        margin-top: 3px;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
        text-align: left;
    }
`;

export const AuthorSection = styled.div`
    margin-top: 40px;
    padding: 25px;
    background: linear-gradient(135deg, rgba(13, 110, 253, 0.04) 0%, rgba(0, 123, 255, 0.04) 100%);
    border: 2px solid rgba(13, 110, 253, 0.15);
    border-radius: 12px;
    text-align: center;

    @media (max-width: 768px) {
        padding: 20px;
        margin-top: 30px;
    }

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const AuthorRole = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    color: #555;
    margin: 0 0 4px 0;
    line-height: 1.5;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`;

export const AuthorName = styled.p`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0d6efd;
    margin: 10px 0 0 0;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;
