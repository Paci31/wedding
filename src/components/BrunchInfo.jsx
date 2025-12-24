import { useTranslation } from "react-i18next";

function BrunchInfo() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-champagne via-white to-blush relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full -mr-48 -mt-48 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-50 rounded-full -ml-36 -mb-36 opacity-40"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t("brunch.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto"></div>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gold border-opacity-30">
          <div className="text-center">
            {/* Emoji */}
            <div className="text-6xl mb-6">🥐</div>

            {/* Texte principal */}
            <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
              {t("brunch.subtitle")}
            </h3>

            <p className="text-lg font-lora text-gray-700 mb-6 leading-relaxed">
              {t("brunch.message")}
            </p>

            {/* Détails */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-champagne to-rose-50 rounded-lg p-6 shadow-md">
                <p className="text-rose-gold text-sm uppercase tracking-widest font-semibold mb-2">
                  {t("brunch.date_label")}
                </p>
                <p className="text-2xl font-playfair font-bold text-gray-800">
                  {t("brunch.date")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-champagne to-rose-50 rounded-lg p-6 shadow-md">
                <p className="text-rose-gold text-sm uppercase tracking-widest font-semibold mb-2">
                  {t("brunch.location_label")}
                </p>
                <p className="text-xl font-playfair font-bold text-gray-800">
                  {t("brunch.location")}
                </p>
              </div>
            </div>

            {/* Information sur le coût */}
            <div className="mt-8 bg-gold bg-opacity-10 border-2 border-gold rounded-lg p-6">
              <p className="text-gray-700 font-lora text-lg font-semibold mb-2">
                💰 {t("brunch.cost_note")}
              </p>
            </div>

            {/* Note dans le formulaire RSVP */}
            <div className="mt-6 bg-rose-50 border-2 border-rose-gold rounded-lg p-6">
              <p className="text-gray-700 font-lora text-lg">
                💌 {t("brunch.form_note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrunchInfo;

