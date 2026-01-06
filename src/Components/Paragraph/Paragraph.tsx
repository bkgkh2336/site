import { ReactNode } from "react";
import { StyledParagraph } from "./styled";

interface ParagraphProps {
    children: ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
    return <StyledParagraph>{children}</StyledParagraph>;
};

export default Paragraph;