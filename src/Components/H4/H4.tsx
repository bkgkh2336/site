import { H4_ } from "./styled"

interface H4Props {
    children?: React.ReactNode
    style?: React.CSSProperties
}

const H4 = (props: H4Props) => {
    return (
        <H4_
            style={props.style}
        >
            {props.children}
        </H4_>
    )
}

export default H4;
