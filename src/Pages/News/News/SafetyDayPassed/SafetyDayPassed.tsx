import { useState } from 'react';
import {
    Calendar,
    Image
} from 'lucide-react';
import {
    ArticleContainer,
    ArticleContent,
    ArticleImage,
    HighlightedText,
    PublicationDate,
    SectionTitle,
    PhotoGallery,
    GalleryImage,
    ArticleText
} from "./styled";
import H1 from "../../../../Components/H1/H1";
import ImageLightbox from "../../../../Components/ImageLightbox/ImageLightbox";

const SafetyDayPassed = () => {
    const publishedDate = "24.09.2026";
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = [
        {
            src: "/news/UnifiedSafetyDay_2026/img1.jpg",
            alt: "Единый день безопасности 1"
        },
        {
            src: "/news/UnifiedSafetyDay_2026/img2.jpg",
            alt: "Единый день безопасности 2"
        },
        {
            src: "/news/UnifiedSafetyDay_2026/img3.jpg",
            alt: "Единый день безопасности 3"
        },
        {
            src: "/news/UnifiedSafetyDay_2026/img4.jpg",
            alt: "Единый день безопасности 4"
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
            <H1 style={{ marginBottom: '20px' }}>Прошёл Единый день безопасности</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {publishedDate}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src="/news/edinyy_den_bezopasnosti_banner.jpg"
                    alt="Единый день безопасности"
                    loading="lazy"
                />

                <HighlightedText>
                    24 сентября 2026 года прошёл Единый день безопасности!
                </HighlightedText>

                <ArticleText>
                    В ходе мероприятия участники вспомнили основные правила поведения при пожаре, порядок эвакуации и действия при обнаружении возгорания. Особое внимание уделили тому, как правильно ориентироваться в незнакомом здании и почему при пожаре важно сохранять спокойствие.
                </ArticleText>

                <ArticleText>
                    Сотрудники посмотрели тематические видеоматериалы о действиях при пожаре, эвакуации, использовании плана эвакуации и автономных пожарных извещателях. Был проведён подробный разбор практических ситуаций и обсуждение ключевых моментов пожарной безопасности.
                </ArticleText>

                <SectionTitle>
                    <Image size={28} />
                    Фотографии с мероприятия
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

                <ArticleText>
                    Материалы мероприятия доступны на <a href="https://mchs.gov.by/edinyy-den-bezopasnosti/" target="_blank" rel="noopener noreferrer">сайте МЧС Республики Беларусь</a>.
                </ArticleText>
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

export default SafetyDayPassed;
