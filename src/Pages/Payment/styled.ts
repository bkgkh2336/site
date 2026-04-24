import styled from "styled-components";

export const PaymentContainer = styled.div`
    max-width: 90%;
    width: 100%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 768px) {
        max-width: 95%;
    }
`;

export const PaymentSection = styled.section`
    width: 100%;
    max-width: 1200px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SectionTitle = styled.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #212529;
    margin: 0;
    text-align: center;
`;

export const VideoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

export const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 45%;
    height: 0;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(40, 167, 69, 0.15);
    background: rgba(255, 255, 255, 0.95);
    
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 16px;
    }
`;
