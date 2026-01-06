import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../../functions";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import ServiceCards from "../../../Components/ServiceCards/ServiceCards";
import ServiceTable from "../../../Components/ServiceTable/ServiceTable";
import ViewToggle from "../../../Components/ViewToggle/ViewToggle";
import { Wind, Search, ArrowLeft } from "lucide-react";
import { 
    VentilationContainer, 
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

interface Ventilation_services_props {
    id: number;
    name: string;
    price_no_nds: number;
}

const Ventilation_services = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Ventilation_services_props[]>([]);
    const [filteredData, setFilteredData] = useState<Ventilation_services_props[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');

    const fetchData = async () => {
        setLoading(true);
        try {
            const data_ = await GetData('ventilation_services');
            setData(data_);
            setFilteredData(data_);
        } catch (error) {
            console.error('Error fetching ventilation services:', error);
        } finally {
            setLoading(false)
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
        <VentilationContainer>
            <BackButton onClick={() => navigate('/services')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
                Назад к услугам
            </BackButton>
            
            <PageHeader>
                <HeaderIcon>
                    <Wind style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>Услуги вентиляционных и дымовых каналов</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <Wind style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
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
                        <ServiceTable services={filteredData} />
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
                            Транспортные услуги (при выезде к месту оказания услуги) осуществляются, согласно действующему прейскуранту, маршрутным картам, виду (марке транспортного средства).
                        </NoticeItem>
                        <NoticeItem>
                            Платные услуги оказываются на основании письменной заявки заказчика и оплаты с предоставлением квитанции об оплате.
                        </NoticeItem>
                    </NoticeContainer>
                </>
            )}
        </VentilationContainer>
    );
};

export default Ventilation_services;