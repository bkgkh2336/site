import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
import { 
    InfoContainer,
    DocumentList,
    DocumentItem,
    SectionDivider
} from "./styled";
import { FileText, ExternalLinkIcon } from "lucide-react";


const InformationAboutCommunal = () => {
    const ourDocuments = [
        {
            title: "Прейскуранты платных услуг",
            url: "/services"
        },
        {
            title: "Информация о местах сбора коммунальных отходов потребления, пунктов приема (заготовки) вторичных материальных ресурсов, объектах по сортировке и использованию отходов",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Informatsija-o-mestax-sbora-kommunalnyx-otxodov-1-1.pdf"
        }
    ];

    const generalDocuments = [
        {
            title: "ТКП 17.11-08-2020 Правила обращения с коммунальными отходами",
            url: "https://mjkx.gov.by/docs/ofitsialnye-dokumenty/01.pdf"
        },
        {
            title: "Концепция совершенствования и развития жилищно-коммунального хозяйства до 2025 года",
            url: "/documents/Концепция совершенствования и развития жилищно-коммунального хозяйства до 2025 года.pdf"
        },
        {
            title: "Государственная программа \"Комфортное жилье и благоприятная среда\" на 2021 - 2025 годы",
            url: "https://mjkx.gov.by/docs/ofitsialnye-dokumenty/03.PDF"
        },
        {
            title: "Социальные стандарты",
            url: "/documents/Социальные стандарты.pdf"
        },
        {
            title: "Закон Республики Беларусь об обращениях граждан и юридических лиц",
            url: "/documents/Закон об обращении граждан и юридических лиц.pdf"
        },
        {
            title: "Тарифы",
            url: "https://mjkx.gov.by/docs/ofitsialnye-dokumenty/ukaz_461.pdf"
        },
        {
            title: "Положение о порядке расчетов и внесения платы за жилищно-коммунальные услуги и платы за пользование жилыми помещениями государственного жилищного фонда",
            url: "/documents/Положение о порядке расчета и внесения платы за жилищно-коммунальные услуги и платы за польз жилым помещением.pdf"
        },
        {
            title: "Разъяснение к положению о порядке взаимодействия государственных органов в работе с обращениями граждан и юридических лиц",
            url: "https://mjkx.gov.by/ofitsialnye-dokumenty/razyasnenie-k-polozheniyu"
        },
        {
            title: "Концепция национальной безопасности Республики Беларусь",
            url: "/documents/Концепция национальной безопасности республики беларусь.pdf"
        },
        {
            title: "Извещение о размере платы за жилищно-коммунальные услуги и платы за пользование жилым помещением",
            url: "/documents/Извещение о размере платы за жилищно-коммунальные услуги и платы за пользование жилым помещением.pdf"
        },
        {
            title: "О защите прав потребителей жилищно-коммунальных услуг",
            url: "https://mjkx.gov.by/ofitsialnye-dokumenty/o-zashchite-prav-potrebitelej-zhilishchno-kommunalnykh-uslug"
        },
        {
            title: "Директива 1",
            url: "/documents/Директива 1.pdf"
        },
        {
            title: "Директива 2",
            url: "/documents/Директива 2.pdf"
        },
        {
            title: "Директива 3",
            url: "/documents/Директива 3.pdf"
        },
        {
            title: "Директива 4",
            url: "/documents/Директива 4.pdf"
        },
        {
            title: "Директива 5",
            url: "/documents/Директива 5.pdf"
        }
    ];

    return (
        <InfoContainer>
            <H1 style={{ marginBottom: '30px' }}>Информация о сфере ЖКХ</H1>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '25px', color: '#28a745' }}>
                    Информация нашего коммунальника
                </H2>
                <DocumentList>
                    {ourDocuments.map((doc, index) => (
                        <DocumentItem key={index}>
                            <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#28a745', flexShrink: 0 }} />
                            <ExternalLink 
                                href={doc.url}
                                style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#28a745' }}
                            >
                                {doc.title}
                            </ExternalLink>
                        </DocumentItem>
                    ))}
                </DocumentList>
            </section>

            <SectionDivider />

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '25px', color: '#28a745' }}>
                    Общая информация по сфере ЖКХ
                </H2>
                <DocumentList>
                    {generalDocuments.map((doc, index) => (
                        <DocumentItem key={index}>
                            <ExternalLinkIcon style={{ width: '1.3rem', height: '1.3rem', color: '#28a745', flexShrink: 0 }} />
                            <ExternalLink 
                                href={doc.url}
                                style={{ fontSize: '1.05rem', lineHeight: '1.6' }}
                            >
                                {doc.title}
                            </ExternalLink>
                        </DocumentItem>
                    ))}
                </DocumentList>
            </section>
        </InfoContainer>
    );
};

export default InformationAboutCommunal;