import { 
    ServicesGrid,
    ServiceCard,
    ServiceNumber,
    ServiceName,
    PriceContainer,
    PriceRow,
    PriceLabel,
    PriceValue,
    CardGlow
} from "./styled";

interface Service {
    id: number;
    name: string;
    price_no_nds: number;
    unit?: string;
}

interface ServiceCardsProps {
    services: Service[];
    priceUnit?: string;
}

const ServiceCards = ({ services, priceUnit }: ServiceCardsProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    return (
        <ServicesGrid>
            {services.map((service, index) => (
                <ServiceCard key={service.id}>
                    <CardGlow />
                    <ServiceNumber>№{index + 1}</ServiceNumber>
                    <ServiceName>{service.name}</ServiceName>
                    <PriceContainer>
                        <PriceRow>
                            <PriceLabel>Без НДС{service.unit ? ` (${service.unit})` : priceUnit ? ` ${priceUnit}` : ''}</PriceLabel>
                            <PriceValue>{formatPrice(service.price_no_nds)} Br</PriceValue>
                        </PriceRow>
                        <PriceRow>
                            <PriceLabel>С НДС (20%){service.unit ? ` (${service.unit})` : priceUnit ? ` ${priceUnit}` : ''}</PriceLabel>
                            <PriceValue $highlight>{formatPrice(service.price_no_nds * 1.2)} Br</PriceValue>
                        </PriceRow>
                    </PriceContainer>
                </ServiceCard>
            ))}
        </ServicesGrid>
    );
};

export default ServiceCards;