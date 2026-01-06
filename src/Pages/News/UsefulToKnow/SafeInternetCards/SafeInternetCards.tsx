import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";


const SafeInternetCards = () => {
    const images = [
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/SafeInternet/6.-белта-05.jpg",
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/SafeInternet/4.-белта-03.jpg",
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/SafeInternet/фишинг-2024.jpg",
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/SafeInternet/7.-бпк-белта.jpg"
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