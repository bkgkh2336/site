import { useState } from 'react';
import {
    Calendar,
    UserCheck,
    ClipboardList,
    Image
} from 'lucide-react';
import {
    ArticleContainer,
    ArticleContent,
    ArticleImage,
    ArticleText,
    HighlightedText,
    PublicationDate,
    SectionTitle,
    ParticipantsList,
    ParticipantItem,
    ParticipantIcon,
    ParticipantInfo,
    ParticipantName,
    ParticipantRole,
    AgendaSection,
    AgendaList,
    AgendaItem,
    AgendaNumber,
    AgendaText,
    PhotoGallery,
    GalleryImage
} from "./styled";
import H1 from "../../../../Components/H1/H1";
import ImageLightbox from "../../../../Components/ImageLightbox/ImageLightbox";

const UnionConference = () => {
    const publishedDate = "13.02.2026";
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const participants = [
        {
            name: "Мишаков Денис Сергеевич",
            role: "Технический инспектор труда Гомельской областной организации Белорусского профессионального союза работников жилищно-коммунального хозяйства и сферы обслуживания"
        },
        {
            name: "Ананич Нина Вячеславовна",
            role: "Специалист Гомельского областного объединения профсоюзов"
        }
    ];

    const agendaItems = [
        "Об отчете профсоюзного комитета первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» за 2025 год",
        "Об отчете ревизионной комиссии первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» за 2025 год",
        "Об утверждении отчета об исполнении сметы доходов и расходов первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» за 2025 год",
        "Об одобрении утвержденной профсоюзным комитетом сметы доходов и расходов первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» на 2026 год",
        "Об итогах выполнения коллективного договора за 2025 год",
        "Об информировании делегатов конференции о Положении о фонде помощи первичной профсоюзной организации КЖУП «Буда-Кошелёвский коммунальник» на 2026 год",
        "Об изменениях в составе профсоюзного комитета первичной профсоюзной организации",
        "Об изменениях в составе ревизионной комиссии первичной профсоюзной организации",
        "О внесении изменений и дополнений в коллективный договор"
    ];

    const galleryImages = [
        {
            src: "/news/UnionConference_12_02_26/img1.jpg",
            alt: "Фото с конференции 1"
        },
        {
            src: "/news/UnionConference_12_02_26/img2.jpg",
            alt: "Фото с конференции 2"
        },
        {
            src: "/news/UnionConference_12_02_26/img3.jpg",
            alt: "Фото с конференции 3"
        },
        {
            src: "/news/UnionConference_12_02_26/img4.jpg",
            alt: "Фото с конференции 4"
        }
    ];

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const navigateToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>Прошла отчетная профсоюзная конференция</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {publishedDate}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src="/news/UnionConference_12_02_26/img1.jpg"
                    alt="Прошла отчетная профсоюзная конференция"
                    loading="lazy"
                />

                <HighlightedText>
                    Вчера, 12 февраля 2026 года, прошла отчетная профсоюзная конференция КЖУП "Буда-Кошелёвский коммунальник".
                </HighlightedText>

                <SectionTitle>
                    <UserCheck size={28} />
                    Участники конференции
                </SectionTitle>

                <ParticipantsList>
                    {participants.map((participant, index) => (
                        <ParticipantItem key={index}>
                            <ParticipantIcon>
                                <UserCheck size={24} />
                            </ParticipantIcon>
                            <ParticipantInfo>
                                <ParticipantName>{participant.name}</ParticipantName>
                                <ParticipantRole>{participant.role}</ParticipantRole>
                            </ParticipantInfo>
                        </ParticipantItem>
                    ))}
                </ParticipantsList>

                <AgendaSection>
                    <SectionTitle>
                        <ClipboardList size={28} />
                        Повестка дня
                    </SectionTitle>

                    <ArticleText>
                        На рассмотрение отчетной конференции вносилась следующая повестка дня:
                    </ArticleText>

                    <AgendaList>
                        {agendaItems.map((item, index) => (
                            <AgendaItem key={index}>
                                <AgendaNumber>
                                    {index + 1}
                                </AgendaNumber>
                                <AgendaText>{item}</AgendaText>
                            </AgendaItem>
                        ))}
                    </AgendaList>
                </AgendaSection>

                <SectionTitle>
                    <Image size={28} />
                    Фотографии с конференции
                </SectionTitle>

                <PhotoGallery>
                    {galleryImages.map((image, index) => (
                        <GalleryImage
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                            onClick={() => openLightbox(index)}
                        />
                    ))}
                </PhotoGallery>
            </ArticleContent>

            {lightboxOpen && (
                <ImageLightbox
                    images={galleryImages}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onNavigate={navigateToImage}
                />
            )}
        </ArticleContainer>
    );
};

export default UnionConference;
