import { useState } from 'react';
import {
    Calendar,
    ShieldCheck,
    AlertTriangle,
    Phone,
    MapPin,
    Heart,
    CheckCircle,
    Battery,
    Wrench,
    Bell,
    House,
    Thermometer
} from 'lucide-react';
import {
    ArticleContainer,
    ArticleContent,
    ArticleImage,
    PublicationDate,
    IntroSection,
    IntroText,
    StatisticsSection,
    StatsGrid,
    StatCard,
    StatNumber,
    StatLabel,
    SectionTitle,
    ArticleText,
    InfoCard,
    InfoCardTitle,
    InfoCardText,
    CardGrid,
    PlacementCard,
    PlacementCardTitle,
    PlacementCardText,
    WarningCard,
    ChecklistGrid,
    ChecklistItem,
    ChecklistIcon,
    ChecklistText,
    StepsGrid,
    StepItem,
    StepNumber,
    StepText,
    MaintenanceGrid,
    MaintenanceCard,
    MaintenanceIcon,
    MaintenanceTitle,
    MaintenanceDesc,
    FinalCallToAction,
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
        { icon: "🛡️", title: "Осмотр", desc: "Регулярно осматривайте корпус извещателя" },
        { icon: "🧹", title: "Очистка", desc: "Своевременно очищайте прибор от пыли" },
        { icon: "🔋", title: "Элемент питания", desc: "Контролируйте состояние батарейки" },
        { icon: "✅", title: "Проверка", desc: "Проверяйте работоспособность по инструкции" }
    ];

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>Автономные пожарные извещатели — важный элемент пожарной безопасности</H1>

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
                    <SectionTitle>
                        <ShieldCheck size={28} />
                        Эффективность АПИ
                    </SectionTitle>
                    <StatsGrid>
                        <StatCard>
                            <StatNumber>93</StatNumber>
                            <StatLabel>спасено благодаря своевременному срабатыванию АПИ в Гомельской области в 2025 году</StatLabel>
                        </StatCard>
                        <StatCard>
                            <StatNumber>21</StatNumber>
                            <StatLabel>в том числе детей</StatLabel>
                        </StatCard>
                        <StatCard>
                            <StatNumber>200+</StatNumber>
                            <StatLabel>ежегодно устанавливается АПИ в нашем районе</StatLabel>
                        </StatCard>
                    </StatsGrid>
                </StatisticsSection>

                <InfoCard>
                    <InfoCardTitle>
                        <House size={22} />
                        Что такое АПИ?
                    </InfoCardTitle>
                    <InfoCardText>
                        АПИ предназначен для обнаружения признаков пожара, прежде всего задымления, и подачи звукового сигнала, предупреждающего находящихся в помещении людей об опасности. В отличие от систем пожарной сигнализации, автономный извещатель имеет собственный источник питания и не требует подключения к централизованной системе.
                    </InfoCardText>
                </InfoCard>

                <SectionTitle>
                    <AlertTriangle size={28} />
                    Почему установка АПИ необходима?
                </SectionTitle>

                <InfoCard>
                    <InfoCardTitle>
                        <Thermometer size={22} />
                        Главная опасность — дым
                    </InfoCardTitle>
                    <InfoCardText>
                        Основная опасность пожара заключается не только в воздействии высокой температуры и огня, но и в распространении дыма. Особенно опасным является пожар в ночное время, когда человек может не почувствовать запах дыма или не услышать первые признаки возгорания. АПИ способен обнаружить задымление на ранней стадии и подать громкий звуковой сигнал, позволяя своевременно проснуться, покинуть опасное помещение и вызвать спасателей.
                    </InfoCardText>
                </InfoCard>

                <SectionTitle>
                    <MapPin size={28} />
                    Где следует устанавливать АПИ?
                </SectionTitle>

                <ArticleText>
                    АПИ рекомендуется устанавливать в каждой жилой комнате, особое внимание следует уделять детским комнатам. Обычные дымовые АПИ не следует устанавливать непосредственно на кухне, поскольку пар и дым, образующиеся во время приготовления пищи, могут привести к ложным срабатываниям.
                </ArticleText>

                <CardGrid>
                    <PlacementCard>
                        <PlacementCardTitle>📌 На потолке</PlacementCardTitle>
                        <PlacementCardText>
                            Центральная часть помещения. Если невозможно по центру — ближе к стене. Расстояние до стены — не менее 10 см.
                        </PlacementCardText>
                    </PlacementCard>
                    <PlacementCard>
                        <PlacementCardTitle>📌 На стене</PlacementCardTitle>
                        <PlacementCardText>
                            При натяжном потолке крепится на стене на расстоянии 10–30 см от потолка.
                        </PlacementCardText>
                    </PlacementCard>
                    <PlacementCard style={{ gridColumn: '1 / -1' }}>
                        <PlacementCardTitle>🚫 Где не рекомендуется</PlacementCardTitle>
                        <PlacementCardText>
                            Не устанавливайте в местах, где работе извещателя могут препятствовать мебель, декоративные конструкции и другие предметы. Также избегайте углов помещений и прямой установки над плитой.
                        </PlacementCardText>
                    </PlacementCard>
                </CardGrid>

                <ArticleText>
                    При выборе места установки необходимо учитывать особенности конкретного помещения и требования эксплуатационной документации изготовителя.
                </ArticleText>

                <SectionTitle>
                    <CheckCircle size={28} />
                    Требования к монтажу
                </SectionTitle>

                <ArticleText>
                    Монтаж АПИ должен выполняться в соответствии с инструкцией изготовителя и требованиями действующих нормативных документов. После монтажа необходимо убедиться в следующем:
                </ArticleText>

                <ChecklistGrid>
                    {checklistItems.map((item, index) => (
                        <ChecklistItem key={index}>
                            <ChecklistIcon><CheckCircle size={18} /></ChecklistIcon>
                            <ChecklistText>{item}</ChecklistText>
                        </ChecklistItem>
                    ))}
                </ChecklistGrid>

                <SectionTitle>
                    <Bell size={28} />
                    Правила эксплуатации
                </SectionTitle>

                <ArticleText>
                    После установки извещатель должен постоянно находиться в рабочем состоянии.
                </ArticleText>

                <StepsGrid>
                    <StepItem>
                        <StepNumber>1</StepNumber>
                        <StepText>Определить возможную причину сигнала. Если обнаружено возгорание — перейти к шагу 2.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>2</StepNumber>
                        <StepText>Немедленно покинуть опасную зону вместе с находящимися рядом людьми.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>3</StepNumber>
                        <StepText>Сообщить о пожаре по телефону <strong>101</strong> или <strong>112</strong>.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>4</StepNumber>
                        <StepText>Предупредить находящихся людей об опасности.</StepText>
                    </StepItem>
                    <StepItem>
                        <StepNumber>5</StepNumber>
                        <StepText>Не возвращаться в горящее помещение ни при каких обстоятельствах.</StepText>
                    </StepItem>
                </StepsGrid>

                <WarningCard>
                    <AlertTriangle size={24} style={{ flexShrink: 0, color: '#ffc107' }} />
                    <InfoCardText style={{ margin: 0 }}>
                        <strong>Нельзя отключать АПИ</strong>, извлекать из него источник питания или закрывать корпус посторонними предметами только для того, чтобы избежать ложных срабатываний.
                    </InfoCardText>
                </WarningCard>

                <SectionTitle>
                    <Wrench size={28} />
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

                <FinalCallToAction>
                    <FinalTitle>Помните!</FinalTitle>
                    <FinalText>
                        <strong>Автономный пожарный извещатель — это небольшое устройство, которое может спасти жизнь.</strong>
                    </FinalText>
                    <FinalText>
                        Но для этого он должен быть правильно установлен, исправен и находиться в рабочем состоянии. Не пренебрегайте требованиями пожарной безопасности: установите АПИ в своем доме или квартире, регулярно проверяйте его работоспособность и своевременно заменяйте элемент питания.
                    </FinalText>
                    <CtaText>Позаботьтесь о безопасности своей семьи — установите автономный пожарный извещатель!</CtaText>
                </FinalCallToAction>
            </ArticleContent>
        </ArticleContainer>
    );
};

export default AutonomousFireDetectors;