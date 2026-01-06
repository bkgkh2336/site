import { ExternalLink_ } from "./styled";

interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
    style?: React.CSSProperties;
}

const ExternalLink = ({ href, children, target = "_blank", rel = "noopener noreferrer", style }: ExternalLinkProps) => {
    return (
        <ExternalLink_ 
            href={href} 
            target={target} 
            rel={rel}
            style={style}
        >
            {children}
        </ExternalLink_>
    );
};

export default ExternalLink;