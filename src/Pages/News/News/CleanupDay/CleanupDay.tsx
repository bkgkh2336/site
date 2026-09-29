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
import Loading from "../../../../Components/Loading/Loading";
import NotFound from "../../../NotFound/NotFound";
import { useArticle } from "../../../../data/useArticle";
import { formatArticleDate } from "../../../../data/articles";

const CleanupDay = () => {
    const { article, isLoading } = useArticle('news', 'cleanup_day');
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

    if (isLoading) return <Loading />;
    if (!article) return <NotFound />;

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>{article.title}</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {formatArticleDate(article.published_at)}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src={article.cover || galleryImages[0].src}
                    alt={article.title}
                    loading="lazy"
                />

                <HighlightedText>
                    {article.summary}
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