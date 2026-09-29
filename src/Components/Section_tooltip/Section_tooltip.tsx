import { Section_tooltip_ } from "./styled";

interface Section_tooltipProps {
    children?: React.ReactNode
    style?: React.CSSProperties
    $visible?: boolean
}

const Section_tooltip = (props: Section_tooltipProps) => {
    return (
        <Section_tooltip_ $visible={props.$visible} style={props.style}>
            {props.children}
        </Section_tooltip_>
    )
}

export default Section_tooltip
