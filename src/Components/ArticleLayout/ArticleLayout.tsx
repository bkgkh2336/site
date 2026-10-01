import { ReactNode } from "react";
import { Container } from "./styled";

interface ArticleLayoutProps {
    children: ReactNode;
}

const ArticleLayout = ({ children }: ArticleLayoutProps) => (
    <Container>
        {children}
    </Container>
);

export default ArticleLayout;
