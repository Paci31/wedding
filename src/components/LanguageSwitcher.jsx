import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2 bg-white rounded-full shadow-lg p-1">
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-4 py-2 rounded-full font-raleway font-semibold transition-all duration-300 text-sm md:text-base ${
          i18n.language === "fr"
            ? "bg-rose-gold text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`}>
        Français
      </button>
      <button
        onClick={() => changeLanguage("it")}
        className={`px-4 py-2 rounded-full font-raleway font-semibold transition-all duration-300 text-sm md:text-base ${
          i18n.language === "it"
            ? "bg-rose-gold text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`}>
        Italiano
      </button>
    </div>
  );
}

export default LanguageSwitcher;
