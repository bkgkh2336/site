import { H1_ } from "./styled"

interface H1Props {
    children?: React.ReactNode
    style?: React.CSSProperties
}

const H1 = (props: H1Props) => {
    return (
        <H1_
            style={props.style}
        >
            {props.children}
        </H1_>
    )
}

export default H1;