import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../../functions";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import ViewToggle from "../../../Components/ViewToggle/ViewToggle";
import { Truck, Search, ArrowLeft } from "lucide-react";
import { 
    TransportContainer, 
    PageHeader,
    HeaderIcon,
    EmptyState,
    SearchContainer,
    SearchInput,
    NoticeContainer,
    NoticeItem,
    BackButton,
    ViewToggleWrapper,
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
} from "./styled";

interface TransportType {
    id: number;
    name: string;
}

interface TransportPrice {
    id: number;
    id_transport: number;
    unit: string;
    price_no_nds: number;
}

interface PriceVariant {
    unit: string;
    price_no_nds: number;
}

interface TransportServiceGrouped {
    id: number;
    name: string;
    variants: PriceVariant[];
}

// Компонент для карточек
const TransportServiceCards = ({ services }: { services: TransportServiceGrouped[] }) => {
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
};

// Компонент для таблицы
const TransportServiceTable = ({ services }: { services: TransportServiceGrouped[] }) => {
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
};

const Transport_services = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<TransportServiceGrouped[]>([]);
    const [filteredData, setFilteredData] = useState<TransportServiceGrouped[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');

    const fetchData = async () => {
        setLoading(true);
        try {
            // Получаем данные из обеих таблиц
            const transportTypes: TransportType[] = await GetData('transport_population_and_budget');
            const transportPrices: TransportPrice[] = await GetData('transport_price_population_and_budget');
            
            // Проверяем, что данные загрузились
            if (!transportTypes || !transportPrices) {
                console.error('Failed to load transport data');
                setData([]);
                setFilteredData([]);
                return;
            }
            
            // Группируем данные по типу транспорта
            const grouped: TransportServiceGrouped[] = transportTypes.map(transport => {
                const prices = transportPrices.filter(price => price.id_transport === transport.id);
                return {
                    id: transport.id,
                    name: transport.name,
                    variants: prices.map(price => ({
                        unit: price.unit,
                        price_no_nds: price.price_no_nds
                    }))
                };
            }).filter(transport => transport.variants.length > 0); // Только транспорт с ценами
            
            setData(grouped);
            setFilteredData(grouped);
        } catch (error) {
            console.error('Error fetching transport services:', error);
            setData([]);
            setFilteredData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    return (
        <TransportContainer>
            <BackButton onClick={() => navigate('/services')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
                Назад к услугам
            </BackButton>
            
            <PageHeader>
                <HeaderIcon>
                    <Truck style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>Транспортные услуги населению и бюджетным организациям</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <Truck style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
                    <h3>Услуги не найдены</h3>
                    <p>В данный момент список услуг пуст</p>
                </EmptyState>
            )}

            {!loading && data.length > 0 && (
                <>
                    <ViewToggleWrapper>
                        <SearchContainer>
                            <Search style={{ width: 20, height: 20, color: '#28a745' }} />
                            <SearchInput
                                type="text"
                                placeholder="Поиск услуг..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </SearchContainer>
                        
                        <ViewToggle view={view} onViewChange={setView} />
                    </ViewToggleWrapper>

                    {view === 'cards' ? (
                        <TransportServiceCards services={filteredData} />
                    ) : (
                        <TransportServiceTable services={filteredData} />
                    )}

                    {filteredData.length === 0 && (
                        <EmptyState>
                            <Search style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить параметры поиска</p>
                        </EmptyState>
                    )}

                    <NoticeContainer>
                        <NoticeItem>
                            Транспортные услуги оказываются на основании письменной заявки заказчика и оплаты с предоставлением квитанции об оплате.
                        </NoticeItem>
                    </NoticeContainer>
                </>
            )}
        </TransportContainer>
    );
};

export default Transport_services;