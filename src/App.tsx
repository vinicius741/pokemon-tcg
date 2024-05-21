import React from "react";
import { Routes, Route } from "react-router-dom";
import { PokemonCardsProvider } from "./context/PokemonCardsContext";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App: React.FC = () => {
    return (
        <PokemonCardsProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/details/:id" element={<DetailPage />} />
            </Routes>
        </PokemonCardsProvider>
    );
};

export default App;
