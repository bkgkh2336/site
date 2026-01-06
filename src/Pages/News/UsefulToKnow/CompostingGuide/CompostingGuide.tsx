import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";

const CompostingGuide = () => {
    const images = ["/useful_to_know/composting-guide.jpg"];

    return (
        <ArticleLayout>
            <H1>Памятка по компостированию отходов</H1>
            
            <ImageGallery 
                images={images} 
                altPrefix="Памятка по компостированию отходов"
            />
        </ArticleLayout>
    );
};

export default CompostingGuide;