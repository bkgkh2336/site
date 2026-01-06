import H1 from "../../../../Components/H1/H1";
import ArticleLayout from "../../../../Components/ArticleLayout/ArticleLayout";
import ImageGallery from "../../../../Components/ImageGallery/ImageGallery";


const YardRecyclingGuide = () => {
    const images = ["/useful_to_know/yard-recycling-guide.jpg"];

    return (
        <ArticleLayout>
            <H1>Памятка для тех, у кого во дворах стоят отдельные контейнеры для отходов бумаги, стекла, пластика</H1>
            
            <ImageGallery 
                images={images} 
                altPrefix="Памятка по раздельному сбору отходов во дворах"
            />
        </ArticleLayout>
    );
};

export default YardRecyclingGuide;