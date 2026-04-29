import styled, { keyframes } from "styled-components";

const float = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const optimizedFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const MainContainer = styled.div`
    width: 100%;
    animation: ${optimizedFadeIn} 0.6s ease-out;
    will-change: auto;
`;

export const QuickLinksSection = styled.section`
    background: white;
    padding: 30px 40px 20px;
    border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    
    @media (max-width: 768px) {
        padding: 20px 20px 15px;
    }
`;

export const QuickLinksContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

export const QuickLinksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 15px;
    }
`;

export const QuickLinkCard = styled.div`
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(32, 201, 151, 0.05) 100%);
    border: 1px solid rgba(40, 167, 69, 0.15);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
        border-color: rgba(40, 167, 69, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
    }
    
    @media (max-width: 768px) {
        padding: 15px;
    }
`;

export const QuickLinkIcon = styled.div`
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 45px;
        height: 45px;
    }
`;

export const QuickLinkTitle = styled.div`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #28a745;
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export const ContactsInfoSection = styled.section`
    background: #f8f9fa;
    padding: 30px 40px;
    border-bottom: 1px solid rgba(40, 167, 69, 0.1);
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const ContactsInfoContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    
    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const ContactInfoCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #28a745;
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 16px rgba(40, 167, 69, 0.15);
        transform: translateX(5px);
    }
    
    @media (max-width: 768px) {
        padding: 15px;
    }
`;

export const ContactInfoTitle = styled.div`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #28a745;
    margin-bottom: 12px;
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

export const ContactInfoPhone = styled.a`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    transition: color 0.3s ease;
    
    &:hover {
        color: #28a745;
    }
    
    svg {
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export const ContactInfoSchedule = styled.div`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 0.95rem;
    color: #6c757d;
    display: flex;
    align-items: center;
    gap: 6px;
    
    svg {
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

export const YearBannerSection = styled.section`
    background: white;
    padding: 30px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const YearBannerContainer = styled.div`
    width: 90%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
        border-radius: 12px;
    }
`;

export const YearBannerContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.65) 0%,
        rgba(0, 0, 0, 0.55) 50%,
        rgba(0, 0, 0, 0.65) 100%
    );
    backdrop-filter: blur(2px);
    z-index: 2;
    
    @media (max-width: 968px) {
        padding: 30px 20px;
    }
    
    @media (max-width: 768px) {
        padding: 20px 12px;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.65) 50%,
            rgba(0, 0, 0, 0.75) 100%
        );
    }
    
    @media (max-width: 480px) {
        padding: 15px 10px;
        background: rgba(0, 0, 0, 0.75);
    }
`;

export const YearBannerTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    line-height: 1.2;
    
    @media (max-width: 968px) {
        font-size: 2rem;
        margin-bottom: 15px;
    }
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 12px;
    }
    
    @media (max-width: 480px) {
        font-size: 1.3rem;
        margin-bottom: 10px;
    }
`;

export const YearBannerText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 12px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    max-width: 900px;
    
    @media (max-width: 968px) {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 10px;
    }
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
        line-height: 1.4;
        margin-bottom: 6px;
    }
`;

export const YearBannerLink = styled.a`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 15px;
    padding: 12px 28px;
    background: rgba(40, 167, 69, 0.9);
    border-radius: 50px;
    transition: all 0.3s ease;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    
    &:hover {
        background: rgba(32, 201, 151, 0.95);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
    
    @media (max-width: 768px) {
        font-size: 0.95rem;
        padding: 10px 20px;
        margin-top: 10px;
    }
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
        padding: 8px 16px;
        margin-top: 8px;
    }
`;

export const YearBannerImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
        min-height: 500px;
        object-fit: cover;
    }
    
    @media (max-width: 480px) {
        min-height: 450px;
    }
`;

export const InfoBannerSection = styled.section`
    background: #e3f2fd;
    padding: 30px 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const InfoBannerContainer = styled.div`
    width: 90%;
    max-width: 1200px;
    background: #ffffff;
    border-radius: 16px;
    padding: 32px 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border-left: 6px solid #1976d2;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 28px rgba(21, 101, 192, 0.18);
    }

    @media (max-width: 768px) {
        padding: 20px 18px;
        border-radius: 12px;
        border-left-width: 4px;
    }
`;

export const InfoBannerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
`;

export const InfoBannerTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #1565c0;
    margin: 0 0 12px 0;
    line-height: 1.3;

    @media (max-width: 768px) {
        font-size: 1.3rem;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        font-size: 1.15rem;
    }
`;

export const InfoBannerSubtitle = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #0d47a1;
    margin: 0 0 14px 0;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 10px;
    }
`;

export const InfoBannerText = styled.p`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1.05rem;
    line-height: 1.6;
    color: #1a1a1a;
    margin: 0 0 14px 0;

    @media (max-width: 768px) {
        font-size: 0.95rem;
        line-height: 1.5;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

export const InfoBannerLink = styled.span`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1976d2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;

    @media (max-width: 768px) {
        font-size: 0.95rem;
    }
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
        width: 150%;    
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    
    @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }
    
    @media (max-width: 768px) {
        gap: 20px;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const StatCard = styled.div`
    text-align: center;
    padding: 30px;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(32, 201, 151, 0.05) 100%);
    border-radius: 16px;
    border: 1px solid rgba(40, 167, 69, 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(40, 167, 69, 0.1);
    }
    
    @media (max-width: 768px) {
        padding: 25px;
        min-height: 200px;
    }
    
    @media (max-width: 480px) {
        padding: 20px;
        min-height: 180px;
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    will-change: transform;
    
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

export const UsefulSection = styled.section`
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 60px 40px;
    
    @media (max-width: 768px) {
        padding: 40px 20px;
    }
`;

export const UsefulContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

export const UsefulHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
`;

export const UsefulTitle = styled.h2`
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #212529;
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 1.6rem;
    }
`;

export const UsefulLink = styled.button`
    font-family: 'Lato', 'Segoe UI', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #28a745;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    transition: all 0.3s ease;
    
    &:hover {
        color: #1e7e34;
        gap: 12px;
    }
`;

export const UsefulGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const UsefulCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 48px rgba(40, 167, 69, 0.2);
        border-color: #28a745;
    }
`;

export const UsefulCardImage = styled.img`
    width: 100%;
    height: 180px;
    object-fit: contain;
    
    @media (max-width: 768px) {
        height: 200px;
    }
`;

export const UsefulCardTitle = styled.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #212529;
    padding: 16px;
    margin: 0;
    line-height: 1.4;
`;
