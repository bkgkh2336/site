import { H3_ } from "./styled"

interface H3Props {
    children?: React.ReactNode
    style?: React.CSSProperties
}

const H3 = (props: H3Props) => {
    return (
        <H3_
            style={props.style}
        >
            {props.children}
        </H3_>
    )
}

export default H3;
