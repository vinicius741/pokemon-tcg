import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import { PokemonCard } from "../types/PokemonCard";
import { getPokemonCards } from "../services/pokemonService";

interface PokemonCardsContextProps {
    pokemonCards: PokemonCard[];
    setPokemonCards: React.Dispatch<React.SetStateAction<PokemonCard[]>>;
    fetchPokemonCards: () => Promise<void>;
}

const PokemonCardsContext = createContext<PokemonCardsContextProps | undefined>(
    undefined
);

export const usePokemonCards = (): PokemonCardsContextProps => {
    const context = useContext(PokemonCardsContext);
    if (!context) {
        throw new Error(
            "usePokemonCards must be used within a PokemonCardsProvider"
        );
    }
    return context;
};

export const PokemonCardsProvider = ({ children }: { children: ReactNode }) => {
    const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([]);

    const fetchPokemonCards = async () => {
        const data = await getPokemonCards();
        setPokemonCards(data.data);
    };

    useEffect(() => {
        fetchPokemonCards();
    }, []);

    return (
        <PokemonCardsContext.Provider
            value={{ pokemonCards, setPokemonCards, fetchPokemonCards }}
        >
            {children}
        </PokemonCardsContext.Provider>
    );
};
