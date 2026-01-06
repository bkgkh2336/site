import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";


const WasteContainersGuide = () => {
    const images = ["/useful_to_know/waste-containers-full.jpg"];

    return (
        <ArticleLayout>
            <H1>Памятка для тех, кто живет в индивидуальных домах и использует по два контейнера для сбора отходов</H1>
            
            <ImageGallery 
                images={images} 
                altPrefix="Памятка для индивидуальных домов с двумя контейнерами"
            />
        </ArticleLayout>
    );
};

export default WasteContainersGuide;