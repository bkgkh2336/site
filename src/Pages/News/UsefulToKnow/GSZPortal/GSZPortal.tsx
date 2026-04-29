import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ContentSection from "../../../../Components/ContentSection/ContentSection";
import Paragraph from "../../../../Components/Paragraph/Paragraph";
import { GalleryImage, VideoContainer, VideoItem } from "./styled";

const GSZPortal = () => {
    return (
        <ArticleLayout>
            <GalleryImage
                style={{ height: '10%', objectFit: 'contain' }}
                src="/useful_to_know/GSZ/icon.png"
                alt="Портал государственной службы занятости"
                loading="lazy"
            />
            <ContentSection>
                <Paragraph>
                    <strong>"<a href="https://gsz.gov.by/" target="_blank" rel="noopener noreferrer">Портал государственной службы занятости</a>"</strong> — официальный информационный ресурс для граждан, ищущих работу, а также для работодателей. Портал предоставляет доступ к актуальным вакансиям, услугам службы занятости и электронным сервисам.
                </Paragraph>
            </ContentSection>

            <ContentSection title="Для соискателей">
                <Paragraph>
                    На портале вы можете найти актуальные вакансии от работодателей всей Республики Беларусь, получить статус безработного, оформить пособие по безработице, а также пройти профессиональное обучение и переобучение.
                </Paragraph>
            </ContentSection>

            <ContentSection title="Для работодателей">
                <Paragraph>
                    Работодатели могут размещать вакансии, осуществлять подписку на рассылку анкет-резюме для подбора соискателей; получать уведомления о соискателях на e-mail, направлять отклик на анкету-резюме.
                </Paragraph>
            </ContentSection>

            <ContentSection title="Видеоматериалы">
                <VideoContainer>
                    <VideoItem>
                        <video controls width="100%">
                            <source src="/useful_to_know/GSZ/PromoFilm_v5_Subs.mp4" type="video/mp4" />
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </VideoItem>
                    <VideoItem>
                        <video controls width="100%">
                            <source src="/useful_to_know/GSZ/Realistic_V4_Subs.mp4" type="video/mp4" />
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </VideoItem>
                    <VideoItem>
                        <video controls width="100%">
                            <source src="/useful_to_know/GSZ/Hleb_v5_Subs.mp4" type="video/mp4" />
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </VideoItem>
                </VideoContainer>
            </ContentSection>
        </ArticleLayout >
    );
};

export default GSZPortal;
