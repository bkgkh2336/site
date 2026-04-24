import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";


const SafeInternetCards = () => {
    const images = [
        "/useful_to_know/safe_internet1.jpg",
        "/useful_to_know/safe_internet2.jpg",
        "/useful_to_know/safe_internet3.jpg",
        "/useful_to_know/safe_internet4.jpg"
    ];

    return (
        <ArticleLayout>
            <H1>Безопасность в сети и банковские карты</H1>
            
            <ImageGallery 
                images={images} 
                altPrefix="Памятка о безопасности в сети"
            />
        </ArticleLayout>
    );
};

export default SafeInternetCards;