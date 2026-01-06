import { ReactNode } from "react";
import { Section, Title } from "./styled";

interface ContentSectionProps {
    title?: string;
    children: ReactNode;
}

const ContentSection = ({ title, children }: ContentSectionProps) => {
    return (
        <Section style={{padding: 0, border: 'none', boxShadow: 'none'}}>
            {title && <Title>{title}</Title>}
            {children}
        </Section>
    );
};

export default ContentSection;