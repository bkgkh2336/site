import Footer_ from "./styled"
import Text from "../Text/Text"
import Block from "../Block/Block"

const Footer = () => {
    return (
        <Footer_>
            <Text bold="bolder">® Буда-Кошелёвский коммунальник - {new Date().getFullYear()}</Text>
            <Block>
                <img style={{ width: '1rem', height: '1rem' }} src="mail.png" alt="email" />
                <Text>info@bkgkh.by</Text>
            </Block>
            <Block>
                <img style={{ width: '1rem', height: '1rem' }} src="gps.png" alt="location" />
                <Text>247350, Гомельская область, г.Буда-Кошелево, ул.Озерная 3а</Text>
            </Block>
        </Footer_>
    )
}

export default Footer
