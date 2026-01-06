import { Button_ } from "./styled"

interface ButtonProps {
    children?: React.ReactNode
    style?: React.CSSProperties
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
    return (
        <Button_
            style={props.style}
            onClick={props.onClick}
        >
            {props.children}
        </Button_>
    )
}

export default Button;
