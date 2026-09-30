import styled from 'styled-components';

/*
 * Single source of truth for every structural block rendered on public pages
 * and inside the admin editor (TipTap node view + preview). Styles are moved
 * verbatim from the per-page styled.ts files; per-page differences live in
 * variants ($variant / dense) switched by BlocksView via pageKey.
 */

export const BlockText = styled.p`
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

export const BlockSectionTitle = styled.h2<{ $dense?: boolean }>`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: ${({ $dense }) => ($dense ? '1.5rem' : '1.6rem')};
    font-weight: 700;
    color: #28a745;
    margin: ${({ $dense }) => ($dense ? '35px 0 18px 0' : '30px 0 25px 0')};
    display: flex;
    align-items: center;
    gap: ${({ $dense }) => ($dense ? '10px' : '12px')};

    @media (max-width: 768px) {
        font-size: ${({ $dense }) => ($dense ? '1.3rem' : '1.4rem')};
        margin: ${({ $dense }) => ($dense ? '25px 0 12px 0' : '25px 0 20px 0')};
    }

    @media (max-width: 480px) {
        font-size: ${({ $dense }) => ($dense ? '1.15rem' : '1.2rem')};
        margin: ${({ $dense }) => ($dense ? '20px 0 10px 0' : '20px 0 15px 0')};
    }
`;

/* ---------- intro ---------- */

export const IntroBoxGreen = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(32, 201, 151, 0.08) 100%);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
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

export const IntroBoxRed = styled.div`
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

export const IntroBoxPlain = styled.div`
    border-left: 4px solid #28a745;
    padding: 20px 25px;
    margin-bottom: 35px;
    background: rgba(40, 167, 69, 0.03);
    border-radius: 0 8px 8px 0;

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const IntroTextPlain = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    color: #333;
    margin: 0;
    line-height: 1.8;

    strong {
        color: #28a745;
        font-weight: 700;
    }
`;

export const IntroIconGreen = styled.div`
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;

        svg {
            width: 32px;
            height: 32px;
        }
    }
`;

export const IntroIconRed = styled.div`
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

/* ---------- quote ---------- */

export const QuoteBox = styled.div`
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

export const QuoteLine = styled.p`
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

/* ---------- info ---------- */

export const InfoGradient = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(32, 201, 151, 0.08) 100%);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        padding: 20px;
    }

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const InfoGradientRow = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 12px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    color: #333;

    &:last-child {
        margin-bottom: 0;
    }

    strong {
        color: #28a745;
        font-weight: 700;
    }
`;

export const InfoFlat = styled.div`
    display: flex;
    gap: 15px;
    align-items: flex-start;
    background: rgba(40, 167, 69, 0.03);
    border-radius: 10px;
    padding: 18px 20px;
    margin-bottom: 25px;
    border-left: 4px solid #28a745;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
        padding: 14px;
    }
`;

export const InfoFlatIcon = styled.div`
    flex-shrink: 0;
    color: #28a745;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
`;

export const InfoFlatText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    color: #444;
    margin: 0;
    line-height: 1.7;
    text-align: left;
`;

/* ---------- link ---------- */

export const LinkButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #28a745;
    text-decoration: none;
    font-weight: 500;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    padding: 10px 20px;
    border: 2px solid #28a745;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-top: 10px;

    &:hover {
        background: rgba(40, 167, 69, 0.08);
    }
`;

/* ---------- gallery ---------- */

export const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 40px 0;

    @media (max-width: 768px) {
        gap: 15px;
        margin: 30px 0;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 12px;
        margin: 25px 0;
    }
`;

export const GalleryImg = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 25px rgba(40, 167, 69, 0.2);
    }

    @media (max-width: 768px) {
        height: 250px;
    }

    @media (max-width: 480px) {
        height: 200px;
    }
`;

/* ---------- people ---------- */

export const PeopleList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        gap: 15px;
    }
`;

export const PersonRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 25px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.03) 0%, rgba(32, 201, 151, 0.03) 100%);
    border: 2px solid rgba(40, 167, 69, 0.15);
    border-radius: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &:hover {
        background: linear-gradient(135deg, rgba(40, 167, 69, 0.06) 0%, rgba(32, 201, 151, 0.06) 100%);
        border-color: #28a745;
        transform: translateX(5px);
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.15);
    }

    @media (max-width: 768px) {
        padding: 20px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 16px;
    }
`;

