import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container, BackButton } from "./styled";

interface ArticleLayoutProps {
    children: ReactNode;
    backUrl?: string;
    backText?: string;
}

const ArticleLayout = ({ 
    children, 
    backUrl = '/news/useful_to_know',
    backText = 'Вернуться к списку'
}: ArticleLayoutProps) => {
    const navigate = useNavigate();

    return (
        <Container>
            <BackButton onClick={() => navigate(backUrl)}>
                <ArrowLeft style={{ width: '1.2rem', height: '1.2rem' }} />
                {backText}
            </BackButton>
            {children}
        </Container>
    );
};

export default ArticleLayout;