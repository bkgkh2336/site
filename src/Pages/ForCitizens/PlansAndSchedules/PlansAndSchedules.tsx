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
            title: "ПЕРЕЧЕНЬ объектов жилищно-коммунального хозяйства, подлежащих капитальному, текущему ремонту в 2025 году",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Perechen-objektov-zhilischno-kommunalnogo-xozjajstva-podlezhaschix-kapitalnomu-tekuschemu-remontu-stroitelstvo-stantsij-obezzhelezivanija-v-2025-godu.pdf"
        },
        {
            title: "Информация о местах сбора коммунальных отходов потребления, пунктов приема (заготовки) вторичных материальных ресурсов, объектах по сортировке и использованию отходов",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Informatsija-o-mestax-sbora-kommunalnyx-otxodov-1-1.pdf"
        },
        {
            title: "Уборка мест общего пользования жилых домов (подъездов)",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Uborka-mest-obschego-polzovanija-zhilyx-domov-podjezdov-1.pdf"
        },
        {
            title: "Замена (капитальный ремонт, модернизация, реконструкция) тепловых сетей в 2025 году",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Zamena-kapitalnyj-remont-modernizatsija-rekonstruktsija-teplovyx-setej-na-2025-god.pdf"
        },
        {
            title: "Региональный план по ремонту (комплексному благоустройству) придомовых территорий многоквартирных жилых домов по Буда-Кошелевскому району на 2022 – 2025 годы по КЖУП «Буда-Кошелевский коммунальник»",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Plan-remonta-pridomovyx-territorij-na-2022-2025.pdf"
        },
        {
            title: "Перспективная программа на 2021-2025 годы капитального ремонта жилищного фонда по КЖУП «Буда-Кошелевский коммунальник»",
            url: "https://buda-koshelevo.gov.by/uploads/Files/Perspektivnaja-programma-po-kapitalnomu-remontu-zhilischnogo-fonda-na-2021-2025-gody1.pdf"
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