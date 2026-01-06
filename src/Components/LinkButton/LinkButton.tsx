import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { StyledLink } from "./styled";

interface LinkButtonProps {
    href: string;
    children: ReactNode;
    showIcon?: boolean;
}

const LinkButton = ({ href, children, showIcon = true }: LinkButtonProps) => {
    return (
        <StyledLink href={href} target="_blank" rel="noopener noreferrer">
            {children}
            {showIcon && <ExternalLink style={{ width: '1.2rem', height: '1.2rem' }} />}
        </StyledLink>
    );
};

export default LinkButton;