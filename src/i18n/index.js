import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frTranslation from "./locales/fr.json";
import itTranslation from "./locales/it.json";

// Détection automatique de la langue du navigateur
const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;

  // Si la langue du navigateur commence par 'it', utilise l'italien
  if (browserLang.startsWith("it")) {
    return "it";
  }

  // Sinon, utilise le français par défaut
  return "fr";
};

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: frTranslation },
    it: { translation: itTranslation },
  },
  lng: getBrowserLanguage(),
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
