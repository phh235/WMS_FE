import { createI18n } from "vue-i18n";
import vnMessage from "./vi.json";
import enMessage from "./en.json";

const messages = {
  vi: vnMessage,
  en: enMessage,
};

const i18n = createI18n({
  locale: "vi",
  fallbackLocale: "en",
  messages,
});

export default i18n;
