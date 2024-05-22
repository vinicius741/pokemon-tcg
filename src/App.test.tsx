import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { messages } from "./locales";
import { IntlProvider } from "react-intl";
import { PokemonCardsProvider } from "./context/PokemonCardsContext";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

// Mock de dados para os testes
const mockPokemonCards = [
    {
        id: "xy1-1",
        name: "Venusaur-EX",
        images: {
            small: "https://images.pokemontcg.io/xy1/1.png",
        },
        types: ["Grass"],
    },
];

// Mock do contexto para fornecer dados simulados
jest.mock("./context/PokemonCardsContext", () => {
    const originalModule = jest.requireActual("./context/PokemonCardsContext");
    return {
        ...originalModule,
        usePokemonCards: () => ({
            pokemonCards: mockPokemonCards,
        }),
    };
});

test("renders HomePage component when on the root path", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <PokemonCardsProvider>
                <IntlProvider locale="en" messages={messages.en}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/details/:id" element={<DetailPage />} />
                    </Routes>
                </IntlProvider>
            </PokemonCardsProvider>
        </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
    expect(screen.getByText("Venusaur-EX")).toBeInTheDocument();
});

test("renders DetailPage component when on the details path", () => {
    render(
        <MemoryRouter initialEntries={["/details/xy1-1"]}>
            <PokemonCardsProvider>
                <IntlProvider locale="en" messages={messages.en}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/details/:id" element={<DetailPage />} />
                    </Routes>
                </IntlProvider>
            </PokemonCardsProvider>
        </MemoryRouter>
    );

    expect(screen.getByText("Venusaur-EX")).toBeInTheDocument();
    expect(screen.getByText("ID: xy1-1")).toBeInTheDocument();
    expect(screen.getByText("Type: Grass")).toBeInTheDocument();
});
