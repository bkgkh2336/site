import { Block_ } from "./styled";


interface BlockProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const Block = (props: BlockProps) => {
    return (
        <Block_
            style={props.style}
        >
            {props.children}
        </Block_>
    )
}

export default Block