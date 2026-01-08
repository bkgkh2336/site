import { Block_ } from "./styled";


interface BlockProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    ref?: React.RefObject<HTMLDivElement | null>; 
}

const Block = (props: BlockProps) => {
    return (
        <Block_
            className={props.className}
            ref={props.ref}
            style={props.style}
        >
            {props.children}
        </Block_>
    )
}

export default Block