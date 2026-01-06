import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Text from "../../../Components/Text/Text";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
import { 
    CybersecurityContainer,
    HighlightBox,
    VideoContainer,
    InfoBox
} from "./styled";
import { Shield, AlertTriangle } from "lucide-react";


const Cybersecurity = () => {
    return (
        <CybersecurityContainer>
            <H1>Кибербезопасность</H1>
            
            <HighlightBox>
                <Shield style={{ width: '3rem', height: '3rem', color: 'white', margin: '0 auto 20px' }} />
                <Text style={{ fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center', color: 'white' }}>
                    Одной из важнейших составляющих повседневной жизни стала забота о своей безопасности от мошенников 
                    и злоумышленников, которые хотят добраться до ваших личных данных и банковского счета. Чтобы быть 
                    готовым различить мошенника и не попасться на их крючок, вам предоставлен соответствующий материал.
                </Text>
            </HighlightBox>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '25px', color: '#28a745', textAlign: 'center' }}>
                    Материалы по кибербезопасности
                </H2>
                
                <VideoContainer>
                    <iframe 
                        src="/documents/Кибербезопасность.pdf"
                        width="100%"
                        height="800"
                        title="Документ по кибербезопасности"
                        style={{ border: 'none', borderRadius: '12px' }}
                    />
                </VideoContainer>
            </section>

            <InfoBox>
                <AlertTriangle style={{ width: '2rem', height: '2rem', color: '#dc3545', marginBottom: '15px' }} />
                <H2 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#dc3545', textAlign: 'center' }}>
                    Важная информация
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.8', textAlign: 'center' }}>
                    Будьте внимательны и осторожны при общении с незнакомыми людьми по телефону и в интернете. 
                    Никогда не сообщайте свои личные данные, пароли и коды из СМС третьим лицам.
                </Text>
            </InfoBox>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: '#28a745' }}>
                    Дополнительные памятки
                </H2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <ExternalLink 
                        href="/news/useful_to_know/phone_scammers"
                        target="_self"
                        style={{ fontSize: '1.1rem', display: 'block' }}
                    >
                        📞 Телефонные мошенники
                    </ExternalLink>
                    <ExternalLink 
                        href="/news/useful_to_know/safe_internet_cards"
                        target="_self"
                        style={{ fontSize: '1.1rem', display: 'block' }}
                    >
                        💳 Безопасность в сети и банковские карты
                    </ExternalLink>
                </div>
            </section>
        </CybersecurityContainer>
    );
};

export default Cybersecurity;