export const PersonAvatar = styled.div`
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.25);

    @media (max-width: 768px) {
        width: 50px;
        height: 50px;

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

export const PersonBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const PersonName = styled.h3`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #28a745;
    margin: 0;
    line-height: 1.4;

    @media (max-width: 768px) {
        font-size: 1.15rem;
    }

    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
`;

export const PersonRole = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    color: #555;
    margin: 0;
    line-height: 1.6;

    @media (max-width: 768px) {
        font-size: 0.95rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

/* ---------- agenda ---------- */

export const AgendaWrap = styled.div`
    margin: 30px 0;

    & > h2:first-child {
        margin-top: 0;
    }
`;

export const AgendaList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
        gap: 15px;
    }
`;

export const AgendaCard = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 20px;
    background: rgba(40, 167, 69, 0.03);
    border-radius: 12px;
    border-left: 4px solid #28a745;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(40, 167, 69, 0.06);
        transform: translateX(5px);
        box-shadow: 0 2px 8px rgba(40, 167, 69, 0.1);
    }

    @media (max-width: 768px) {
        padding: 15px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
    }
`;

export const AgendaNum = styled.div`
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.25);

    @media (max-width: 768px) {
        width: 45px;
        height: 45px;
        font-size: 1.2rem;
    }

    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
    }
`;

export const AgendaText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    color: #333;
    margin: 0;
    line-height: 1.7;
    flex: 1;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`;

/* ---------- card (highlight box variant) ---------- */

export const HighlightBox = styled.div<{ $variant?: 'default' | 'warning' }>`
    background: ${({ $variant }) =>
        $variant === 'warning'
            ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.08) 0%, rgba(255, 152, 0, 0.08) 100%)'
            : 'linear-gradient(135deg, rgba(220, 53, 69, 0.06) 0%, rgba(255, 107, 107, 0.06) 100%)'};
    border: 2px solid ${({ $variant }) =>
        $variant === 'warning' ? 'rgba(255, 193, 7, 0.3)' : 'rgba(220, 53, 69, 0.2)'};
    border-left: 5px solid ${({ $variant }) => ($variant === 'warning' ? '#ffc107' : '#dc3545')};
    border-radius: 16px;
    padding: 30px;
    margin: 30px 0;
    display: flex;
    gap: 25px;
    align-items: flex-start;
    box-shadow: 0 4px 15px ${({ $variant }) =>
        $variant === 'warning' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(220, 53, 69, 0.08)'};

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

export const HighlightIcon = styled.div<{ $variant?: 'default' | 'warning' }>`
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: ${({ $variant }) =>
        $variant === 'warning'
            ? 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)'
            : 'linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 15px ${({ $variant }) =>
        $variant === 'warning' ? 'rgba(255, 193, 7, 0.3)' : 'rgba(220, 53, 69, 0.3)'};

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;

        svg {
            width: 28px;
            height: 28px;
        }
    }
`;

export const HighlightBody = styled.div`
    flex: 1;
`;

export const HighlightTitle = styled.h3<{ $variant?: 'default' | 'warning' }>`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ $variant }) => ($variant === 'warning' ? '#e6a800' : '#dc3545')};
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

/* ---------- card (green info card variant) ---------- */

export const InfoCard = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(32, 201, 151, 0.08) 100%);
    border: 2px solid rgba(40, 167, 69, 0.2);
    border-radius: 16px;
    padding: 30px;
    margin: 30px 0;
    display: flex;
    gap: 25px;
    align-items: flex-start;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.08);

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

export const InfoCardIcon = styled.div`
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;

        svg {
            width: 28px;
            height: 28px;
        }
    }
`;

export const InfoCardBody = styled.div`
    flex: 1;
`;

export const InfoCardTitle = styled.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 15px 0;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

export const InfoCardText = styled.p`
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

/* ---------- cards (grids) ---------- */

export const PlaceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
`;

export const PlaceCard = styled.div`
    border-radius: 10px;
    padding: 18px 16px;
    text-align: center;
    border: 1px solid rgba(40, 167, 69, 0.2);
    background: rgba(40, 167, 69, 0.04);

    @media (max-width: 480px) {
        padding: 14px;
    }
`;

export const PlaceCardYellow = styled(PlaceCard)`
    border-color: rgba(255, 193, 7, 0.2);
    background: rgba(255, 193, 7, 0.04);
`;

