import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Прокручиваем главный контейнер вверх
        const scrollContainer = document.querySelector('[style*="overflow: auto"]') as HTMLElement;
        if (scrollContainer) {
            scrollContainer.scrollTo(0, 0);
        }
        // На всякий случай также прокручиваем window
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
};

export default ScrollToTop;