import { ReactNode } from "react";
import { StyledList } from "./styled";

interface InstructionListProps {
    children: ReactNode;
}

const InstructionList = ({ children }: InstructionListProps) => {
    return <StyledList>{children}</StyledList>;
};

export default InstructionList;