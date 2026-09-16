import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";

const Phishing = () => {
    const images = [
        "/useful_to_know/phishing.png"
    ];

    return (
        <ArticleLayout>
            <H1>Фишинг</H1>
            <ImageGallery
                images={images}
                altPrefix="Памятка о фишинге"
            />
        </ArticleLayout>
    );
};

export default Phishing;