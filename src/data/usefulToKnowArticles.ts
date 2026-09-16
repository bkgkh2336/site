export interface UsefulArticle {
    title: string;
    image: string;
    url?: string;
    externalUrl?: string;
}

export const usefulToKnowArticles: UsefulArticle[] = [
    {
        title: "Pomogut BY",
        image: "/useful_to_know/pomogut-by_icon.png",
        url: "pomogut_by"
    },
    {
        title: "Безопасность в сети и банковские карты",
        image: "/useful_to_know/safe-internet_icon.jpg",
        url: "safe_internet_cards"
    },
    {
        title: "Телефонные мошенники",
        image: "/useful_to_know/phone-scammers_icon.jpg",
        url: "phone_scammers"
    },
    {
        title: "Как не попасться на удочку телефонных мошенников?",
        image: "/useful_to_know/phone-scammers__1.jpg",
        url: "phone_scammers_guide"
    },
    {
        title: "Памятка по безопасной эксплуатации бытовых котлов на твердых видах топлива",
        image: "/useful_to_know/boiler_safety_icon.png",
        url: "boiler_safety"
    },
    {
        title: "Памятка по компостированию отходов",
        image: "/useful_to_know/composting-guide_icon.jpg",
        url: "composting_guide"
    },
    {
        title: "Памятка для тех, кто живет в индивидуальных домах и использует по два контейнера для сбора отходов",
        image: "/useful_to_know/waste-containers_icon.jpg",
        url: "waste_containers_guide"
    },
    {
        title: "Памятка по организации вывоза коммунальных отходов для владельцев индивидуального жилищного фонда",
        image: "/useful_to_know/waste-removal-guide_icon.png",
        url: "waste_removal_guide"
    },
    {
        title: "Памятка для тех, у кого во дворах стоят отдельные контейнеры для отходов бумаги, стекла, пластика",
        image: "/useful_to_know/yard-recycling-guide_icon.jpg",
        url: "yard_recycling_guide"
    },
    {
        title: "Памятка по наведению порядка на земельных участках граждан и прилегающих к ним территориях",
        image: "/useful_to_know/landscaping-guide_icon.jpg",
        url: "landscaping_guide"
    },
    {
        title: "Список экстремистких материалов",
        image: "/useful_to_know/forbidden.png",
        externalUrl: "http://mininform.gov.by/documents/respublikanskiy-spisok-ekstremistskikh-materialov/"
    },
    {
        title: "Фишинг",
        image: "/useful_to_know/phishing.png",
        url: "phishing"
    },
    {
        title: "Вишинг",
        image: "/useful_to_know/vishing.jpg",
        url: "vishing"
    },
    {
        title: "Портал государственной службы занятости",
        image: "/useful_to_know/GSZ.png",
        url: "gsz_portal"
    }
];