export const PlaceTitle = styled.h4`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 8px 0;
`;

export const PlaceTitleYellow = styled(PlaceTitle)`
    color: #e0a800;
`;

export const PlaceText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.88rem;
    color: #555;
    margin: 0;
    line-height: 1.6;
`;

export const MaintGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const MaintCard = styled.div`
    text-align: center;
    padding: 16px 12px;
    border-radius: 10px;
    background: rgba(40, 167, 69, 0.02);
    border: 1px solid rgba(40, 167, 69, 0.08);
    transition: background 0.2s ease;

    &:hover {
        background: rgba(40, 167, 69, 0.05);
    }
`;

export const MaintIcon = styled.div`
    font-size: 1.6rem;
    margin-bottom: 8px;
    color: #28a745;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MaintTitle = styled.h4`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 6px 0;
`;

export const MaintText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.82rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
`;

/* ---------- list (danger / recommendations / checklist) ---------- */

export const DangerBox = styled.div`
    background: white;
    border: 2px solid rgba(220, 53, 69, 0.15);
    border-radius: 16px;
    padding: 30px;
    margin: 30px 0;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.08);

    @media (max-width: 768px) {
        padding: 25px;
    }

    @media (max-width: 480px) {
        padding: 20px;
    }
`;

export const DangerHeading = styled.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #dc3545;
    margin: 0 0 25px 0;
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin-bottom: 20px;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

export const DangerList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const DangerRow = styled.div`
    display: flex;
    gap: 15px;
    align-items: flex-start;
    padding: 20px;
    background: rgba(220, 53, 69, 0.03);
    border-radius: 12px;
    border-left: 4px solid #dc3545;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(220, 53, 69, 0.06);
        transform: translateX(5px);
    }

    svg {
        flex-shrink: 0;
        color: #dc3545;
        margin-top: 2px;
    }

    div {
        font-family: 'Lato', 'Segoe UI', sans-serif;
        font-size: 1.05rem;
        color: #333;
        line-height: 1.7;

        strong {
            color: #dc3545;
            font-weight: 700;
        }
    }

    @media (max-width: 768px) {
        padding: 15px;
        gap: 12px;

        div {
            font-size: 1rem;
        }

        svg {
            width: 20px;
            height: 20px;
        }
    }

    @media (max-width: 480px) {
        div {
            font-size: 0.95rem;
        }
    }
`;

export const RecoBox = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.03) 0%, rgba(32, 201, 151, 0.03) 100%);
    border: 2px solid rgba(40, 167, 69, 0.15);
    border-radius: 16px;
    padding: 30px;
    margin: 30px 0;

    h3 {
        font-family: 'Archivo', 'Segoe UI', sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        color: #28a745;
        margin: 0 0 25px 0;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        padding: 25px;

        h3 {
            font-size: 1.2rem;
            margin-bottom: 20px;
        }
    }

    @media (max-width: 480px) {
        padding: 20px;

        h3 {
            font-size: 1.1rem;
        }
    }
`;

export const RecoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const RecoRow = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 15px;
    background: white;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(40, 167, 69, 0.05);
        transform: translateX(5px);
    }

    @media (max-width: 768px) {
        padding: 12px;
    }
`;

export const RecoIcon = styled.div`
    flex-shrink: 0;
    color: #28a745;
    margin-top: 2px;

    svg[data-lucide="x-circle"] {
        color: #dc3545;
    }
`;

export const RecoText = styled.span`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    color: #333;
    line-height: 1.7;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`;

export const CheckGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 20px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckRow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 12px;

    @media (max-width: 480px) {
        padding: 8px 10px;
    }
`;

export const CheckIcon = styled.div`
    flex-shrink: 0;
    color: #28a745;
    display: flex;
    align-items: center;
    margin-top: 3px;
`;

export const CheckText = styled.span`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.98rem;
    color: #333;
    line-height: 1.6;
`;

/* ---------- steps ---------- */

export const StepsBox = styled.div`
    position: relative;
    padding-left: 40px;
    margin-bottom: 25px;

    @media (max-width: 480px) {
        padding-left: 30px;
    }
