import { useNavigate } from 'react-router-dom';
import { 
    Home, 
    Phone, 
    Clock, 
    ShieldCheck, 
    Trash2,
    Wind,
    Zap,
    Sprout,
    Flame,
    Droplet,
    ArrowRight,
    Users,
    Award,
    HeadphonesIcon
} from 'lucide-react';
import {
    MainContainer,
    HeroSection,
    HeroContent,
    HeroText,
    HeroTitle,
    HeroSubtitle,
    HeroButtons,
    PrimaryButton,
    SecondaryButton,
    HeroImage,
    StatsSection,
    StatsContainer,
    StatCard,
    StatIcon,
    StatNumber,
    StatLabel,
    ServicesSection,
    SectionTitle,
    SectionSubtitle,
    ServicesGrid,
    ServiceCard,
    ServiceTitle,
    ServiceDescription,
    ServiceLink,
    WhySection,
    WhyGrid,
    WhyCard,
    WhyTitle,
    WhyDescription,
    CTASection,
    CTAContent,
    CTATitle,
    CTASubtitle,
    CTAPhone
} from './styled';

const Main = () => {
    const navigate = useNavigate();

    const stats = [
        { icon: <Users size={32} />, number: '70+', label: 'Лет опыта работы' },
        { icon: <Home size={32} />, number: '500+', label: 'Обслуживаемых домов' },
        { icon: <Award size={32} />, number: '24/7', label: 'Круглосуточная поддержка' },
        { icon: <ShieldCheck size={32} />, number: '100%', label: 'Гарантия качества' }
    ];

    const services = [
        {
            icon: <Wind size={32} />,
            title: 'Услуги вентиляционных и дымовых каналов',
            description: 'Профессиональная чистка и обслуживание вентиляционных систем',
            link: '/ventilation_services'
        },
        {
            icon: <Trash2 size={32} />,
            title: 'Услуги по вывозу мусора',
            description: 'Вывоз мусора на полигон собственным транспортом с последующим захоронением',
            link: '/waste_services'
        },
        {
            icon: <Zap size={32} />,
            title: 'Услуги по электрофизическим измерениям',
            description: 'Измерительная лаборатория энергетической службы для населения',
            link: '/electro_services'
        },
        {
            icon: <Sprout size={32} />,
            title: 'Услуги по скашиванию травы',
            description: 'Скашивание газонов ручным моторизированным инструментом',
            link: '/grass_services'
        },
        {
            icon: <Flame size={32} />,
            title: 'Услуги по отоплению населению',
            description: 'Надежное теплоснабжение и обслуживание отопительных систем',
            link: '/heating_services'
        },
        {
            icon: <Droplet size={32} />,
            title: 'Услуги по водопроводу и канализации населению',
            description: 'Качественные услуги по обеспечению водоснабжения и водоотведения',
            link: '/plumbing_services'
        }
    ];

    const whyUs = [
        {
            icon: <Clock size={32} />,
            title: 'Оперативность',
            description: 'Быстрое реагирование на заявки и устранение неисправностей'
        },
        {
            icon: <Award size={32} />,
            title: 'Профессионализм',
            description: 'Квалифицированные специалисты с большим опытом работы'
        },
        {
            icon: <HeadphonesIcon size={32} />,
            title: 'Поддержка',
            description: 'Круглосуточная диспетчерская служба и техническая поддержка'
        }
    ];

    return (
        <MainContainer>
            <HeroSection>
                <HeroContent>
                    <HeroText>
                        <HeroTitle>
                            КЖУП "Буда-Кошелёвский коммунальник"
                        </HeroTitle>
                        <HeroSubtitle>
                            Надежный партнер в сфере жилищно-коммунальных услуг. 
                            Обеспечиваем комфорт и безопасность вашего дома.
                        </HeroSubtitle>
                        <HeroButtons>
                            <PrimaryButton onClick={() => navigate('/services')}>
                                Наши услуги
                                <ArrowRight size={20} />
                            </PrimaryButton>
                            <SecondaryButton onClick={() => navigate('/contacts')}>
                                Контакты
                            </SecondaryButton>
                        </HeroButtons>
                    </HeroText>
                    <HeroImage>
                        <img 
                            src="/main.png" 
                            alt="main.pg"
                        />
                    </HeroImage>
                </HeroContent>
            </HeroSection>

            <StatsSection>
                <StatsContainer>
                    {stats.map((stat, index) => (
                        <StatCard key={index}>
                            <StatIcon>{stat.icon}</StatIcon>
                            <StatNumber>{stat.number}</StatNumber>
                            <StatLabel>{stat.label}</StatLabel>
                        </StatCard>
                    ))}
                </StatsContainer>
            </StatsSection>

            <ServicesSection>
                <SectionTitle>Наши услуги</SectionTitle>
                <SectionSubtitle>
                    Полный спектр жилищно-коммунальных услуг для вашего комфорта
                </SectionSubtitle>
                <ServicesGrid>
                    {services.map((service, index) => (
                        <ServiceCard key={index} onClick={() => navigate(service.link)}>
                            <StatIcon>{service.icon}</StatIcon>
                            <ServiceTitle>{service.title}</ServiceTitle>
                            <ServiceDescription>{service.description}</ServiceDescription>
                            <ServiceLink>
                                Подробнее <ArrowRight size={16} />
                            </ServiceLink>
                        </ServiceCard>
                    ))}
                </ServicesGrid>
            </ServicesSection>

            <WhySection>
                <SectionTitle>Почему выбирают нас</SectionTitle>
                <SectionSubtitle>
                    Мы гордимся качеством предоставляемых услуг и доверием наших клиентов
                </SectionSubtitle>
                <WhyGrid>
                    {whyUs.map((item, index) => (
                        <WhyCard key={index}>
                            <StatIcon>{item.icon}</StatIcon>
                            <WhyTitle>{item.title}</WhyTitle>
                            <WhyDescription>{item.description}</WhyDescription>
                        </WhyCard>
                    ))}
                </WhyGrid>
            </WhySection>

            <CTASection>
                <CTAContent>
                    <CTATitle>Аварийно-диспетчерская служба</CTATitle>
                    <CTASubtitle>
                        Круглосуточная поддержка при возникновении аварийных ситуаций
                    </CTASubtitle>
                    <CTAPhone href="tel:+375233674507">
                        <Phone size={28} />
                        115
                    </CTAPhone>
                </CTAContent>
            </CTASection>
        </MainContainer>
    );
};

export default Main;