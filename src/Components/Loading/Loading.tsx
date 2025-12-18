import Block from "../Block/Block"
import { Loading_ } from "./styled"

const Loading = () => {
    return (
        <Block style={{gap: 0, margin: 'auto'}}>
            <Loading_ />
            <Loading_ />
            <Loading_ />
            <Loading_ />
        </Block>
    )
}

export default Loading