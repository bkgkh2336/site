import { Gallery, Image } from "./styled";

interface ImageGalleryProps {
    images: string[];
    altPrefix?: string;
}

const ImageGallery = ({ images, altPrefix = 'Изображение' }: ImageGalleryProps) => {
    return (
        <Gallery>
            {images.map((image, index) => (
                <Image 
                    key={index}
                    src={image} 
                    alt={`${altPrefix} ${index + 1}`}
                    loading="lazy"
                />
            ))}
        </Gallery>
    );
};

export default ImageGallery;