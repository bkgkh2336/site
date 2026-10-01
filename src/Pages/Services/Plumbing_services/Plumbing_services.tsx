import { useEffect, useState } from "react";
import { GetData } from "../../../functions";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import ServiceCards from "../../../Components/ServiceCards/ServiceCards";
import ServiceTable from "../../../Components/ServiceTable/ServiceTable";
import ViewToggle from "../../../Components/ViewToggle/ViewToggle";
import { Droplet, Search } from "lucide-react";
import { 
    PlumbingContainer, 
    PageHeader,
    HeaderIcon,
    EmptyState,
    SearchContainer,
    SearchInput,
    NoticeContainer,
    NoticeItem,
    ViewToggleWrapper
} from "./styled";

interface PlumbingServiceRaw {
    id: number;
    name: string;
    unit: string;
    price_no_nds: number;
}

interface PlumbingServiceTransformed {
    id: number;
    name: string;
    price_no_nds: number;
    unit: string;
}

const Plumbing_services = () => {
    const [data, setData] = useState<PlumbingServiceTransformed[]>([]);
    const [filteredData, setFilteredData] = useState<PlumbingServiceTransformed[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');

    const fetchData = async () => {
        setLoading(true);
        try {
            const data_: PlumbingServiceRaw[] = await GetData('plumbing_services');
            setData(data_);
            setFilteredData(data_);
        } catch (error) {
            console.error('Error fetching plumbing services:', error);
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
        <PlumbingContainer>
            <PageHeader>
                <HeaderIcon>
                    <Droplet style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>Услуги по водопроводу и канализации населению</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <Droplet style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
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
                            Цены настоящего прейскуранта установлены без учета стоимости основных материалов, оборудования, их доставки по месту работы, которые оплачиваются заказчиком дополнительно по ценам их приобретения и действующим тарифом на перевозку.
                        </NoticeItem>
                    </NoticeContainer>
                </>
            )}
        </PlumbingContainer>
    );
};

export default Plumbing_services;
