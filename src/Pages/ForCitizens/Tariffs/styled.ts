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

export const TariffsContainer = styled.div`
    width: 90%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (max-width: 768px) {
        width: 95%;
        margin: 20px auto;
        gap: 20px;
    }
`;

export const ContentSection = styled.section`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
    
    @media (max-width: 768px) {
        padding: 20px;
        border-radius: 12px;
    }
`;

export const DecisionBox = styled.div`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 16px;
    padding: 35px;
    color: white;
    box-shadow: 0 10px 40px rgba(40, 167, 69, 0.2);
    
    h2, p {
        color: white;
    }
    
    @media (max-width: 768px) {
        padding: 25px;
        border-radius: 12px;
    }
`;

export const TableTitle = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.95rem;
    color: #6c757d;
    text-align: center;
    margin-bottom: 15px;
    font-style: italic;
`;

export const NoticeBox = styled.div`
    background: rgba(220, 53, 69, 0.1);
    border-left: 4px solid #dc3545;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    
    p {
        margin: 0;
        color: #721c24;
    }
`;

export const DecisionTitle = styled.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 15px;
    color: white;
    line-height: 1.4;
    
    @media (max-width: 768px) {
        font-size: 1.2rem;
        letter-spacing: 0.3px;
    }
`;

export const DecisionDate = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.1rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 10px;
    font-weight: 500;
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export const DecisionSubject = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    text-align: center;
    color: white;
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 1.15rem;
    }
`;

export const LegalBasis = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.8;
    text-align: justify;
    color: #495057;
    margin-bottom: 0;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.7;
    }
`;

export const DecisionPoint = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    line-height: 1.8;
    text-align: justify;
    color: #495057;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.7;
    }
`;

export const SignatureBlock = styled.p`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.05rem;
    text-align: right;
    color: #495057;
    margin-top: 30px;
    
    strong {
        font-weight: 700;
        color: #28a745;
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;