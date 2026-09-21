import { Calendar, ShieldCheck, AlertTriangle, MapPin, Wrench, CheckCircle, Bell, Search, Brush, Battery, Check } from 'lucide-react';
import {
    ArticleContainer,
    ArticleContent,
    ArticleImage,
    PublicationDate,
    IntroSection,
    IntroText,
    StatisticsSection,
    StatsContainer,
    StatsLabel,
    StatsGrid,
    StatBlock,
    StatDivider,
    StatNumber,
    StatMainLabel,
    StatSubLabel,
    SectionTitle,
    ArticleText,
    InfoBlock,
    InfoBlockIcon,
    InfoBlockText,
    CardGrid,
    PlacementCardGreen,
    PlacementCardYellow,
    PlacementCardTitle,
    PlacementCardYellowTitle,
    PlacementCardText,
    ChecklistGrid,
    ChecklistItem,
    ChecklistIcon,
    ChecklistText,
    StepsContainer,
    StepItem,
    StepNumber,
    StepText,
    WarningBlock,
    WarningIcon,
    WarningText,
    MaintenanceGrid,
    MaintenanceCard,
    MaintenanceIcon,
    MaintenanceTitle,
    MaintenanceDesc,
    FinalSection,
    FinalTitle,
    FinalText,
    CtaText
} from "./styled";
import H1 from "../../../../Components/H1/H1";

