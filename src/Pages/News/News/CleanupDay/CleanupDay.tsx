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

const CleanupDay = () => {
    const publishedDate = "10.09.2026";
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = [
        {
            src: "/news/CleanupDay_05_09_26/img1.jpg",
            alt: "Фото с субботника 1"
        },
        {
            src: "/news/CleanupDay_05_09_26/img2.jpg",
            alt: "Фото с субботника 2"
        },
        {
            src: "/news/CleanupDay_05_09_26/img3.jpg",
            alt: "Фото с субботника 3"
        },
        {
            src: "/news/CleanupDay_05_09_26/img4.jpg",
            alt: "Фото с субботника 4"
        },
        {
            src: "/news/CleanupDay_05_09_26/img5.jpg",
            alt: "Фото с субботника 5"
        },
        {
            src: "/news/CleanupDay_05_09_26/img6.jpg",
            alt: "Фото с субботника 6"
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
            <H1 style={{ marginBottom: '20px' }}>Прошел субботник по благоустройству территории</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {publishedDate}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src="/news/CleanupDay_05_09_26/img1.jpg"
                    alt="Прошел субботник по благоустройству территории"
                    loading="lazy"
                />

                <HighlightedText>
                    5 сентября 2026 года в КЖУП «Буда-Кошелёвский коммунальник» прошёл субботник.
                </HighlightedText>

                <ArticleText>
                    Мы собрались вместе для наведения порядка на территории. Работа шла совместными усилиями - территория привела себя в порядок, все приняли участие и отлично провели время.
                </ArticleText>

                <SectionTitle>
                    <Image size={28} />
                    Фотографии с субботника
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

export default CleanupDay;