import { useTranslation } from "react-i18next";

function HotelInfo() {
  const { t } = useTranslation();

  const rooms = [
    { type: "single", capacity: 1, price: 120 },
    { type: "double", capacity: 2, price: 140 },
    { type: "triple", capacity: 3, price: 160 },
    { type: "quadruple", capacity: 4, price: 180 },
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-50 rounded-full -ml-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blush rounded-full -mr-36 -mb-36 opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t("hotel.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto"></div>
        </div>

        {/* Contenu principal */}
        <div className="bg-gradient-to-br from-gray-50 to-rose-50 rounded-2xl shadow-xl p-8 md:p-12 border border-rose-gold border-opacity-20">
          {/* Nom de l'hôtel */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
              🏨 Just Hotel Saronno
            </h3>
            <p className="text-gray-600 font-lora mb-3">
              {t("hotel.subtitle")}
            </p>
            <p className="text-gray-700 font-lora text-lg mb-3">
              Via Strà Madonna, 15<br />
              21047 Saronno VA, Italie
            </p>
            <a
              href="https://maps.google.com/?q=Just+Hotel+Saronno+Via+Strà+Madonna+15+Saronno"
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
              {t("hotel.mapLink")}
            </a>
          </div>

          {/* Info importante */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  {t("hotel.deadline_title")}
                </h4>
                <p className="text-gray-700 font-lora">
                  {t("hotel.deadline_text")}
                </p>
              </div>
            </div>
          </div>

          {/* Tarifs */}
          <div className="mb-8">
            <h4 className="text-2xl font-playfair font-bold text-gray-800 mb-6 text-center">
              {t("hotel.rates_title")}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <div
                  key={room.type}
                  className="bg-white rounded-lg shadow-md p-5 border-2 border-transparent hover:border-rose-gold transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800 text-lg">
                        {t(`hotel.room_${room.type}`)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {room.capacity} {room.capacity === 1 ? t("hotel.person") : t("hotel.persons")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-rose-gold">
                        €{room.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t("hotel.per_night")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Taxe de séjour */}
            <div className="mt-4 text-center text-sm text-gray-600 font-lora">
              {t("hotel.tourist_tax")}
            </div>
            
            {/* Prix inclut petit-déjeuner */}
            <div className="mt-2 text-center">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {t("hotel.breakfast_included")}
              </span>
            </div>
          </div>

          {/* Paiement */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💳</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  {t("hotel.payment_title")}
                </h4>
                <p className="text-gray-700 font-lora">
                  {t("hotel.payment_text")}
                </p>
              </div>
            </div>
          </div>

          {/* Navettes Bus */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚌</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-3">
                  {t("hotel.bus_title")}
                </h4>
                <p className="text-gray-700 font-lora mb-4">
                  {t("hotel.bus_text")}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                    <p className="font-bold text-purple-700 mb-1">
                      🚌 {t("hotel.bus1_label")}
                    </p>
                    <p className="text-sm text-gray-700">
                      {t("hotel.bus1_time")}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                    <p className="font-bold text-purple-700 mb-1">
                      🚌 {t("hotel.bus2_label")}
                    </p>
                    <p className="text-sm text-gray-700">
                      {t("hotel.bus2_time")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 font-lora text-sm mt-4 italic">
                  💡 {t("hotel.bus_note")}
                </p>
              </div>
            </div>
          </div>

          {/* Note dans le formulaire RSVP */}
          <div className="bg-rose-50 border-2 border-rose-gold rounded-lg p-6 text-center">
            <p className="text-gray-700 font-lora text-lg">
              💌 {t("hotel.form_note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotelInfo;

