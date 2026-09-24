import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import type { ReactNode } from 'react';
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
    HeadphonesIcon,
    FileText,
    Calendar,
    CreditCard
} from 'lucide-react';
import { usefulToKnowArticles } from '../../data/usefulToKnowArticles';
import { Reveal } from '../../Components/Reveal/Reveal';
import { CountUp } from '../../Components/CountUp/CountUp';
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
    QuickLinksSection,
    QuickLinksContainer,
    QuickLinksGrid,
    QuickLinkCard,
    QuickLinkIcon,
    QuickLinkTitle,
    ContactsInfoSection,
    ContactsInfoContainer,
    ContactInfoCard,
    ContactInfoTitle,
    ContactInfoPhone,
    ContactInfoSchedule,
    YearBannerSection,
    YearBannerContainer,
    YearBannerImage,
    YearBannerContent,
    YearBannerTitle,
    YearBannerText,
    YearBannerLink,
    LoveBannerSection,
    LoveBannerContainer,
    LoveBannerImage,
    LoveBannerSticker,
    LoveBannerHeart,
    LoveBannerTitle,
    LoveBannerSubtext,
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
    CTAPhone,
    UsefulSection,
    UsefulContainer,
    UsefulHeader,
    UsefulTitle,
    UsefulLink,
    UsefulGrid,
    UsefulCard,
    UsefulCardImage,
    UsefulCardTitle
} from './styled';