const AutonomousFireDetectors = () => {
    const publishedDate = "21.09.2026";

    const checklistItems = [
        "извещатель надёжно закреплён",
        "корпус не имеет механических повреждений",
        "доступ к прибору не перекрыт",
        "установлен источник питания, предусмотренный изготовителем",
        "извещатель находится в рабочем состоянии",
        "контрольный индикатор работает в соответствии с инструкцией",
        "при проверке срабатывает звуковая сигнализация"
    ];

    const maintenanceItems = [
        { icon: <Search size={22} />, title: "Осмотр", desc: "Регулярно осматривайте корпус извещателя" },
        { icon: <Brush size={22} />, title: "Очистка", desc: "Своевременно очищайте прибор от пыли" },
        { icon: <Battery size={22} />, title: "Элемент питания", desc: "Контролируйте состояние батарейки" },
        { icon: <Check size={22} />, title: "Проверка", desc: "Проверяйте работоспособность по инструкции" }
    ];

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>Автономные пожарные извещатели - важный элемент пожарной безопасности</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {publishedDate}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src="/news/edinyy_den_bezopasnosti_banner.jpg"
                    alt="Автономные пожарные извещатели"
                    loading="lazy"
                />

                <IntroSection>
                    <IntroText>
                        Пожар может возникнуть внезапно, а первые минуты после обнаружения возгорания имеют <strong>решающее значение</strong> для спасения людей и сохранения имущества. Одним из простых и эффективных средств раннего обнаружения пожара являются <strong>автономные пожарные извещатели (АПИ)</strong>.
                    </IntroText>
                </IntroSection>

                <StatisticsSection>
                    <StatsContainer>
                        <StatsLabel>Эффективность АПИ</StatsLabel>
                        <StatsGrid>
                            <StatBlock>
                                <StatNumber>93</StatNumber>
                                <StatMainLabel>спасено в Гомельской области в 2025 году</StatMainLabel>
                            </StatBlock>
                            <StatDivider />
                            <StatBlock>
                                <StatNumber>21</StatNumber>
                                <StatMainLabel>в том числе</StatMainLabel>
                                <StatSubLabel>детей спасено</StatSubLabel>
                            </StatBlock>
                            <StatDivider />
                            <StatBlock>
                                <StatNumber>200+</StatNumber>
                                <StatMainLabel>ежегодно устанавливается</StatMainLabel>
                                <StatSubLabel>АПИ в нашем районе</StatSubLabel>
                            </StatBlock>
                        </StatsGrid>
                    </StatsContainer>
                </StatisticsSection>

                <SectionTitle>
                    <ShieldCheck size={26} />
                    Что такое АПИ?
                </SectionTitle>

                <InfoBlock>
                    <InfoBlockIcon><ShieldCheck size={22} /></InfoBlockIcon>
                    <InfoBlockText>
                        АПИ предназначен для обнаружения признаков пожара, прежде всего задымления, и подачи звукового сигнала, предупреждающего находящихся в помещении людей об опасности. В отличие от систем пожарной сигнализации, автономный извещатель имеет собственный источник питания и не требует подключения к централизованной системе.
                    </InfoBlockText>
                </InfoBlock>

                <SectionTitle>
                    <AlertTriangle size={26} />
                    Почему установка АПИ необходима?
                </SectionTitle>

                <ArticleText>
                    Основная опасность пожара заключается не только в воздействии высокой температуры и огня, но и в распространении дыма. Особенно опасным является пожар в ночное время, когда человек может не почувствовать запах дыма или не услышать первые признаки возгорания.
                </ArticleText>

                <InfoBlock>
                    <InfoBlockIcon><AlertTriangle size={22} /></InfoBlockIcon>
                    <InfoBlockText>
                        АПИ способен обнаружить задымление на ранней стадии и подать громкий звуковой сигнал. Это позволяет своевременно проснуться, покинуть опасное помещение и вызвать спасателей. При этом эффективность извещателя напрямую зависит от правильного размещения, исправности и своевременного обслуживания.
                    </InfoBlockText>
                </InfoBlock>

                <SectionTitle>
                    <MapPin size={26} />
                    Где следует устанавливать АПИ?
                </SectionTitle>

                <ArticleText>
                    АПИ рекомендуется устанавливать в каждой жилой комнате, особое внимание следует уделять детским комнатам. Обычные дымовые АПИ не следует устанавливать непосредственно на кухне, поскольку пар и дым, образующиеся во время приготовления пищи, могут привести к ложным срабатываниям.
                </ArticleText>

                <CardGrid>
                    <PlacementCardGreen>
                        <PlacementCardTitle>Потолок</PlacementCardTitle>
                        <PlacementCardText>
                            Основной и рекомендуемый вариант. Центральная часть помещения, или ближе к стене если по центру невозможно. Расстояние от извещателя до стены - не менее 10 см.
                        </PlacementCardText>
                    </PlacementCardGreen>
                    <PlacementCardGreen>
                        <PlacementCardTitle>Стена</PlacementCardTitle>
                        <PlacementCardText>
                            При натяжном потолке извещатель крепится на стене на расстоянии 10–30 см от потолка.
                        </PlacementCardText>
                    </PlacementCardGreen>
                    <PlacementCardYellow>
                        <PlacementCardYellowTitle>Не рекомендуется</PlacementCardYellowTitle>
                        <PlacementCardText>
                            Не устанавливайте в местах, где работе извещателя препятствуют мебель и декоративные конструкции. Также избегайте углов помещений и установки над плитой.
                        </PlacementCardText>
                    </PlacementCardYellow>
                </CardGrid>

                <ArticleText>
                    При выборе места установки необходимо учитывать особенности конкретного помещения и требования эксплуатационной документации изготовителя.
                </ArticleText>

                <SectionTitle>
                    <CheckCircle size={26} />
                    Требования к монтажу
                </SectionTitle>

                <ArticleText>
                    Монтаж АПИ должен выполняться в соответствии с инструкцией изготовителя и требованиями действующих нормативных документов. После монтажа необходимо убедиться в следующем:
                </ArticleText>

                <ChecklistGrid>
                    {checklistItems.map((item, index) => (
                        <ChecklistItem key={index}>
                            <ChecklistIcon><CheckCircle size={16} /></ChecklistIcon>
                            <ChecklistText>{item}</ChecklistText>
                        </ChecklistItem>
                    ))}
                </ChecklistGrid>

                <SectionTitle>
                    <Bell size={26} />
                    Правила эксплуатации
                </SectionTitle>

                <ArticleText>
                    После установки извещатель должен постоянно находиться в рабочем состоянии.
                </ArticleText>

                <StepsContainer>
                    <StepItem>
                        <StepNumber>01</StepNumber>
                        <StepText>Определить возможную причину срабатывания. Если обнаружено возгорание - перейти к шагу 2.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>02</StepNumber>
                        <StepText>При обнаружении пожара немедленно покинуть опасную зону.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>03</StepNumber>
                        <StepText>Сообщить о пожаре по телефону <strong>101</strong> или <strong>112</strong>.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>04</StepNumber>
                        <StepText>Предупредить находящихся людей об опасности.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>05</StepNumber>
                        <StepText>Не возвращаться в горящее помещение ни при каких обстоятельствах.</StepText>
                    </StepItem>
                </StepsContainer>

                <WarningBlock>
                    <WarningIcon><AlertTriangle size={22} /></WarningIcon>
                    <WarningText>
                        <strong>Нельзя отключать АПИ</strong>, извлекать из него источник питания или закрывать корпус посторонними предметами только для того, чтобы избежать ложных срабатываний.
                    </WarningText>
                </WarningBlock>

                <SectionTitle>
                    <Wrench size={26} />
                    Обслуживание АПИ
                </SectionTitle>

                <ArticleText>
                    Даже исправный АПИ требует периодического ухода. На корпусе и защитной сетке со временем может накапливаться пыль, которая способна повлиять на работу чувствительного элемента.
                </ArticleText>

                <MaintenanceGrid>
                    {maintenanceItems.map((item, index) => (
                        <MaintenanceCard key={index}>
                            <MaintenanceIcon>{item.icon}</MaintenanceIcon>
                            <MaintenanceTitle>{item.title}</MaintenanceTitle>
                            <MaintenanceDesc>{item.desc}</MaintenanceDesc>
                        </MaintenanceCard>
                    ))}
                </MaintenanceGrid>

                <ArticleText>
                    Очистку извещателя от пыли рекомендуется проводить <strong>не реже одного раза в год</strong>, а также после каждого ложного срабатывания.
                </ArticleText>

                <FinalSection>
                    <FinalTitle>Помните!</FinalTitle>
                    <FinalText>
                        <strong>Автономный пожарный извещатель - это небольшое устройство, которое может спасти жизнь.</strong>
                    </FinalText>
                    <FinalText>
                        Но для этого он должен быть правильно установлен, исправен и находиться в рабочем состоянии. Не пренебрегайте требованиями пожарной безопасности: установите АПИ в своем доме или квартире, регулярно проверяйте его работоспособность и своевременно заменяйте элемент питания.
                    </FinalText>
                    <CtaText>Позаботьтесь о безопасности своей семьи - установите автономный пожарный извещатель!</CtaText>
                </FinalSection>
            </ArticleContent>
        </ArticleContainer>
    );
};

export default AutonomousFireDetectors;