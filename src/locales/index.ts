import enMessages from "./en.json"
import ptMessages from "./pt.json"

export const messages = {
    en: enMessages,
    pt: ptMessages,
};

export type Messages = typeof enMessages;