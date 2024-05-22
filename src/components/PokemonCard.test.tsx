import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import PokemonCard from "./PokemonCard";
import { messages } from "../locales";

const mockCard = {
    id: "xy1-1",
    name: "Venusaur-EX",
    images: {
        small: "https://images.pokemontcg.io/xy1/1.png",
    },
    types: ["Grass"],
};

test("renders PokemonCard component with correct data", () => {
    render(
        <MemoryRouter>
            <IntlProvider locale="en" messages={messages.en}>
                <PokemonCard card={mockCard} />
            </IntlProvider>
        </MemoryRouter>
    );

    const imageElement = screen.getByAltText("Venusaur-EX") as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe("https://images.pokemontcg.io/xy1/1.png");

    expect(screen.getByText("Venusaur-EX")).toBeInTheDocument();

    expect(screen.getByText("ID: xy1-1")).toBeInTheDocument();

    expect(screen.getByText("Type: Grass")).toBeInTheDocument();
});
