import styled from "styled-components";

const Footer_ = styled.div`
    display: flex;
    padding: 0px 30px;
    min-height: 70px;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    
    /* Dynamic Island styling */
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 25px;
    border: 1px solid rgba(76, 175, 80, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
                0 2px 8px rgba(0, 0, 0, 0.05);
    
    /* Floating effect */
    margin: 20px auto;
    box-sizing: border-box;
    width: 90%;
    min-width: 300px;
    
    /* Smooth transitions */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Hover effect */
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
                    0 4px 12px rgba(0, 0, 0, 0.08);
        border-color: rgba(76, 175, 80, 0.3);
    }
    
    /* Tablet responsive */
    @media (max-width: 1024px) {
        padding: 16px 24px;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    /* Mobile responsive */
    @media (max-width: 768px) {
        flex-direction: column;
        min-width: unset;
        max-width: 95%;
        width: 95%;
        min-height: unset;
        padding: 20px 16px;
        gap: 16px;
        text-align: center;
        align-items: center;
    }
    
    @media (max-width: 480px) {
        padding: 16px 12px;
        gap: 12px;
        border-radius: 20px;
    }
`;

export const FooterCopyright = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    white-space: nowrap;
    
    @media (max-width: 768px) {
        justify-content: center;
        width: 100%;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(76, 175, 80, 0.2);
        white-space: normal;
    }
`;

export const FooterAddress = styled.div`
    display: flex;
    gap: 20px;
    font-style: normal;
    
    @media (max-width: 1024px) {
        gap: 16px;
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        width: 100%;
        align-items: stretch;
    }
`;

export const FooterContactBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    
    a {
        transition: color 0.3s ease;
        
        &:hover {
            color: #28a745;
        }
    }
    
    @media (max-width: 768px) {
        align-items: flex-start;
        gap: 10px;
        
        svg {
            flex-shrink: 0;
            margin-top: 2px;
        }
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

export default Footer_;