import { type TransportService } from "./transportLoader";
import {
    ServicesGrid,
    ServiceCard,
    ServiceNumber,
    ServiceName,
    PriceContainer,
    PriceRow,
    PriceLabel,
    PriceValue,
    CardGlow,
    TableContainer,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableCell
} from "./transportStyles";

const formatPrice = (price: number) =>
    new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);

export const TransportCards = ({ services }: { services: TransportService[] }) => (
    <ServicesGrid>
        {services.map((service, index) => (
            <ServiceCard key={service.id}>
                <CardGlow />
                <ServiceNumber>№{index + 1}</ServiceNumber>
                <ServiceName>{service.name}</ServiceName>
                <PriceContainer>
                    {service.variants.map((variant, variantIndex) => (
                        <div key={variantIndex} style={{ marginBottom: variantIndex < service.variants.length - 1 ? '12px' : '0' }}>
                            <PriceRow>
                                <PriceLabel>Без НДС ({variant.unit})</PriceLabel>
                                <PriceValue>{formatPrice(variant.price_no_nds)} Br</PriceValue>
                            </PriceRow>
                            <PriceRow>
                                <PriceLabel>С НДС 20% ({variant.unit})</PriceLabel>
                                <PriceValue $highlight>{formatPrice(variant.price_no_nds * 1.2)} Br</PriceValue>
                            </PriceRow>
                        </div>
                    ))}
                </PriceContainer>
            </ServiceCard>
        ))}
    </ServicesGrid>
);

export const TransportTable = ({ services }: { services: TransportService[] }) => (
    <TableContainer>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>№</TableHeaderCell>
                    <TableHeaderCell>Наименование транспорта</TableHeaderCell>
                    <TableHeaderCell>Ед. изм.</TableHeaderCell>
                    <TableHeaderCell>Цена без НДС (Br)</TableHeaderCell>
                    <TableHeaderCell>Цена с НДС 20% (Br)</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <tbody>
                {services.map((service, index) => (
                    service.variants.map((variant, variantIndex) => (
                        <TableRow
                            key={`${service.id}-${variantIndex}`}
                            data-group-id={service.id}
                            onMouseEnter={() => {
                                const rows = document.querySelectorAll(`tr[data-group-id="${service.id}"]`);
                                rows.forEach(row => row.classList.add('group-hover'));
                            }}
                            onMouseLeave={() => {
                                const rows = document.querySelectorAll(`tr[data-group-id="${service.id}"]`);
                                rows.forEach(row => row.classList.remove('group-hover'));
                            }}
                        >
                            {variantIndex === 0 && (
                                <>
                                    <TableCell rowSpan={service.variants.length}>{index + 1}</TableCell>
                                    <TableCell rowSpan={service.variants.length}>{service.name}</TableCell>
                                </>
                            )}
                            <TableCell>{variant.unit}</TableCell>
                            <TableCell>{formatPrice(variant.price_no_nds)}</TableCell>
                            <TableCell $highlight>{formatPrice(variant.price_no_nds * 1.2)}</TableCell>
                        </TableRow>
                    ))
                ))}
            </tbody>
        </Table>
    </TableContainer>
);
