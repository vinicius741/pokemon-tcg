import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import IntlProviderWrapper from "./IntlProviderWrapper";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <IntlProviderWrapper>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/details/:id" element={<DetailPage />} />
                </Routes>
            </IntlProviderWrapper>
        </Provider>
    );
};

export default App;
