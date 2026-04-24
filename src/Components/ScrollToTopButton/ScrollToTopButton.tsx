import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { ScrollButton } from './styled';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Показываем кнопку когда пользователь проскроллил вниз
    useEffect(() => {
        const toggleVisibility = () => {
            const scrollContainer = document.querySelector('[style*="overflow: auto"]') as HTMLElement;
            const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
            
            if (scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const scrollContainer = document.querySelector('[style*="overflow: auto"]') as HTMLElement;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', toggleVisibility);
        }
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', toggleVisibility);
            }
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        const scrollContainer = document.querySelector('[style*="overflow: auto"]') as HTMLElement;
        if (scrollContainer) {
            scrollContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <ScrollButton
            onClick={scrollToTop}
            $isVisible={isVisible}
            aria-label="Прокрутить наверх"
            title="Наверх"
        >
            <ArrowUp size={24} />
        </ScrollButton>
    );
};

export default ScrollToTopButton;