export interface Attack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

export interface Weakness {
    type: string;
    value: string;
}

export interface Set {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
        unlimited: string;
        expanded: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
        symbol: string;
        logo: string;
    };
}

export interface Image {
    small: string;
    large: string;
}

export interface Tcgplayer {
    url: string;
    updatedAt: string;
    prices: {
        holofoil: {
            low: number;
            mid: number;
            high: number;
            market: number;
            directLow: number;
        };
    };
}

export interface Resistance {
    type: string;
    value: string;
}


export interface PokemonCard {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: string[];
    evolvesTo?: string[];
    rules?: string[];
    attacks: Attack[];
    weaknesses: Weakness[];
    resistances?: Resistance[];
    retreatCost?: string[];
    convertedRetreatCost: number;
    set: Set;
    number: string;
    artist: string;
    rarity: string;
    nationalPokedexNumbers: number[];
    legalities: {
        unlimited: string;
        expanded: string;
    };
    images: Image;
    tcgplayer: Tcgplayer;
}