`;

export const StepRow = styled.div`
    position: relative;
    padding: 12px 0 12px 20px;
    margin-bottom: 8px;

    &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: rgba(40, 167, 69, 0.15);
    }

    &:last-child::before {
        display: none;
    }

    &::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 16px;
        width: 14px;
        height: 14px;
        background: #28a745;
        border-radius: 50%;
        border: 3px solid #fff;
        box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
    }
`;

export const StepNum = styled.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #28a745;
    margin-left: 10px;
    margin-bottom: 4px;
`;

export const StepText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #333;
    margin: 0;
    line-height: 1.7;
    text-align: left;

    strong {
        color: #28a745;
        font-weight: 700;
    }
`;

/* ---------- stats ---------- */

export const StatsBox = styled.div`
    margin-bottom: 40px;
`;

export const StatsInner = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 35px 30px;
    margin-top: 20px;

    @media (max-width: 768px) {
        padding: 25px 20px;
    }
`;

export const StatsCaption = styled.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #28a745;
    text-align: center;
    margin: 0 0 25px 0;
    letter-spacing: 0.5px;

    @media (max-width: 480px) {
        font-size: 1rem;
        margin-bottom: 15px;
    }
`;

export const StatsRow = styled.div`
    display: flex;
    align-items: stretch;
    gap: 0;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const StatCell = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px 15px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const StatSep = styled.div`
    width: 1px;
    background: #dee2e6;
    align-self: stretch;

    @media (max-width: 768px) {
        width: 100%;
        height: 1px;
    }
`;

export const StatNum = styled.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: #28a745;
    line-height: 1.1;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 2.8rem;
    }

    @media (max-width: 480px) {
        font-size: 2.2rem;
    }
`;

export const StatMain = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    color: #555;
    margin: 0 0 4px 0;
    line-height: 1.5;
`;

export const StatSub = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.85rem;
    color: #888;
    margin: 0;
    line-height: 1.5;
`;

/* ---------- warning ---------- */

export const WarnBox = styled.div`
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
    border: 2px solid rgba(255, 193, 7, 0.5);
    border-radius: 12px;
    padding: 25px;
    margin: 30px 0;
    border-left: 5px solid #ffc107;
    box-shadow: 0 4px 12px rgba(255, 193, 7, 0.15);

    @media (max-width: 768px) {
        padding: 20px;
        margin: 25px 0;
    }

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const WarnRow = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    background: rgba(255, 193, 7, 0.06);
    border: 1px solid rgba(255, 193, 7, 0.15);
    border-left: 4px solid #ffc107;
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 25px;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 8px;
        padding: 14px;
    }
`;

export const WarnIcon = styled.div`
    flex-shrink: 0;
    color: #ffc107;
    display: flex;
    align-items: center;
    margin-top: 2px;
`;

export const WarnText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.98rem;
    color: #555;
    margin: 0;
    line-height: 1.7;
    text-align: left;
`;

/* ---------- author ---------- */

export const AuthorBlue = styled.div`
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

export const AuthorBlueRole = styled.p`
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

export const AuthorBlueName = styled.p`
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

export const AuthorGreen = styled.div`
    margin-top: 40px;
    padding: 25px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(32, 201, 151, 0.05) 100%);
    border-radius: 12px;
    text-align: center;
    border: 2px solid rgba(40, 167, 69, 0.15);

    strong {
        font-family: 'Archivo', 'Segoe UI', sans-serif;
        font-size: 1.2rem;
        color: #28a745;
        font-weight: 700;
    }

    @media (max-width: 768px) {
        padding: 20px;
        margin-top: 30px;

        strong {
            font-size: 1.1rem;
        }
    }

    @media (max-width: 480px) {
        padding: 16px;

        strong {
            font-size: 1rem;
        }
    }
`;

/* ---------- final ---------- */

export const FinalBox = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(32, 201, 151, 0.08) 100%);
    border: 1px solid rgba(40, 167, 69, 0.15);
    border-radius: 16px;
    padding: 35px 30px;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        padding: 25px 20px;
    }

    @media (max-width: 480px) {
        padding: 20px 16px;
    }
`;

export const FinalTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 15px 0;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.3rem;
    }
`;

export const FinalText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    color: #333;
    line-height: 1.8;
    margin: 0 auto 15px auto;
    text-align: center;

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

export const FinalCta = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #28a745;
    margin-top: 20px;
    padding: 12px 24px;
    border: 2px solid #28a745;
    border-radius: 10px;
    display: inline-block;
`;
