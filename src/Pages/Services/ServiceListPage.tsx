import { useEffect, useMemo, useState, type ComponentType } from "react";
import { Search, type LucideIcon } from "lucide-react";
import H1 from "../../Components/H1/H1";
import Loading from "../../Components/Loading/Loading";
import ServiceCards from "../../Components/ServiceCards/ServiceCards";
import ServiceTable from "../../Components/ServiceTable/ServiceTable";
import ViewToggle from "../../Components/ViewToggle/ViewToggle";
import {
    ServicePageContainer,
    PageHeader,
    HeaderIcon,
    ViewToggleWrapper,
    SearchContainer,
    SearchInput,
    EmptyState,
    NoticeContainer,
    NoticeItem,
    FilterContainer,
    FilterButton
} from "../../Components/ServicePageComponents";

export interface ServiceNotice {
    text: string;
    green?: boolean;
}

export interface ServiceFilter {
    options: { value: string; label: string }[];
    match: (name: string, value: string) => boolean;
}

export interface ServiceListPageProps<T> {
    title: string;
    icon: LucideIcon;
    load: () => Promise<T[]>;
    searchBy?: (item: T) => string;
    filter?: ServiceFilter;
    priceUnit?: string;
    notices?: ServiceNotice[];
    cards?: ComponentType<{ services: T[]; priceUnit?: string }>;
    table?: ComponentType<{ services: T[]; priceUnit?: string }>;
}

const defaultSearch = <T,>(item: T): string =>
    String((item as { name?: unknown }).name ?? "");

const ServiceListPage = <T,>({
    title,
    icon: Icon,
    load,
    searchBy,
    filter,
    priceUnit,
    notices,
    cards,
    table
}: ServiceListPageProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [filterValue, setFilterValue] = useState('all');

    const getText = searchBy ?? defaultSearch<T>;

    useEffect(() => {
        let alive = true;
        setLoading(true);
        load().then(items => {
            if (alive) setData(items);
        }).catch(error => {
            console.error('Error fetching services:', error);
            if (alive) setData([]);
        }).finally(() => {
            if (alive) setLoading(false);
        });
        return () => {
            alive = false;
        };
    }, [load]);

    const filtered = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return data.filter(item => {
            const text = getText(item);
            if (!text.toLowerCase().includes(term)) return false;
            if (filter && filterValue !== 'all' && !filter.match(text, filterValue)) return false;
            return true;
        });
    }, [data, searchTerm, filterValue, filter, getText]);

    const View = (view === 'cards'
        ? cards ?? ServiceCards
        : table ?? ServiceTable) as ComponentType<{ services: T[]; priceUnit?: string }>;

    return (
        <ServicePageContainer>
            <PageHeader>
                <HeaderIcon>
                    <Icon style={{ width: 40, height: 40, color: '#28a745' }} />
                </HeaderIcon>
                <H1>{title}</H1>
            </PageHeader>

            {loading && <Loading />}

            {!loading && data.length === 0 && (
                <EmptyState>
                    <Icon style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
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

                        {filter && (
                            <FilterContainer>
                                {filter.options.map(option => (
                                    <FilterButton
                                        key={option.value}
                                        $active={filterValue === option.value}
                                        onClick={() => setFilterValue(option.value)}
                                    >
                                        {option.label}
                                    </FilterButton>
                                ))}
                            </FilterContainer>
                        )}

                        <ViewToggle view={view} onViewChange={setView} />
                    </ViewToggleWrapper>

                    <View services={filtered} priceUnit={priceUnit} />

                    {filtered.length === 0 && (
                        <EmptyState>
                            <Search style={{ width: 64, height: 64, opacity: 0.5, color: '#28a745' }} />
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить параметры поиска</p>
                        </EmptyState>
                    )}

                    {notices && notices.length > 0 && (
                        <NoticeContainer>
                            {notices.map((notice, index) => (
                                <NoticeItem key={index} $green={notice.green}>
                                    {notice.text}
                                </NoticeItem>
                            ))}
                        </NoticeContainer>
                    )}
                </>
            )}
        </ServicePageContainer>
    );
};

export default ServiceListPage;
