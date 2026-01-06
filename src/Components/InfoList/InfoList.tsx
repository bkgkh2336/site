import { ReactNode } from "react";
import { StyledList } from "./styled";

interface InfoListProps {
    children: ReactNode;
}

const InfoList = ({ children }: InfoListProps) => {
    return <StyledList>{children}</StyledList>;
};

export default InfoList;