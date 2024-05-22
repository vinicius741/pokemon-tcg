import React from "react";
import { PokemonCardsProvider } from "./context/PokemonCardsContext";
import IntlProviderWrapper from "./IntlProviderWrapper";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App: React.FC = () => {
    return (
        <PokemonCardsProvider>
            <IntlProviderWrapper>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/details/:id" element={<DetailPage />} />
                </Routes>
            </IntlProviderWrapper>
        </PokemonCardsProvider>
    );
};

export default App;