const Main = () => {
    const navigate = useNavigate();

    interface StatItem {
        icon: ReactNode;
        countTo?: number;
        suffix?: string;
        text?: string;
        label: string;
    }

    const stats = useMemo<StatItem[]>(() => [
        { icon: <Users size={32} />, countTo: 70, suffix: '+', label: 'Лет опыта работы' },
        { icon: <Home size={32} />, countTo: 500, suffix: '+', label: 'Обслуживаемых домов' },
        { icon: <Award size={32} />, text: '24/7', label: 'Круглосуточная поддержка' },
        { icon: <ShieldCheck size={32} />, countTo: 100, suffix: '%', label: 'Гарантия качества' }
    ], []);

    const services = useMemo(() => [
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
    ], []);

    const whyUs = useMemo(() => [
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
    ], []);

    const quickLinks = useMemo(() => [
        {
            icon: <FileText size={28} />,
            title: 'База документов',
            url: '/documents'
        },
        {
            icon: <Calendar size={28} />,
            title: 'График приёма',
            url: '/schedule_forms'
        },
        {
            icon: <CreditCard size={28} />,
            title: 'Оплата по ЕРИП',
            url: '/payment'
        }
    ], []);

    const contactsInfo = useMemo(() => [
        {
            title: 'Приёмная',
            phone: '+375 2336 7-45-07',
            phoneLink: 'tel:+375233674507',
            schedule: 'пн-пт с 9:00 до 17:00'
        },
        {
            title: 'Диспетчерская',
            phone: '115',
            phoneLink: 'tel:115',
            schedule: 'круглосуточно'
        },
        {
            title: 'Абонентский отдел',
            phone: '+375 2336 2-51-38',
            phoneLink: 'tel:+375233625138',
            schedule: 'пн-пт с 9:00 до 17:00'
        }
    ], []);

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
                            alt="КЖУП Буда-Кошелёвский коммунальник"
                            loading="lazy"
                        />
                    </HeroImage>
                </HeroContent>
            </HeroSection>

            <QuickLinksSection>
                <QuickLinksContainer>
                    <QuickLinksGrid>
                        {quickLinks.map((link, index) => (
                            <Reveal key={index} fill delay={index * 80}>
                                <QuickLinkCard onClick={() => navigate(link.url)}>
                                    <QuickLinkIcon>{link.icon}</QuickLinkIcon>
                                    <QuickLinkTitle>{link.title}</QuickLinkTitle>
                                </QuickLinkCard>
                            </Reveal>
                        ))}
                    </QuickLinksGrid>
                </QuickLinksContainer>
            </QuickLinksSection>

            <ContactsInfoSection>
                <ContactsInfoContainer>
                    {contactsInfo.map((contact, index) => (
                        <Reveal key={index} fill delay={index * 100}>
                            <ContactInfoCard>
                                <ContactInfoTitle>{contact.title}</ContactInfoTitle>
                                <ContactInfoPhone href={contact.phoneLink}>
                                    <Phone size={18} />
                                    {contact.phone}
                                </ContactInfoPhone>
                                <ContactInfoSchedule>
                                    <Clock size={16} />
                                    {contact.schedule}
                                </ContactInfoSchedule>
                            </ContactInfoCard>
                        </Reveal>
                    ))}
                </ContactsInfoContainer>
            </ContactsInfoSection>

            <YearBannerSection>
                <Reveal style={{ width: '100%' }}>
                    <YearBannerContainer>
                        <YearBannerImage
                            src="/2026_.jpg"
                            alt="2026 - Год белорусской женщины"
                            loading="lazy"
                            width="1200"
                            height="400"

                        />
                        <YearBannerContent>
                            <YearBannerTitle>2026 — Год белорусской женщины</YearBannerTitle>
                            <YearBannerText>
                                Президент Беларуси Александр Лукашенко подписал Указ № 1, которым 2026 год объявлен Годом белорусской женщины.
                            </YearBannerText>
                            <YearBannerText>
                                Документ принят в целях формирования национального образа женщины-труженицы, популяризации роли женщин в сохранении и развитии общества.
                            </YearBannerText>
                            <YearBannerLink
                                href="https://buda-koshelevo.gov.by/ru/2026-ru"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Подробнее <ArrowRight size={16} />
                            </YearBannerLink>
                        </YearBannerContent>
                    </YearBannerContainer>
                </Reveal>
            </YearBannerSection>

            <LoveBannerSection>
                <Reveal style={{ width: '100%' }}>
                    <LoveBannerContainer>
                        <LoveBannerImage
                            src="/Love.png"
                            alt="Я здесь живу и мне есть чем гордиться"
                            loading="lazy"
                            width="1200"
                            height="400"
                        />
                        <LoveBannerSticker>
                            <LoveBannerHeart>❤️</LoveBannerHeart>
                            <LoveBannerTitle>Я здесь живу и мне есть чем гордиться</LoveBannerTitle>
                            <LoveBannerSubtext>КЖУП "Буда-Кошелёвский коммунальник"</LoveBannerSubtext>
                        </LoveBannerSticker>
                    </LoveBannerContainer>
                </Reveal>
            </LoveBannerSection>

            <StatsSection>
                <StatsContainer>
                    {stats.map((stat, index) => (
                        <Reveal key={index} fill delay={index * 80}>
                            <StatCard>
                                <StatIcon>{stat.icon}</StatIcon>
                                <StatNumber>
                                    {stat.text ?? <CountUp to={stat.countTo ?? 0} suffix={stat.suffix ?? ''} />}
                                </StatNumber>
                                <StatLabel>{stat.label}</StatLabel>
                            </StatCard>
                        </Reveal>
                    ))}
                </StatsContainer>
            </StatsSection>

            <ServicesSection>
                <Reveal>
                    <SectionTitle>Наши услуги</SectionTitle>
                </Reveal>
                <Reveal delay={100}>
                    <SectionSubtitle>
                        Полный спектр жилищно-коммунальных услуг для вашего комфорта
                    </SectionSubtitle>
                </Reveal>
                <ServicesGrid>
                    {services.map((service, index) => (
                        <Reveal key={index} fill delay={index * 70}>
                            <ServiceCard onClick={() => navigate(service.link)}>
                                <StatIcon>{service.icon}</StatIcon>
                                <ServiceTitle>{service.title}</ServiceTitle>
                                <ServiceDescription>{service.description}</ServiceDescription>
                                <ServiceLink>
                                    Подробнее <ArrowRight size={16} />
                                </ServiceLink>
                            </ServiceCard>
                        </Reveal>
                    ))}
                </ServicesGrid>
            </ServicesSection>

            <WhySection>
                <Reveal>
                    <SectionTitle>Почему выбирают нас</SectionTitle>
                </Reveal>
                <Reveal delay={100}>
                    <SectionSubtitle>
                        Мы гордимся качеством предоставляемых услуг и доверием наших клиентов
                    </SectionSubtitle>
                </Reveal>
                <Reveal delay={150}>
                    <WhyGrid>
                        {whyUs.map((item, index) => (
                            <WhyCard key={index}>
                                <StatIcon>{item.icon}</StatIcon>
                                <WhyTitle>{item.title}</WhyTitle>
                                <WhyDescription>{item.description}</WhyDescription>
                            </WhyCard>
                        ))}
                    </WhyGrid>
                </Reveal>
            </WhySection>

            <UsefulSection>
                <UsefulContainer>
                    <Reveal>
                        <UsefulHeader>
                            <UsefulTitle>Полезно знать</UsefulTitle>
                            <UsefulLink onClick={() => navigate('/news/useful_to_know')}>
                                Все материалы <ArrowRight size={18} />
                            </UsefulLink>
                        </UsefulHeader>
                    </Reveal>
                    <UsefulGrid>
                        {usefulToKnowArticles.slice(usefulToKnowArticles.length - 4, usefulToKnowArticles.length).map((article, index) => (
                            <Reveal key={index} fill delay={index * 80}>
                                <UsefulCard
                                    onClick={() => {
                                        if (article.externalUrl) {
                                            window.open(article.externalUrl, '_blank', 'noopener,noreferrer');
                                        } else if (article.url) {
                                            navigate(`/news/useful_to_know/${article.url}`);
                                        }
                                    }}
                                >
                                    <UsefulCardImage src={article.image} alt={article.title} loading="lazy" />
                                    <UsefulCardTitle>{article.title}</UsefulCardTitle>
                                </UsefulCard>
                            </Reveal>
                        ))}
                    </UsefulGrid>
                </UsefulContainer>
            </UsefulSection>

            <CTASection>
                <Reveal>
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
                </Reveal>
            </CTASection>
        </MainContainer>
    );
};

export default Main;
