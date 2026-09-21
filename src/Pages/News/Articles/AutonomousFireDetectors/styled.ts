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
    line-height: 1.6;
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
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.06) 0%, rgba(32, 201, 151, 0.06) 100%);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 40px;
    text-align: center;

    @media (max-width: 768px) {
        padding: 20px;
        margin-bottom: 30px;
    }

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const IntroText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.1rem;
    color: #333;
    margin: 0;
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

export const StatisticsSection = styled.div`
    margin-bottom: 40px;
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 15px;
    }
`;

export const StatCard = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(32, 201, 151, 0.08) 100%);
    border: 2px solid rgba(40, 167, 69, 0.15);
    border-radius: 16px;
    padding: 25px 20px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &:hover {
        border-color: #28a745;
        box-shadow: 0 6px 25px rgba(40, 167, 69, 0.15);
        transform: translateY(-3px);
    }

    @media (max-width: 768px) {
        padding: 20px 16px;
    }
`;

export const StatNumber = styled.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #28a745;
    line-height: 1.2;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 2.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
    }
`;

export const StatLabel = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    color: #555;
    margin: 0;
    line-height: 1.6;
`;

export const SectionTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #28a745;
    margin: 35px 0 20px 0;
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin: 25px 0 15px 0;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
        margin: 20px 0 12px 0;
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

export const InfoCard = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.06) 0%, rgba(32, 201, 151, 0.06) 100%);
    border-left: 5px solid #28a745;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const InfoCardTitle = styled.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const InfoCardText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    color: #444;
    margin: 0;
    line-height: 1.7;
    text-align: justify;
`;

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const PlacementCard = styled.div`
    background: rgba(40, 167, 69, 0.03);
    border: 1px solid rgba(40, 167, 69, 0.12);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        border-color: #28a745;
        background: rgba(40, 167, 69, 0.06);
    }
`;

export const PlacementCardTitle = styled.h4`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 8px 0;
`;

export const PlacementCardText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    color: #555;
    margin: 0;
    line-height: 1.6;
`;

export const WarningCard = styled.div`
    background: rgba(255, 193, 7, 0.08);
    border: 1px solid rgba(255, 193, 7, 0.2);
    border-left: 5px solid #ffc107;
    border-radius: 12px;
    padding: 20px 25px;
    margin-bottom: 30px;
    display: flex;
    align-items: flex-start;
    gap: 15px;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
        padding: 16px;
    }
`;

export const ChecklistGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ChecklistItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(40, 167, 69, 0.03);
    border-radius: 10px;
    border-left: 4px solid #28a745;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(40, 167, 69, 0.06);
    }
`;

export const ChecklistIcon = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #28a745;
    margin-top: 2px;
`;

export const ChecklistText = styled.span`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    color: #333;
    line-height: 1.6;
`;

export const StepsGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;
`;

export const StepItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 16px 20px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.04) 0%, rgba(32, 201, 151, 0.04) 100%);
    border-radius: 12px;
    border-left: 4px solid #28a745;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(40, 167, 69, 0.07);
    }

    @media (max-width: 480px) {
        padding: 12px 16px;
    }
`;

export const StepNumber = styled.div`
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
`;

export const StepText = styled.div`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
`;

export const MaintenanceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const MaintenanceCard = styled.div`
    background: rgba(40, 167, 69, 0.03);
    border: 1px solid rgba(40, 167, 69, 0.12);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        border-color: #28a745;
        background: rgba(40, 167, 69, 0.06);
        transform: translateY(-2px);
    }
`;

export const MaintenanceIcon = styled.div`
    font-size: 1.8rem;
    margin-bottom: 8px;
    color: #28a745;
`;

export const MaintenanceTitle = styled.h4`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 6px 0;
`;

export const MaintenanceDesc = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.8rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
`;

export const FinalCallToAction = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
    border: 2px solid rgba(40, 167, 69, 0.2);
    border-radius: 16px;
    padding: 35px;
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
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 15px 0;

    @media (max-width: 768px) {
        font-size: 1.6rem;
    }

    @media (max-width: 480px) {
        font-size: 1.3rem;
    }
`;

export const FinalText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.15rem;
    color: #333;
    line-height: 1.8;
    margin-bottom: 10px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        font-size: 1.05rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

export const CtaText = styled.p`
    font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #28a745;
    margin-top: 20px;
    margin-bottom: 0;
    padding: 14px 28px;
    border: 2px solid #28a745;
    border-radius: 10px;
    display: inline-block;
    cursor: default;

    @media (max-width: 480px) {
        font-size: 1rem;
        padding: 12px 20px;
    }
`;