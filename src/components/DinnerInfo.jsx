import { useTranslation } from "react-i18next";

function DinnerInfo() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-50 rounded-full -ml-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blush rounded-full -mr-36 -mb-36 opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t("dinner.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto"></div>
        </div>

        {/* Contenu */}
        <div className="bg-gradient-to-br from-gray-50 to-rose-50 rounded-2xl shadow-xl p-8 md:p-12 border border-rose-gold border-opacity-20">
          <div className="text-center">
            {/* Icône */}
            <div className="text-6xl mb-6">🍝🌅</div>
            
            {/* Texte principal */}
            <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
              {t("dinner.subtitle")}
            </h3>
            
            <p className="text-lg font-lora text-gray-700 mb-6 leading-relaxed">
              {t("dinner.message")}
            </p>

            {/* Détails */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-rose-gold text-sm uppercase tracking-widest font-semibold mb-2">
                  {t("dinner.date_label")}
                </p>
                <p className="text-2xl font-playfair font-bold text-gray-800">
                  {t("dinner.date")}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-rose-gold text-sm uppercase tracking-widest font-semibold mb-2">
                  {t("dinner.location_label")}
                </p>
                <p className="text-2xl font-playfair font-bold text-gray-800">
                  Stresa
                </p>
              </div>
            </div>

            {/* Note dans le formulaire RSVP */}
            <div className="mt-8 bg-rose-50 border-2 border-rose-gold rounded-lg p-6">
              <p className="text-gray-700 font-lora text-lg">
                💌 {t("dinner.form_note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DinnerInfo;

