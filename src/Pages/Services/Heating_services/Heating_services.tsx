import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../../functions";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import ServiceCards from "../../../Components/ServiceCards/ServiceCards";
import ServiceTable from "../../../Components/ServiceTable/ServiceTable";
import ViewToggle from "../../../Components/ViewToggle/ViewToggle";
import { Flame, Search, ArrowLeft } from "lucide-react";
import { 
    HeatingContainer, 
    PageHeader,
    HeaderIcon,
    EmptyState,
    SearchContainer,
    SearchInput,
    NoticeContainer,
    NoticeItem,
    BackButton,
    ViewToggleWrapper
} from "./styled";

interface HeatingServiceRaw {
    id: number;
    name: string;
    unit: string;
    price_no_nds: number;
}

interface HeatingServiceTransformed {
    id: number;
    name: string;
    price_no_nds: number;
    unit: string;
}

const Heating_services = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<HeatingServiceTransformed[]>([]);
    const [filteredData, setFilteredData] = useState<HeatingServiceTransformed[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');

    const fetchData = async () => {
        setLoading(true);
        try {
            const data_: HeatingServiceRaw[] = await GetData('heating_services');
            setData(data_);
            setFilteredData(data_);
        } catch (error) {
            console.error('Error fetching heating services:', error);
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
        <HeatingContainer>
            <BackButton onClick={() => navigate('/services')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
                Назад к услугам
            </BackButton>
            
            <PageHeader>
                <HeaderIcon>
                    <Flame style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>Услуги по отоплению населению</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <Flame style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
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
                        <ServiceCards services={filteredData} />
                    ) : (
                        <ServiceTable services={filteredData} showUnitColumn={true} />
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
                            Цены настоящего прейскуранта установлены без учета стоимости основных материалов оборудования, их доставки к месту работы, которые оплачиваются заказчиком дополнительно по ценам их приобретения и действующим тарифом на перевозку. 
                        </NoticeItem>
                    </NoticeContainer>
                </>
            )}
        </HeatingContainer>
    );
};

export default Heating_services;