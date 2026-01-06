import Block from "../../Components/Block/Block";
import Text from "../../Components/Text/Text";
import { Service115Container, ContentBlock, HighlightText, HeroSection, IconWrapper } from "./styled";
import { Phone, Clock } from "lucide-react";


const Service115 = () => {
    return (
        <Service115Container>
            <Block style={{ flexDirection: 'column', gap: 40, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                
                {/* Hero Section */}
                <HeroSection>
                    <IconWrapper>
                        <Phone style={{ width: '4rem', height: '4rem', color: 'white' }} />
                    </IconWrapper>
                    <Text bold="bolder" style={{ fontSize: '3rem', color: 'white', textAlign: 'center', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                        Служба 115
                    </Text>
                    <Text style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)', textAlign: 'center', maxWidth: '800px' }}>
                        Диспетчерская служба для приёма обращений и заявок граждан
                    </Text>
                    
                    <Block style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', margin: '30px 0 20px' }} />
                    
                    <Text style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
                        Заявки и претензии подаются по номеру
                    </Text>
                    
                    <HighlightText style={{ 
                        color: 'white', 
                        border: '4px solid white',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <Phone style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
                        115
                    </HighlightText>
                    
                    <Block style={{ flexDirection: 'column', gap: 20, marginTop: '30px', alignItems: 'center' }}>
                        <Block style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                            <Text style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                                Короткий телефонный номер
                            </Text>
                        </Block>
                        <Block style={{ width: '60px', height: '2px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                        <Block style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                            <Clock style={{ width: '1.8rem', height: '1.8rem', color: 'white' }} />
                            <Text bold="bolder" style={{ fontSize: '1.1rem', color: 'white' }}>
                                Круглосуточно
                            </Text>
                            <Text style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
                                Служба работает 24/7
                            </Text>
                        </Block>
                    </Block>
                </HeroSection>
                <ContentBlock>
                    <Text bold="bolder" style={{ fontSize: '1.5rem', color: '#28a745', marginBottom: '20px' }}>
                        О системе
                    </Text>
                    <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify', color: '#444' }}>
                        В соответствии с Постановлением Совета Министров Республики Беларусь от 18.09.2019 № 628 
                        создана и функционирует единая информационная система АС «Диспетчерская служба» для работы 
                        с обращениями и заявками граждан по вопросам жилищно-коммунального и городского хозяйства.
                    </Text>
                    <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify', color: '#444', marginTop: '15px' }}>
                        Единая производительная база данных позволяет собирать аналитическую информацию, необходимую 
                        для успешной деятельности, и обеспечивает удобную обратную связь при работе с исполнителями.
                    </Text>
                </ContentBlock>
            </Block>
        </Service115Container>
    );
};

export default Service115;