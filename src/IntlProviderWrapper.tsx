import React, { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { messages, Messages } from "./locales";

type Locale = "en" | "pt";

const IntlProviderWrapper: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [locale] = React.useState<Locale>("en");

    return (
        <IntlProvider locale={locale} messages={messages[locale] as Messages}>
            {children}
        </IntlProvider>
    );
};

export default IntlProviderWrapper;
