import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";

const PhoneScammersGuide = () => {
    const images = [
        "/useful_to_know/phone-scammers__1.jpg",
        "/useful_to_know/phone-scammers__2.jpg"
    ];

    return (
        <ArticleLayout>
            <H1>Как не попасться на удочку телефонных мошенников?</H1>
            <ImageGallery
                images={images}
                altPrefix="Как не попасться на удочку телефонных мошенников"
            />
        </ArticleLayout>
    );
};

export default PhoneScammersGuide;