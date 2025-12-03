import { useTranslation } from "react-i18next";

function CeremonyDetails() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-rose-50 to-blush relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold opacity-5 rounded-full -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-gold opacity-5 rounded-full -mr-36 -mb-36"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t("ceremony.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto"></div>
        </div>

        {/* Contenu principal */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Date et heure */}
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 border-l-4 border-rose-gold">
              <p className="text-rose-gold text-sm uppercase tracking-widest font-semibold mb-2">
                {t("ceremony.dataOra")}
              </p>
              <p className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-3">
                {t("ceremony.date")}
              </p>
              <p className="text-2xl font-lora text-gray-700">
                {t("ceremony.time")}
              </p>
            </div>
          </div>

          {/* Localisation */}
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="mb-6">
                <p className="text-rose-gold text-sm uppercase tracking-widest font-semibold mb-3">
                  {t("ceremony.location")}
                </p>
                <h3 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
                  {t("ceremony.venue")}
                </h3>
                <p className="text-lg text-gray-600 font-lora">
                  {t("ceremony.address")}
                  <br />
                  {t("ceremony.city")}
                </p>
              </div>

              {/* Lien Google Maps */}
              <a
                href="https://maps.google.com/?q=Villa+Saporiti+1898+Tradate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rose-gold hover:text-gold font-semibold transition-colors duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t("ceremony.mapLink")}
              </a>
            </div>
          </div>
        </div>

        {/* Programme */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-6 text-center">
            {t("ceremony.program")}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-blush rounded-lg border border-rose-gold border-opacity-30">
              <p className="text-rose-gold uppercase text-sm font-semibold tracking-widest mb-2">
                {t("ceremony.ceremony_label")}
              </p>
              <p className="text-gray-700 font-lora">
                {t("ceremony.ceremony_text")}
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-blush rounded-lg border border-rose-gold border-opacity-30">
              <p className="text-rose-gold uppercase text-sm font-semibold tracking-widest mb-2">
                {t("ceremony.reception_label")}
              </p>
              <p className="text-gray-700 font-lora">
                {t("ceremony.reception_text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CeremonyDetails;
