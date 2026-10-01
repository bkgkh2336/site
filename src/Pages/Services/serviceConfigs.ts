import { Wind, Zap, PlugZap, Flame, Droplet, Trash2, Sprout, Truck } from "lucide-react";
import { GetData } from "../../functions";
import type { ServiceListPageProps, ServiceNotice } from "./ServiceListPage";
import { loadTransport } from "./transportLoader";
import { TransportCards, TransportTable } from "./TransportView";
import type { TransportService } from "./transportLoader";

interface SimpleService {
    id: number;
    name: string;
    price_no_nds: number;
}

interface WasteServiceRaw {
    id: number;
    name: string;
    price_no_dns_summer: number;
    price_no_dns_winter: number;
}

interface GrassServiceRaw {
    id: number;
    name: string;
    price_no_nds_is_solid: number;
    price_no_nds_no_solid: number;
}

const loadSimple = (endpoint: string) =>
    async (): Promise<SimpleService[]> => (await GetData(endpoint)) as SimpleService[];

const loadWaste = async (): Promise<SimpleService[]> => {
    const raw = (await GetData('waste_services')) as WasteServiceRaw[];
    return raw.flatMap(service => [
        { id: service.id * 2 - 1, name: `${service.name} (летн. н.)`, price_no_nds: service.price_no_dns_summer },
        { id: service.id * 2, name: `${service.name} (зимн. н.)`, price_no_nds: service.price_no_dns_winter }
    ]);
};

const loadGrass = async (): Promise<SimpleService[]> => {
    const raw = (await GetData('grass_services')) as GrassServiceRaw[];
    return raw.flatMap(service => [
        { id: service.id * 2 - 1, name: `${service.name} (сплошной газон)`, price_no_nds: service.price_no_nds_is_solid },
        { id: service.id * 2, name: `${service.name} (комбинированный)`, price_no_nds: service.price_no_nds_no_solid }
    ]);
};

const NOTICE_PRICE_LIST = 'Прейскурант составлен согласно расчетам, калькуляциям, данным по транспортным  средствам и их техническим характеристикам, нормам расхода топлива, утвержденных действующими нормативными документами в Республике Беларусь.';
const NOTICE_BY_REQUEST = 'Транспортные услуги оказываются на основании письменной заявки заказчика и оплаты с предоставлением квитанции об оплате.';

const ventilation: ServiceListPageProps<SimpleService> = {
    title: 'Услуги вентиляционных и дымовых каналов',
    icon: Wind,
    load: loadSimple('ventilation_services'),
    notices: [
        { text: 'Транспортные услуги (при выезде к месту оказания услуги) осуществляются, согласно действующему прейскуранту, маршрутным картам, виду (марке транспортного средства).' },
        { text: 'Платные услуги оказываются на основании письменной заявки заказчика и оплаты с предоставлением квитанции об оплате.' }
    ]
};

const electro: ServiceListPageProps<SimpleService> = {
    title: 'Услуги по электрофизическим измерениям, оказываемым населению измерительной лабораторией энергетической службы',
    icon: Zap,
    load: loadSimple('electro_services'),
    notices: [
        { text: 'Платные услуги осуществляются согласно письменных заявок заказчика и оплатой за услуги.' }
    ]
};

const elInst: ServiceListPageProps<SimpleService> = {
    title: 'Электромонтажные работы населению',
    icon: PlugZap,
    load: loadSimple('el_inst_services'),
    notices: [
        { text: 'Цены настоящего прейскуранта установлены без учета стоимости основных материалов,оборудования, их доставки по месту работы, которые оплачиваются  заказчиком дополнительно по ценам их  приобретения и действующим тарифам на перевозку.' }
    ]
};

const heating: ServiceListPageProps<SimpleService> = {
    title: 'Услуги по отоплению населению',
    icon: Flame,
    load: loadSimple('heating_services'),
    notices: [
        { text: 'Цены настоящего прейскуранта установлены без учета стоимости основных материалов оборудования, их доставки к месту работы, которые оплачиваются заказчиком дополнительно по ценам их приобретения и действующим тарифом на перевозку.' }
    ]
};

const plumbing: ServiceListPageProps<SimpleService> = {
    title: 'Услуги по водопроводу и канализации населению',
    icon: Droplet,
    load: loadSimple('plumbing_services'),
    notices: [
        { text: 'Цены настоящего прейскуранта установлены без учета стоимости основных материалов, оборудования, их доставки по месту работы, которые оплачиваются заказчиком дополнительно по ценам их приобретения и действующим тарифом на перевозку.' }
    ]
};

const waste: ServiceListPageProps<SimpleService> = {
    title: 'Услуги по вывозу мусора на полигон собственным транспортом заказчика с последующим захоронением',
    icon: Trash2,
    load: loadWaste,
    filter: {
        options: [
            { value: 'all', label: 'Все' },
            { value: 'summer', label: 'Лето' },
            { value: 'winter', label: 'Зима' }
        ],
        match: (name, value) => name.includes(value === 'summer' ? '(летн. н.)' : '(зимн. н.)')
    },
    notices: [
        { text: 'Платные услуги осуществляются согласно письменных заявок заказчика и оплатой за услуги.' }
    ]
};

const grass: ServiceListPageProps<SimpleService> = {
    title: 'Услуги по скашиванию травы (сплошных и комбинированных газонов) ручным моторизированным инструментом',
    icon: Sprout,
    load: loadGrass,
    priceUnit: '(за 100 м²)',
    filter: {
        options: [
            { value: 'all', label: 'Все' },
            { value: 'solid', label: 'Сплошной' },
            { value: 'combined', label: 'Комбинированный' }
        ],
        match: (name, value) => name.includes(value === 'solid' ? '(сплошной газон)' : '(комбинированный)')
    },
    notices: [
        {
            text: 'Дополнительные платные услуги осуществляются по заявительному принципу, согласно письменному заявлению заказчика, зарегистрированного в приемной КЖУП "Буда-Кошелевский коммунальник", подписанного руководителем предприятия и оплатой за услугу.',
            green: true
        }
    ]
};

const transportNotices: ServiceNotice[] = [{ text: NOTICE_BY_REQUEST }];

const transport: ServiceListPageProps<TransportService> = {
    title: 'Транспортные услуги населению и бюджетным организациям',
    icon: Truck,
    load: loadTransport('transport_population_and_budget', 'transport_price_population_and_budget'),
    cards: TransportCards,
    table: TransportTable,
    notices: transportNotices
};

const transportJur: ServiceListPageProps<TransportService> = {
    title: 'Транспортные услуги для юридических лиц',
    icon: Truck,
    load: loadTransport('transport_jur', 'transport_price_jur'),
    cards: TransportCards,
    table: TransportTable,
    notices: [
        { text: NOTICE_PRICE_LIST },
        { text: 'Дополнительные платные (транспортные) услуги осуществляются по заявительному принципу, согласно письменному заявлению заказчика, зарегистрированного в приемной КЖУП "Буда-Кошелевский коммунальник" и подписанного руководителем предприятия.' }
    ]
};

const transportOther: ServiceListPageProps<TransportService> = {
    title: 'Прочие транспортные услуги',
    icon: Truck,
    load: loadTransport('transport_other', 'transport_price_other'),
    cards: TransportCards,
    table: TransportTable,
    notices: [
        { text: NOTICE_BY_REQUEST },
        { text: NOTICE_PRICE_LIST }
    ]
};

export const serviceConfigs = {
    ventilation,
    electro,
    elInst,
    heating,
    plumbing,
    waste,
    grass,
    transport,
    transportJur,
    transportOther
};
