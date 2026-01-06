import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";


const PhoneScammers = () => {
    const images = [
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/PhoneScammers/мошеничество-в-сети.jpg",
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/PhoneScammers/внимание-мошенники.jpg",
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/PhoneScammers/-мошенники 1.jpg",
        "https://bkgkh.by/AllObjectsForGKX/ImgGKX/UsefulToKnow/PhoneScammers/вам-звонят.jpg"
    ];

    return (
        <ArticleLayout>
            <H1>Телефонные мошенники</H1>
            
            <ImageGallery 
                images={images} 
                altPrefix="Памятка о телефонных мошенниках"
            />
        </ArticleLayout>
    );
};

export default PhoneScammers;