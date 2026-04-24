import H1 from "../../../Components/H1/H1";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
import { 
    PlansContainer, 
    DocumentList,
    DocumentItem
} from "./styled";
import { FileText } from "lucide-react";


const PlansAndSchedules = () => {
    const documents = [
        {
            title: "Перспективная программа на 2026-2030 годы капитального ремонта жилищного фонда по КЖУП \"Буда-Кошелевский коммунальник\"",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Perspektivnaja-programma-kapremonta-na-2026-2030..pdf"
        },
        {
            title: "РЕМОНТ ПОДЪЕЗДОВ в многоквартирных жилых домах на 2026 год",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Grafik-remontov-podjezdov-na-2026-god.pdf"
        },
        {
            title: "ГОДОВОЙ ПЛАН ТЕКУЩЕГО РЕМОНТА КРОВЕЛЬ ЖИЛЫХ ДОМОВ НА 2025 ГОД",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Godovoj-plan-tekuschego-remnta-krovel-zhilyx-domov-na-2026-god.pdf"
        },
        {
            title: "Замена (капитальный ремонт, модернизация, реконструкция) тепловых сетей в 2026 году",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Zamena-kapitalnyj-remont-modernizatsija-rekonstruktsija-teplovyx-setej-na-2026-god4.pdf"
        },
        {
            title: "Перечень объектов жилищно-коммунального хозяйства, подлежащих капитальному, текущему ремонту в 2026 году",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Perechen-objektov-zhilischno-kommunalnogo-xozjajstva-podlezhaschix-kapitalnomu-tekuschemu-remontu-v-2026-godu2.pdf"
        },
        {
            title: "Информация о местах сбора коммунальных отходов потребления, пунктов приема (заготовки) вторичных материальных ресурсов, объектах по сортировке и использованию отходов",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Informatsija-o-mestax-sbora-kommunalnyx-otxodov-1-1.pdf"
        }
    ];

    return (
        <PlansContainer>
            <H1>Планы и графики</H1>
            <section>
                <DocumentList>
                    {documents.map((doc, index) => (
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
        </PlansContainer>
    );
};

export default PlansAndSchedules;