import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingBar } from './styled';

const LoadingIndicator = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Показываем индикатор при смене страницы
        setLoading(true);

        // Скрываем через небольшую задержку (имитация загрузки)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return <LoadingBar $isLoading={loading} />;
};

export default LoadingIndicator;