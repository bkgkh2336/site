import H1 from "../../../Components/H1/H1";
import Text from "../../../Components/Text/Text";
import { 
    AssistanceContainer, 
    HighlightBox,
    ContactInfo
} from "./styled";
import { Phone } from "lucide-react";


const AssistanceDisabilities = () => {
    return (
        <AssistanceContainer>
            <H1>Помощь инвалидам</H1>
            
            <HighlightBox>
                <Text style={{ fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center', color: 'white' }}>
                    Коммунальное жилищное унитарное предприятие "Буда-Кошелевский коммунальник" предоставляет 
                    различную помощь инвалидам.
                </Text>
            </HighlightBox>

            <ContactInfo>
                <Phone style={{ width: '3rem', height: '3rem', color: '#28a745' }} />
                <Text style={{ fontSize: '1.2rem', marginBottom: '10px', display: 'block', textAlign: 'center' }}>
                    Для получения консультации и помощи необходимо обратиться по номеру телефона:
                </Text>
                <a 
                    href="tel:+375233674507" 
                    style={{ 
                        fontSize: '2rem', 
                        fontWeight: 'bold', 
                        color: '#28a745', 
                        textDecoration: 'none',
                        display: 'block',
                        textAlign: 'center'
                    }}
                >
                    8(02336) 7-45-07
                </a>
            </ContactInfo>
        </AssistanceContainer>
    );
};

export default AssistanceDisabilities;