import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../../functions";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import ServiceCards from "../../../Components/ServiceCards/ServiceCards";
import ServiceTable from "../../../Components/ServiceTable/ServiceTable";
import ViewToggle from "../../../Components/ViewToggle/ViewToggle";
import { Sprout, Search, ArrowLeft } from "lucide-react";
import { 
    GrassContainer, 
    PageHeader,
    HeaderIcon,
    EmptyState,
    SearchContainer,
    SearchInput,
    NoticeContainer,
    NoticeItem,
    BackButton,
    ViewToggleWrapper,
    FilterContainer,
    FilterButton
} from "./styled";

interface GrassServiceRaw {
    id: number;
    name: string;
    price_no_nds_is_solid: number;
    price_no_nds_no_solid: number;
}

interface GrassServiceTransformed {
    id: number;
    name: string;
    price_no_nds: number;
}

const Grass_services = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<GrassServiceTransformed[]>([]);
    const [filteredData, setFilteredData] = useState<GrassServiceTransformed[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [lawnFilter, setLawnFilter] = useState<'all' | 'solid' | 'combined'>('all');

    const fetchData = async () => {
        setLoading(true);
        try {
            const rawData: GrassServiceRaw[] = await GetData('grass_services');
            
            const transformedData: GrassServiceTransformed[] = [];
            rawData.forEach((service) => {
                transformedData.push({
                    id: service.id * 2 - 1,
                    name: `${service.name} (сплошной газон)`,
                    price_no_nds: service.price_no_nds_is_solid
                });
                
                transformedData.push({
                    id: service.id * 2,
                    name: `${service.name} (комбинированный)`,
                    price_no_nds: service.price_no_nds_no_solid
                });
            });
            
            setData(transformedData);
            setFilteredData(transformedData);
        } catch (error) {
            console.error('Error fetching grass services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = data.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (lawnFilter === 'solid') {
            filtered = filtered.filter(service => service.name.includes('(сплошной газон)'));
        } else if (lawnFilter === 'combined') {
            filtered = filtered.filter(service => service.name.includes('(комбинированный)'));
        }

        setFilteredData(filtered);
    }, [searchTerm, lawnFilter, data]);

    return (
        <GrassContainer>
            <BackButton onClick={() => navigate('/services')}>
                <ArrowLeft style={{ width: 20, height: 20 }} />
                Назад к услугам
            </BackButton>
            
            <PageHeader>
                <HeaderIcon>
                    <Sprout style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>Услуги по скашиванию травы (сплошных и комбинированных газонов) ручным моторизированным инструментом</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <Sprout style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
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
                        <FilterContainer>
                            <FilterButton 
                                $active={lawnFilter === 'all'} 
                                onClick={() => setLawnFilter('all')}
                            >
                                Все
                            </FilterButton>
                            <FilterButton 
                                $active={lawnFilter === 'solid'} 
                                onClick={() => setLawnFilter('solid')}
                            >
                                Сплошной
                            </FilterButton>
                            <FilterButton 
                                $active={lawnFilter === 'combined'} 
                                onClick={() => setLawnFilter('combined')}
                            >
                                Комбинированный
                            </FilterButton>
                        </FilterContainer>
                        
                        <ViewToggle view={view} onViewChange={setView} />
                    </ViewToggleWrapper>

                    {view === 'cards' ? (
                        <ServiceCards services={filteredData} priceUnit="(за 100 м²)" />
                    ) : (
                        <ServiceTable services={filteredData} priceUnit="(за 100 м²)" />
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
                            Дополнительные платные услуги осуществляются по заявительному принципу, согласно письменному заявлению заказчика, зарегистрированного в приемной КЖУП "Буда-Кошелевский коммунальник", подписанного руководителем предприятия и оплатой за услугу. 
                        </NoticeItem>
                    </NoticeContainer>
                </>
            )}
        </GrassContainer>
    );
};

export default Grass_services;