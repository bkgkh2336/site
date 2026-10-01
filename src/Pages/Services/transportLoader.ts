import { GetData } from "../../functions";

export interface TransportService {
    id: number;
    name: string;
    variants: { unit: string; price_no_nds: number }[];
}

interface TransportType {
    id: number;
    name: string;
}

interface TransportPriceRaw {
    id_transport: number;
    unit: string;
    price_no_nds?: number;
    price?: number;
}

export const loadTransport = (typesEndpoint: string, pricesEndpoint: string) =>
    async (): Promise<TransportService[]> => {
        const types: TransportType[] = await GetData(typesEndpoint);
        const prices: TransportPriceRaw[] = await GetData(pricesEndpoint);
        if (!types || !prices) return [];
        return types
            .map(transport => ({
                id: transport.id,
                name: transport.name,
                variants: prices
                    .filter(price => price.id_transport === transport.id)
                    .map(price => ({
                        unit: price.unit,
                        price_no_nds: price.price_no_nds ?? price.price ?? 0
                    }))
            }))
            .filter(transport => transport.variants.length > 0);
    };
