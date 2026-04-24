import styled from 'styled-components';

export const LightboxOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const LightboxContainer = styled.div`
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: zoomIn 0.3s ease;

    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

export const LightboxImage = styled.img`
    max-width: 95vw;
    max-height: 95vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
`;

export const CloseButton = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    z-index: 10001;

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        transform: rotate(90deg);
    }

    &:active {
        transform: rotate(90deg) scale(0.95);
    }

    @media (max-width: 768px) {
        top: 15px;
        right: 15px;
        width: 45px;
        height: 45px;

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

interface NavButtonProps {
    position: 'left' | 'right';
}

export const NavButton = styled.button<NavButtonProps>`
    position: fixed;
    ${props => props.position}: 30px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    z-index: 10001;

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-50%) scale(1.1);
    }

    &:active {
        transform: translateY(-50%) scale(1);
    }

    @media (max-width: 768px) {
        ${props => props.position}: 15px;
        width: 50px;
        height: 50px;

        svg {
            width: 24px;
            height: 24px;
        }
    }

    @media (max-width: 480px) {
        ${props => props.position}: 10px;
        width: 45px;
        height: 45px;

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

export const ImageCounter = styled.div`
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    padding: 10px 25px;
    color: white;
    font-family: 'Archivo', 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        bottom: 20px;
        padding: 8px 20px;
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        bottom: 15px;
        padding: 6px 16px;
        font-size: 0.9rem;
    }
`;
