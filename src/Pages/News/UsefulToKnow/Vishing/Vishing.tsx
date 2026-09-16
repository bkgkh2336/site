import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";

const Vishing = () => {
    const images = [
        "/useful_to_know/vishing.jpg"
    ];

    return (
        <ArticleLayout>
            <H1>Вишинг</H1>
            <ImageGallery
                images={images}
                altPrefix="Памятка о вишинге"
            />
        </ArticleLayout>
    );
};

export default Vishing;