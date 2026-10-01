import { useEffect, useState } from "react";
import { GetData } from "../../../functions";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import ServiceCards from "../../../Components/ServiceCards/ServiceCards";
import ServiceTable from "../../../Components/ServiceTable/ServiceTable";
import ViewToggle from "../../../Components/ViewToggle/ViewToggle";
import { Trash2, Search } from "lucide-react";
import { 
    WasteContainer, 
    PageHeader,
    HeaderIcon,
    EmptyState,
    SearchContainer,
    SearchInput,
    NoticeContainer,
    NoticeItem,
    ViewToggleWrapper,
    FilterContainer,
    FilterButton
} from "./styled";

interface WasteServiceRaw {
    id: number;
    name: string;
    price_no_dns_summer: number;
    price_no_dns_winter: number;
}

interface WasteServiceTransformed {
    id: number;
    name: string;
    price_no_nds: number;
}

const Waste_services = () => {
    const [data, setData] = useState<WasteServiceTransformed[]>([]);
    const [filteredData, setFilteredData] = useState<WasteServiceTransformed[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [seasonFilter, setSeasonFilter] = useState<'all' | 'summer' | 'winter'>('all');

    const fetchData = async () => {
        setLoading(true);
        try {
            const rawData: WasteServiceRaw[] = await GetData('waste_services');
            
            const transformedData: WasteServiceTransformed[] = [];
            rawData.forEach((service) => {
                transformedData.push({
                    id: service.id * 2 - 1,
                    name: `${service.name} (летн. н.)`,
                    price_no_nds: service.price_no_dns_summer
                });
                
                transformedData.push({
                    id: service.id * 2,
                    name: `${service.name} (зимн. н.)`,
                    price_no_nds: service.price_no_dns_winter
                });
            });
            
            setData(transformedData);
            setFilteredData(transformedData);
        } catch (error) {
            console.error('Error fetching waste services:', error);
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

        if (seasonFilter === 'summer') {
            filtered = filtered.filter(service => service.name.includes('(летн. н.)'));
        } else if (seasonFilter === 'winter') {
            filtered = filtered.filter(service => service.name.includes('(зимн. н.)'));
        }

        setFilteredData(filtered);
    }, [searchTerm, seasonFilter, data]);

    return (
        <WasteContainer>
            <PageHeader>
                <HeaderIcon>
                    <Trash2 style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>Услуги по вывозу мусора на полигон собственным транспортом заказчика с последующим захоронением</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <Trash2 style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
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
                                $active={seasonFilter === 'all'} 
                                onClick={() => setSeasonFilter('all')}
                            >
                                Все
                            </FilterButton>
                            <FilterButton 
                                $active={seasonFilter === 'summer'} 
                                onClick={() => setSeasonFilter('summer')}
                            >
                                Лето
                            </FilterButton>
                            <FilterButton 
                                $active={seasonFilter === 'winter'} 
                                onClick={() => setSeasonFilter('winter')}
                            >
                                Зима
                            </FilterButton>
                        </FilterContainer>
                        
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
                        <NoticeItem $isRed>
                            Платные услуги осуществляются согласно письменных заявок заказчика и оплатой за услуги.
                        </NoticeItem>
                    </NoticeContainer>
                </>
            )}
        </WasteContainer>
    );
};

export default Waste_services;
