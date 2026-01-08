import { useNavigate } from 'react-router-dom';
import { Home, Phone, Search, ArrowLeft } from 'lucide-react';
import {
    NotFoundContainer,
    NotFoundContent,
    ErrorCode,
    ErrorTitle,
    ErrorDescription,
    ButtonsContainer,
    PrimaryButton,
    SecondaryButton,
    IconWrapper,
    BackgroundDecoration
} from './styled';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <BackgroundDecoration />
            <NotFoundContent>
                <IconWrapper>
                    <Search style={{ width: 80, height: 80 }} />
                </IconWrapper>
                <ErrorCode>404</ErrorCode>
                <ErrorTitle>Страница не найдена</ErrorTitle>
                <ErrorDescription>
                    К сожалению, запрашиваемая страница не существует или была перемещена.
                    Пожалуйста, вернитесь на главную страницу или свяжитесь с нами.
                </ErrorDescription>
                <ButtonsContainer>
                    <PrimaryButton onClick={() => navigate('/')}>
                        <Home style={{ width: 20, height: 20 }} />
                        На главную
                    </PrimaryButton>
                    <SecondaryButton onClick={() => navigate(-1)}>
                        <ArrowLeft style={{ width: 20, height: 20 }} />
                        Назад
                    </SecondaryButton>
                    <SecondaryButton onClick={() => navigate('/contacts')}>
                        <Phone style={{ width: 20, height: 20 }} />
                        Контакты
                    </SecondaryButton>
                </ButtonsContainer>
            </NotFoundContent>
        </NotFoundContainer>
    );
};

export default NotFound;