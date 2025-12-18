import { H2_ } from "./styled";

interface H2Props {
    children?: React.ReactNode
    style?: React.CSSProperties
}

const H2 = (props: H2Props) => {
    return (
        <H2_
            style={props.style}
        >
            {props.children}
        </H2_>
    )
}

export default H2;
