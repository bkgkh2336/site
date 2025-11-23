import { Text_ } from './styled'

interface TextProps {
    children?: React.ReactNode
    style?: React.CSSProperties
    bold?: 'bold' | 'normal' | 'bolder'
}

const Text = (props: TextProps) => {
    return (
        <Text_
            style={{...props.style, fontWeight: props.bold == 'bolder' ? 500 : props.bold || 'normal'}}
        >
            {props.children}
        </Text_>
    )
}

export default Text;