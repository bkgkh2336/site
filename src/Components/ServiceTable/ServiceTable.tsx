import { 
    TableContainer,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableCell
} from "./styled";

interface Service {
    id: number;
    name: string;
    price_no_nds: number;
    unit?: string;
}

interface ServiceTableProps {
    services: Service[];
    priceUnit?: string;
    showUnitColumn?: boolean;
}

const ServiceTable = ({ services, priceUnit, showUnitColumn = false }: ServiceTableProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>№</TableHeaderCell>
                        <TableHeaderCell>Наименование услуги</TableHeaderCell>
                        {showUnitColumn && <TableHeaderCell>Ед. изм.</TableHeaderCell>}
                        <TableHeaderCell>Цена без НДС{!showUnitColumn && priceUnit ? ` ${priceUnit}` : ''} (Br)</TableHeaderCell>
                        <TableHeaderCell>Цена с НДС 20%{!showUnitColumn && priceUnit ? ` ${priceUnit}` : ''} (Br)</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {services.map((service, index) => (
                        <TableRow key={service.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{service.name}</TableCell>
                            {showUnitColumn && <TableCell>{service.unit || '-'}</TableCell>}
                            <TableCell>{formatPrice(service.price_no_nds)}</TableCell>
                            <TableCell $highlight>{formatPrice(service.price_no_nds * 1.2)}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default ServiceTable;