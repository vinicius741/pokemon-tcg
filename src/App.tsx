import React from "react";
import IntlProviderWrapper from "./IntlProviderWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { PokemonCardsProvider } from "./context/PokemonCardsContext";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App: React.FC = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <IntlProviderWrapper>
                <PokemonCardsProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/details/:id" element={<DetailPage />} />
                    </Routes>
                </PokemonCardsProvider>
            </IntlProviderWrapper>
        </QueryClientProvider>
    );
};

export default App;
