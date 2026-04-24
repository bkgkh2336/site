import styled from 'styled-components';

export const NewsContainer = styled.div`
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

export const NewsSection = styled.section`
    width: 100%;
    margin-bottom: 60px;
    
    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;

export const SectionTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #28a745;
    margin: 0 0 30px 0;
    text-align: center;
    position: relative;
    padding-bottom: 15px;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        border-radius: 2px;
    }
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }
    
    @media (max-width: 480px) {
        font-size: 1.3rem;
    }
`;

export const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const NewsCard = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 2px solid transparent;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(40, 167, 69, 0.15);
        border-color: #28a745;
        
        &::before {
            transform: scaleX(1);
        }
    }

    &:active {
        transform: translateY(-4px);
    }
`;

export const NewsImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    ${NewsCard}:hover & {
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        height: 180px;
    }
    
    @media (max-width: 480px) {
        height: 160px;
    }
`;

export const NewsContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 12px;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
    
    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const NewsTitle = styled.h3`
    font-family: 'Archivo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    color: #28a745;
    line-height: 1.4;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 1.15rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
`;

export const NewsDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    color: #6c757d;
    padding: 8px 12px;
    background: rgba(40, 167, 69, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(40, 167, 69, 0.15);
    align-self: center;
    
    svg {
        flex-shrink: 0;
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.85rem;
        padding: 6px 10px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 5px 8px;
        gap: 4px;
        
        svg {
            width: 14px;
            height: 14px;
        }
    }
`;

export const NewsSource = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.85rem;
    color: #6c757d;
    font-style: italic;
    margin-top: 4px;
    
    svg {
        flex-shrink: 0;
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.75rem;
        gap: 4px;
        
        svg {
            width: 12px;
            height: 12px;
        }
    }
`;

export const MoreNewsSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    
    @media (max-width: 768px) {
        padding: 30px 20px;
        gap: 15px;
    }
    
    @media (max-width: 480px) {
        padding: 25px 15px;
        margin-top: 10px;
    }
`;

export const MoreNewsText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    color: #333;
    margin: 0;
    text-align: center;
    font-weight: 500;
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

export const MoreNewsButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #28a745;
    text-decoration: none;
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
    
    svg {
        transition: transform 0.3s ease;
        flex-shrink: 0;
    }
    
    &:hover {
        color: #218838;
        border-bottom-color: #218838;
        
        svg {
            transform: translateX(4px);
        }
    }
    
    &:active {
        color: #1e7e34;
    }
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1rem;
        gap: 4px;
        
        svg {
            width: 16px;
            height: 16px;
        }
    }
`;
