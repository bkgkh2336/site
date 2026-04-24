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

export const IconWrapper = styled.div`
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

export const HighlightedText = styled.p`
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

export const SectionTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #28a745;
    margin: 30px 0 25px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    
    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin: 25px 0 20px 0;
    }
    
    @media (max-width: 480px) {
        font-size: 1.2rem;
        margin: 20px 0 15px 0;
    }
`;

export const ParticipantsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    
    @media (max-width: 768px) {
        gap: 15px;
    }
`;

export const ParticipantItem = styled.div`
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

export const ParticipantIcon = styled.div`
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

export const ParticipantInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const ParticipantName = styled.h3`
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

export const ParticipantRole = styled.p`
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

export const AgendaSection = styled.div`
    margin: 30px 0;
    
    & > ${SectionTitle}:first-child {
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

export const AgendaItem = styled.div`
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

export const AgendaNumber = styled.div`
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

export const PhotoGallery = styled.div`
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

export const GalleryImage = styled.img`
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
