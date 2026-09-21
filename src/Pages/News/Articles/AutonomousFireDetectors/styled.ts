import styled from 'styled-components';
import { Calendar } from 'lucide-react';

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
    line-height: 1.7;
`;

export const ArticleImage = styled.img`
    width: 100%;
    max-width: 450px;
    max-height: 300px;
    object-fit: cover;
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
    border-left: 4px solid #28a745;
    padding: 20px 25px;
    margin-bottom: 35px;
    background: rgba(40, 167, 69, 0.03);
    border-radius: 0 8px 8px 0;

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const IntroText = styled.p`
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

export const StatisticsSection = styled.div`
    margin-bottom: 40px;
`;

export const StatsContainer = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 35px 30px;
    margin-top: 20px;

    @media (max-width: 768px) {
        padding: 25px 20px;
    }
`;

export const StatsLabel = styled.h3`
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

export const StatsGrid = styled.div`
    display: flex;
    align-items: stretch;
    gap: 0;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const StatBlock = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px 15px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const StatDivider = styled.div`
    width: 1px;
    background: #dee2e6;
    align-self: stretch;

    @media (max-width: 768px) {
        width: 100%;
        height: 1px;
    }
`;

export const StatNumber = styled.div`
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

export const StatMainLabel = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    color: #555;
    margin: 0 0 4px 0;
    line-height: 1.5;
`;

export const StatSubLabel = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.85rem;
    color: #888;
    margin: 0;
    line-height: 1.5;
`;

export const SectionTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #28a745;
    margin: 35px 0 18px 0;
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
        font-size: 1.3rem;
        margin: 25px 0 12px 0;
    }

    @media (max-width: 480px) {
        font-size: 1.15rem;
        margin: 20px 0 10px 0;
    }
`;

export const ArticleText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    color: #333;
    margin-bottom: 18px;
    line-height: 1.8;
    text-align: left;

    strong {
        color: #28a745;
        font-weight: 700;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export const InfoBlock = styled.div`
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

export const InfoBlockIcon = styled.div`
    flex-shrink: 0;
    color: #28a745;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
`;

export const InfoBlockText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #444;
    margin: 0;
    line-height: 1.7;
    text-align: left;
`;

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
`;

export const PlacementCard = styled.div`
    border-radius: 10px;
    padding: 18px 16px;
    text-align: center;
    border: 1px solid rgba(40, 167, 69, 0.12);
    background: rgba(40, 167, 69, 0.02);

    @media (max-width: 480px) {
        padding: 14px;
    }
`;

export const PlacementCardGreen = styled(PlacementCard)`
    border-color: rgba(40, 167, 69, 0.2);
    background: rgba(40, 167, 69, 0.04);
`;

export const PlacementCardYellow = styled(PlacementCard)`
    border-color: rgba(255, 193, 7, 0.2);
    background: rgba(255, 193, 7, 0.04);
`;

export const PlacementCardTitle = styled.h4`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 8px 0;
`;

export const PlacementCardYellowTitle = styled(PlacementCardTitle)`
    color: #e0a800;
`;

export const PlacementCardText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.88rem;
    color: #555;
    margin: 0;
    line-height: 1.6;
`;

export const ChecklistGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 20px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ChecklistItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 12px;

    @media (max-width: 480px) {
        padding: 8px 10px;
    }
`;

export const ChecklistIcon = styled.div`
    flex-shrink: 0;
    color: #28a745;
    display: flex;
    align-items: center;
    margin-top: 3px;
`;

export const ChecklistText = styled.span`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.98rem;
    color: #333;
    line-height: 1.6;
`;

export const StepsContainer = styled.div`
    position: relative;
    padding-left: 40px;
    margin-bottom: 25px;

    @media (max-width: 480px) {
        padding-left: 30px;
    }
`;

export const StepItem = styled.div`
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

export const StepNumber = styled.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #28a745;
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

export const WarningBlock = styled.div`
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

export const WarningIcon = styled.div`
    flex-shrink: 0;
    color: #ffc107;
    display: flex;
    align-items: center;
    margin-top: 2px;
`;

export const WarningText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.98rem;
    color: #555;
    margin: 0;
    line-height: 1.7;
    text-align: left;
`;

export const MaintenanceGrid = styled.div`
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

export const MaintenanceCard = styled.div`
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

export const MaintenanceIcon = styled.div`
    font-size: 1.6rem;
    margin-bottom: 8px;
    color: #28a745;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MaintenanceTitle = styled.h4`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 6px 0;
`;

export const MaintenanceDesc = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.82rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
`;

export const FinalSection = styled.div`
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
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    color: #333;
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto 15px auto;
    text-align: left;

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

export const CtaText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #28a745;
    margin-top: 20px;
    padding: 12px 24px;
    border: 2px solid #28a745;
    border-radius: 10px;
    display: inline-block;
`;