import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    LightboxOverlay,
    LightboxContainer,
    LightboxImage,
    CloseButton,
    NavButton,
    ImageCounter
} from './styled';

interface ImageLightboxProps {
    images: Array<{ src: string; alt: string }>;
    currentIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                onNavigate((currentIndex - 1 + images.length) % images.length);
            } else if (e.key === 'ArrowRight') {
                onNavigate((currentIndex + 1) % images.length);
            }
        };

        // Блокировка прокрутки страницы
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex, images.length, onClose, onNavigate]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePrev = () => {
        onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        onNavigate((currentIndex + 1) % images.length);
    };

    return (
        <LightboxOverlay onClick={handleOverlayClick}>
            <LightboxContainer>
                <CloseButton onClick={onClose} aria-label="Закрыть">
                    <X size={24} />
                </CloseButton>

                {images.length > 1 && (
                    <>
                        <NavButton 
                            position="left" 
                            onClick={handlePrev}
                            aria-label="Предыдущее фото"
                        >
                            <ChevronLeft size={32} />
                        </NavButton>

                        <NavButton 
                            position="right" 
                            onClick={handleNext}
                            aria-label="Следующее фото"
                        >
                            <ChevronRight size={32} />
                        </NavButton>
                    </>
                )}

                <LightboxImage
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                />

                {images.length > 1 && (
                    <ImageCounter>
                        {currentIndex + 1} / {images.length}
                    </ImageCounter>
                )}
            </LightboxContainer>
        </LightboxOverlay>
    );
};

export default ImageLightbox;
