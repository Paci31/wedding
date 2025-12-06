import { useTranslation } from "react-i18next";

function GiftInfo() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-blush to-rose-50 relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-gold opacity-5 rounded-full -ml-36 -mb-36"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t("gift.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto"></div>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Icône */}
          <div className="text-6xl mb-6">🏝️✈️</div>

          {/* Texte principal */}
          <p className="text-xl font-lora text-gray-700 mb-6 leading-relaxed">
            {t("gift.quote")}
          </p>
          <img
            src="/travellounge_logo.png"
            alt="Logo"
            className="w-1/2 h-1/2 rounded-full object-cover mx-auto"
          />
          <p className="text-gray-600 font-lora text-sm">
            Largo San Crispino, 1 - Parabiago (MI)
          </p>
          <p className="text-gray-600 font-lora text-sm">
            Tel. +39 0331 553758 |{" "}
            <a
              href="mailto:info@travelounge.it"
              className="text-rose-gold hover:text-gold font-semibold transition-colors duration-300">
              info@travelounge.it
            </a>
          </p>
          <br />
          {/* Citation */}
          <div className="border-l-4 border-rose-gold pl-6 py-4 bg-rose-50 rounded-r-lg">
            <p className="italic text-gray-600 font-lora">
              {t("gift.message")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftInfo;
