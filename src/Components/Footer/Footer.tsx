import { Copyright, Mail, MapPin } from "lucide-react"
import Footer_, { FooterCopyright, FooterAddress, FooterContactBlock } from "./styled"
import Text from "../Text/Text"

const Footer = () => {
    return (
        <Footer_ as="footer" role="contentinfo">
            <FooterCopyright>
                <Copyright style={{ width: '1rem', height: '1rem', color: '#28a745' }} aria-hidden="true" /> 
                <Text bold="bolder">КЖУП "Буда-Кошелёвский коммунальник" - {new Date().getFullYear()}</Text>
            </FooterCopyright>
            <FooterAddress as="address">
                <FooterContactBlock>
                    <Mail style={{ width: '1rem', height: '1rem', color: '#28a745' }} aria-hidden="true" />
                    <a href="mailto:info@bkgkh.by" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Text>info@bkgkh.by</Text>
                    </a>
                </FooterContactBlock>
                <FooterContactBlock>
                    <MapPin style={{ width: '1rem', height: '1rem', color: '#28a745' }} aria-hidden="true" />
                    <Text>247350, Гомельская область, г.Буда-Кошелево, ул.Озерная 3а</Text>
                </FooterContactBlock>
            </FooterAddress>
        </Footer_>
    )
}

export default Footer