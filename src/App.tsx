import React from "react";
import IntlProviderWrapper from "./IntlProviderWrapper";
import { Routes, Route } from "react-router-dom";
import { PokemonCardsProvider } from "./context/PokemonCardsContext";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App: React.FC = () => {
    return (
        <IntlProviderWrapper>
            <PokemonCardsProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/details/:id" element={<DetailPage />} />
                </Routes>
            </PokemonCardsProvider>
        </IntlProviderWrapper>
    );
};

export default App;
