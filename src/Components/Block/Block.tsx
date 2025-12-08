import { Block_ } from "./styled";


interface BlockProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    ref?: React.RefObject<HTMLDivElement | null>; 
}

const Block = (props: BlockProps) => {
    return (
        <Block_
            ref={props.ref}
            style={props.style}
        >
            {props.children}
        </Block_>
    )
}

export default Block