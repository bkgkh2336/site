import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const float = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`;

export const MainContainer = styled.div`
    width: 100%;
    animation: ${fadeIn} 0.6s ease-out;
`;

export const HeroSection = styled.section`
    position: relative;
    min-height: 600px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    display: flex;
    align-items: center;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/main_2.png') center/cover;
        opacity: 0.15;
        mix-blend-mode: overlay;
    }
    
    @media (max-width: 768px) {
        min-height: 500px;
        padding: 40px 20px;
    }
`;

export const HeroContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 40px;
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    
    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 60px 30px;
    }
    
    @media (max-width: 768px) {
        padding: 40px 20px;
    }
`;

export const HeroText = styled.div`
    color: white;
`;

export const HeroTitle = styled.h1`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
        font-size: 2.2rem;
    }
`;

export const HeroSubtitle = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 35px;
    color: rgba(255, 255, 255, 0.95);
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

export const HeroButtons = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    padding: 16px 32px;
    font-size: 1.1rem;
    font-weight: 600;
    background: white;
    color: #28a745;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        background: #f8f9fa;
    }
    
    @media (max-width: 768px) {
        padding: 14px 28px;
        font-size: 1rem;
    }
`;

export const SecondaryButton = styled(PrimaryButton)`
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }
`;

export const HeroImage = styled.div`
    position: relative;
    
    img {
        width: 100%;
        height: auto;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: ${float} 6s ease-in-out infinite;
    }
    
    @media (max-width: 968px) {
        display: none;
    }
`;

export const StatsSection = styled.section`
    background: white;
    padding: 80px 40px;
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`;

export const StatsContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    
    @media (max-width: 768px) {
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
`;

export const StatCard = styled.div`
    text-align: center;
    padding: 30px;
    flex: 0 1 250px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(32, 201, 151, 0.05) 100%);
    border-radius: 16px;
    border: 1px solid rgba(40, 167, 69, 0.1);
    transition: all 0.3s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(40, 167, 69, 0.1);
    }
    
    @media (max-width: 768px) {
        flex: 0 1 200px;
    }
    
    @media (max-width: 480px) {
        padding: 20px;
        flex: 1 1 100%;
        max-width: 100%;
    }
`;

export const StatIcon = styled.div`
    width: 70px;
    height: 70px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;

export const StatNumber = styled.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #28a745;
    margin-bottom: 10px;
`;

export const StatLabel = styled.div`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    color: #6c757d;
`;

export const ServicesSection = styled.section`
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
    padding: 10px 40px;
    
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`;

export const SectionTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    color: #28a745;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const SectionSubtitle = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    color: #6c757d;
    margin-bottom: 60px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 40px;
        padding: 0 10px;
    }
`;

export const ServicesGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    justify-content: center;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const ServiceCard = styled.div`
    background: white;
    padding: 35px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(40, 167, 69, 0.15);
        
        ${StatIcon} {
            transform: scale(1.1);
        }
    }
    
    @media (max-width: 768px) {
        padding: 25px;
    }
    
    @media (max-width: 480px) {
        padding: 20px;
    }
`;

export const ServiceTitle = styled.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #28a745;
    margin-bottom: 15px;
`;

export const ServiceDescription = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #6c757d;
    margin-bottom: 20px;
`;

export const ServiceLink = styled.span`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #28a745;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: gap 0.3s ease;
    
    ${ServiceCard}:hover & {
        gap: 12px;
    }
`;

export const WhySection = styled.section`
        background: white;
        padding: 0px 40px;
    
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`;

export const WhyGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    
    @media (max-width: 768px) {
        gap: 30px;
    }
    
    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        gap: 25px;
    }
`;

export const WhyCard = styled.div`
    text-align: center;
    padding: 30px;
    flex: 0 1 250px;
    
    ${StatIcon} {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    }
    
    @media (max-width: 768px) {
        flex: 0 1 200px;
    }
    
    @media (max-width: 480px) {
        flex: 1 1 100%;
        max-width: 100%;
    }
`;

export const WhyTitle = styled.h3`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #28a745;
    margin-bottom: 15px;
`;

export const WhyDescription = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #6c757d;
`;

export const CTASection = styled.section`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    padding: 80px 40px;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -10%;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        border-radius: 50%;
    }
    
    @media (max-width: 768px) {
        padding: 60px 20px;
    }
`;

export const CTAContent = styled.div`
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
`;

export const CTATitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const CTASubtitle = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 35px;
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

export const CTAPhone = styled.a`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 15px;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    padding: 20px 40px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    border: 2px solid white;
    transition: all 0.3s ease;
    
    &:hover {
        background: white;
        color: #28a745;
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        padding: 16px 32px;
    }
`;