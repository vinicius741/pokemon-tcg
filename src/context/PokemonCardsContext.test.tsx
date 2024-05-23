import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonCardsProvider, usePokemonCards } from "./PokemonCardsContext";
import { getPokemonCards } from "../services/pokemonService";

jest.mock("../services/pokemonService");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

const TestComponent = () => {
    const { pokemonCards, isLoading, isError } = usePokemonCards();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <div>
            {pokemonCards.map((card) => (
                <div key={card.id}>{card.name}</div>
            ))}
        </div>
    );
};

describe("PokemonCardsContext", () => {
    it("handles error state", async () => {
        (getPokemonCards as jest.Mock).mockRejectedValue(
            new Error("Failed to fetch")
        );

        render(
            <QueryClientProvider client={queryClient}>
                <PokemonCardsProvider>
                    <TestComponent />
                </PokemonCardsProvider>
            </QueryClientProvider>
        );

        expect(await screen.findByText("Loading...")).toBeInTheDocument();

        expect(await screen.findByText("Error")).toBeInTheDocument();
    });
});
