import { Trash2, Wind, Zap, Sprout, Flame, Droplet, PlugZap, Truck, Cross, File } from "lucide-react";
import H1 from "../../Components/H1/H1";
import { ServicesContainer, ServicesGrid, ServiceCard, ServiceCardDiv, IconWrapper, CardTitle, CardDescription } from "./styled";

interface Service {
    title: string;
    description: string;
    path?: string;
    icon: React.ReactNode;
    pdfPath?: string;
}

const Services = () => {
    const services: Service[] = [
        {
            title: "Услуги вентиляционных и дымовых каналов",
            description: "",
            path: "/ventilation_services",
            icon: <Wind style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Услуги по вывозу мусора на полигон собственным транспортом заказчика с последующим захоронением",
            description: "",
            path: "/waste_services",
            icon: <Trash2 style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Услуги по электрофизическим измерениям, оказываемым населению измерительной лабораторией энергетической службы",
            description: "",
            path: "/electro_services",
            icon: <Zap style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Услуги по скашиванию травы (сплошных и комбинированных газонов) ручным моторизированным инструментом",
            description: "Газонокосилками  типа  \"Husgvarna -143R,235R,240R,245R,343R\", \"Stihl FS-400\"",
            path: "/grass_services",
            icon: <Sprout style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Услуги по отоплению населению",
            description: "",
            path: "/heating_services",
            icon: <Flame style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Услуги по водопроводу и канализации населению",
            description: "",
            path: "/plumbing_services",
            icon: <Droplet style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Электромонтажные работы населению",
            description: "",
            path: "/el_inst_services",
            icon: <PlugZap style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Транспортные услуги населению и бюджетным организациям",
            description: "",
            path: "/transport_services",
            icon: <Truck style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Транспортные услуги для юридических лиц",
            description: "",
            path: "/transport_jur_services",
            icon: <Truck style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Прочие транспортные услуги",
            description: "",
            path: "/transport_other_services",
            icon: <Truck style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Об организации похоронного дела и оказанию ритуальных (гарантированных) услуг",
            description: "",
            pdfPath: "/documents/Об организации похоронного дела и оказанию ритуальных (гарантированных) услуг.pdf",
            icon: <Cross style={{ width: 32, height: 32, color: '#4CAF50' }} />
        },
        {
            title: "Документы по обращению с отходами",
            description: "",
            path: "/cemetery_services",
            icon: <File style={{ width: 32, height: 32, color: '#4CAF50' }} />
        }
    ];

    return (
        <ServicesContainer>
            <H1 style={{ marginBottom: '40px' }}>Наши услуги</H1>
            <ServicesGrid>
                {services.map((service, index) => (
                    service.pdfPath ? (
                        <ServiceCardDiv 
                            key={index} 
                            onClick={() => window.open(service.pdfPath, '_blank')}
                        >
                            <IconWrapper>
                                {service.icon}
                            </IconWrapper>
                            <CardTitle>{service.title}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                        </ServiceCardDiv>
                    ) : (
                        <ServiceCard 
                            key={index} 
                            to={service.path || '/'}
                        >
                            <IconWrapper>
                                {service.icon}
                            </IconWrapper>
                            <CardTitle>{service.title}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                        </ServiceCard>
                    )
                ))}
            </ServicesGrid>
        </ServicesContainer>
    );
};

export default Services;