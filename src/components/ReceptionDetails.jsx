import { useTranslation } from "react-i18next";

function ReceptionDetails() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blush opacity-40 rounded-full -ml-36 -mb-36"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Message principal */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-rose-gold to-gold text-white px-6 py-3 rounded-full shadow-lg mb-6">
            <p className="text-sm md:text-base uppercase tracking-widest font-semibold">
              Ⓘ {t("reception.rsvpMessage")}
            </p>
          </div>
          <p className="text-2xl md:text-3xl font-lora text-gray-700 leading-relaxed">
            {t("reception.title")}
            <br />
            <span className="text-rose-gold font-semibold">
              {t("reception.deadline")}
            </span>
          </p>
        </div>

        {/* Cartes de contact */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Flavio */}
          <div className="bg-gradient-to-br from-white to-rose-50 rounded-lg shadow-xl p-8 border border-rose-gold border-opacity-20 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center text-white text-2xl font-playfair">
                F
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                Flavio Pacifico
              </h3>
              <a
                href="tel:+41787150479"
                className="inline-flex items-center gap-2 text-rose-gold hover:text-gold font-semibold transition-colors duration-300 mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +41 78 715 04 79
              </a>
              <p className="text-gray-600 font-lora">
                {t("reception.available")}
              </p>
            </div>
          </div>

          {/* Letizia */}
          <div className="bg-gradient-to-br from-white to-blush rounded-lg shadow-xl p-8 border border-rose-gold border-opacity-20 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center text-white text-2xl font-playfair">
                L
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                Letizia Cavaliere
              </h3>
              <a
                href="tel:+41786774050"
                className="inline-flex items-center gap-2 text-rose-gold hover:text-gold font-semibold transition-colors duration-300 mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +41 78 677 40 50
              </a>
              <p className="text-gray-600 font-lora">
                {t("reception.always_happy")}
              </p>
            </div>
          </div>
        </div>

        {/* Alternativa email */}
        <div className="text-center">
          <p className="text-gray-600 font-lora mb-2">
            {t("reception.prefer_email")}
          </p>
          <p className="text-rose-gold font-semibold">
            ✉️ {t("reception.email")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReceptionDetails;
