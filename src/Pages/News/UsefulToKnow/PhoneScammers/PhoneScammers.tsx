import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";


const PhoneScammers = () => {
    const images = [
        "/useful_to_know/phone_scammers1.jpg",
        "/useful_to_know/phone_scammers2.jpg",
        "/useful_to_know/phone_scammers3.jpg",
        "/useful_to_know/phone_scammers4.jpg"
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