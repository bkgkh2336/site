import styled from 'styled-components';

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

export const InfoCardContent = styled.div`
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

export const DangerSection = styled.div`
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

export const DangerTitle = styled.h3`
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

export const DangerItem = styled.div`
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

export const RecommendationsSection = styled.div`
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

export const RecommendationsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const RecommendationItem = styled.div`
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

export const RecommendationIcon = styled.div`
    flex-shrink: 0;
    color: #28a745;
    margin-top: 2px;
    
    svg[data-lucide="x-circle"] {
        color: #dc3545;
    }
`;

export const RecommendationText = styled.span`
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

export const ArticleWarning = styled.div`
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

export const AuthorSection = styled.div`
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
