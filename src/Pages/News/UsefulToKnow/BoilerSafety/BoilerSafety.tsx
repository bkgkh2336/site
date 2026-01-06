import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";

const BoilerSafety = () => {
    const images = [
        "/useful_to_know/boiler_safety_1.png",
        "/useful_to_know/boiler_safety_2.png"
    ];

    return (
        <ArticleLayout>
            <H1>
                Памятка по безопасной эксплуатации бытовых котлов на твердых видах топлива
            </H1>
            
            <ImageGallery 
                images={images} 
                altPrefix="Памятка по безопасной эксплуатации бытовых котлов"
            />
        </ArticleLayout>
    );
};

export default BoilerSafety;