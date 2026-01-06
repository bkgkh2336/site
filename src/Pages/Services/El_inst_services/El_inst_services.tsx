import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../../functions";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import ServiceCards from "../../../Components/ServiceCards/ServiceCards";
import ServiceTable from "../../../Components/ServiceTable/ServiceTable";
import ViewToggle from "../../../Components/ViewToggle/ViewToggle";
import { PlugZap, Search, ArrowLeft } from "lucide-react";
import { 
    ElInstContainer, 
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

interface ElInstServiceRaw {
    id: number;
    name: string;
    unit: string;
    price_no_nds: number;
}

interface ElInstServiceTransformed {
    id: number;
    name: string;
    price_no_nds: number;
    unit: string;
}

const El_inst_services = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ElInstServiceTransformed[]>([]);
    const [filteredData, setFilteredData] = useState<ElInstServiceTransformed[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');

    const fetchData = async () => {
        setLoading(true);
        try {
            const data_: ElInstServiceRaw[] = await GetData('el_inst_services');
            setData(data_);
            setFilteredData(data_);
        } catch (error) {
            console.error('Error fetching electrical installation services:', error);
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
        <ElInstContainer>
            <BackButton onClick={() => navigate('/services')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
                Назад к услугам
            </BackButton>
            
            <PageHeader>
                <HeaderIcon>
                    <PlugZap style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>Электромонтажные работы населению</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <PlugZap style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
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
                            Цены настоящего прейскуранта установлены без учета стоимости основных материалов,оборудования, их доставки по месту работы, которые оплачиваются  заказчиком дополнительно по ценам их  приобретения и действующим тарифам на перевозку.
                        </NoticeItem>
                    </NoticeContainer>
                </>
            )}
        </ElInstContainer>
    );
};

export default El_inst_services;