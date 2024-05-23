import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "../types/PokemonCard";
import { getPokemonCards } from "../services/pokemonService";

interface PokemonCardsContextProps {
    pokemonCards: PokemonCard[];
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
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
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["pokemonCards"],
        queryFn: getPokemonCards,
        refetchOnWindowFocus: false,
    });

    const pokemonCards = data?.data || [];

    return (
        <PokemonCardsContext.Provider
            value={{ pokemonCards, isLoading, isError, refetch }}
        >
            {children}
        </PokemonCardsContext.Provider>
    );
};
