import { useState } from "react";
import { useTranslation } from "react-i18next";

function RSVP() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "",
    adults: "",
    children: "",
    childrenAges: [],
    dietary: "",
    hotelRoomType: "",
    hotelCheckIn: "",
    hotelCheckOut: "",
    dinnerAttending: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // URL de l'API : en production utilise le même domaine que le site
  const getApiUrl = () => {
    // Si l'URL est définie dans les variables d'environnement, l'utiliser
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
    // En mode développement, utiliser localhost:3001
    if (import.meta.env.DEV) {
      return "http://localhost:3001";
    }
    // En production, utiliser le même domaine
    return window.location.origin;
  };

  const API_URL = getApiUrl();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si on change le nombre d'enfants, initialiser le tableau d'âges
    if (name === "children") {
      const numChildren = parseInt(value) || 0;
      const newAges = Array(numChildren).fill("");
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        childrenAges: newAges,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChildAgeChange = (index, value) => {
    setFormData((prev) => {
      const newAges = [...prev.childrenAges];
      newAges[index] = value;
      return {
        ...prev,
        childrenAges: newAges,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Convertir le tableau d'âges en chaîne pour le backend
      const dataToSend = {
        ...formData,
        childrenAges: formData.childrenAges
          .filter((age) => age.trim() !== "")
          .join(", "),
      };

      const response = await fetch(`${API_URL}/api/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            attending: "",
            adults: "",
            children: "",
            childrenAges: [],
            dietary: "",
            hotelRoomType: "",
            hotelCheckIn: "",
            hotelCheckOut: "",
            dinnerAttending: "",
            message: "",
          });
          setSubmitted(false);
        }, 5000);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError(
        "Impossible de se connecter au serveur. Veuillez vérifier votre connexion."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blush rounded-full -ml-36 -mb-36 opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Message principal en haut */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-rose-gold to-gold text-white px-6 py-3 rounded-full shadow-lg mb-6">
            <p className="text-sm md:text-base uppercase tracking-widest font-semibold">
              Ⓘ {t("reception.rsvpMessage")}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">
            {t("rsvp.title")}
          </h2>
          <p className="text-xl md:text-2xl font-lora text-gray-700">
            <span className="text-rose-gold font-semibold">
              {t("reception.deadline")}
            </span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto mt-6"></div>
        </div>

        {/* Formulaire RSVP */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-8 md:p-12 border-2 border-emerald-500 text-center">
              <div className="mb-4 text-5xl">{t("rsvp.success_emoji")}</div>
              <h3 className="text-2xl font-playfair font-bold text-emerald-700 mb-2">
                {t("rsvp.thanks")}
              </h3>
              <p className="text-emerald-600 font-lora whitespace-pre-line">
                {t("rsvp.thanks_message")}
              </p>
            </div>
          ) : (
            <form
              className="bg-gradient-to-br from-gray-50 to-rose-50 rounded-lg shadow-xl p-8 md:p-12 border border-rose-gold border-opacity-20"
              onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              {/* Nom complet */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                  {t("rsvp.name")} *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("rsvp.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                />
              </div>

              {/* Email et Téléphone */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                    {t("rsvp.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                    {t("rsvp.phone")} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+41 78 XXX XX XX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                  />
                </div>
              </div>

              {/* Présence */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                  {t("rsvp.response")} *
                </label>
                <select
                  name="attending"
                  value={formData.attending}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora bg-white text-gray-700">
                  <option value="">{t("rsvp.select")}</option>
                  <option value="yes">{t("rsvp.yes")}</option>
                  <option value="no">{t("rsvp.no")}</option>
                </select>
              </div>

              {/* Nombre d'adultes et d'enfants */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                    {t("rsvp.adults")} *
                  </label>
                  <input
                    type="number"
                    name="adults"
                    placeholder="1"
                    min="1"
                    max="10"
                    value={formData.adults}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                    {t("rsvp.children")}
                  </label>
                  <input
                    type="number"
                    name="children"
                    placeholder="0"
                    min="0"
                    max="10"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                  />
                </div>
              </div>

              {/* Âge des enfants - Champs individuels */}
              {formData.children && parseInt(formData.children) > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-3">
                    {t("rsvp.childrenAges")}
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Array.from({ length: parseInt(formData.children) }).map(
                      (_, index) => (
                        <div key={index}>
                          <label className="block text-gray-600 text-sm mb-2">
                            {t("rsvp.childAge")} {index + 1}
                          </label>
                          <input
                            type="text"
                            placeholder={t("rsvp.childAge_placeholder")}
                            value={formData.childrenAges[index] || ""}
                            onChange={(e) =>
                              handleChildAgeChange(index, e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Régimes alimentaires */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                  {t("rsvp.dietary")}
                </label>
                <input
                  type="text"
                  name="dietary"
                  placeholder={t("rsvp.dietary_placeholder")}
                  value={formData.dietary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                />
              </div>

              {/* Séparateur - Hôtel */}
              <div className="my-10 border-t-2 border-rose-gold opacity-20"></div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-6 text-center">
                🏨 {t("rsvp.hotel_section")}
              </h3>

              {/* Choix de la chambre d'hôtel */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                  {t("rsvp.hotel_room_choice")} *
                </label>
                <select
                  name="hotelRoomType"
                  value={formData.hotelRoomType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora bg-white text-gray-700">
                  <option value="">{t("rsvp.select")}</option>
                  <option value="none">{t("rsvp.hotel_none")}</option>
                  <option value="single">{t("rsvp.room_single")} - €120</option>
                  <option value="double">{t("rsvp.room_double")} - €140</option>
                  <option value="triple">{t("rsvp.room_triple")} - €160</option>
                  <option value="quadruple">
                    {t("rsvp.room_quadruple")} - €180
                  </option>
                  <option value="larger">{t("rsvp.room_larger")}</option>
                </select>
              </div>

              {/* Détails de l'hôtel si une chambre est sélectionnée */}
              {formData.hotelRoomType && formData.hotelRoomType !== "none" && (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                        {t("rsvp.hotel_checkin")} *
                      </label>
                      <input
                        type="date"
                        name="hotelCheckIn"
                        value={formData.hotelCheckIn}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                        {t("rsvp.hotel_checkout")} *
                      </label>
                      <input
                        type="date"
                        name="hotelCheckOut"
                        value={formData.hotelCheckOut}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700 font-lora">
                      💳 {t("rsvp.hotel_payment_note")}
                    </p>
                  </div>
                </>
              )}

              {/* Séparateur - Repas */}
              <div className="my-10 border-t-2 border-rose-gold opacity-20"></div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-6 text-center">
                🍝 {t("rsvp.dinner_section")}
              </h3>

              {/* Présence au repas de la veille */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                  {t("rsvp.dinner_attending")} *
                </label>
                <select
                  name="dinnerAttending"
                  value={formData.dinnerAttending}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora bg-white text-gray-700">
                  <option value="">{t("rsvp.select")}</option>
                  <option value="yes">{t("rsvp.yes")}</option>
                  <option value="no">{t("rsvp.no")}</option>
                </select>
              </div>

              {/* Séparateur */}
              <div className="my-10 border-t-2 border-rose-gold opacity-20"></div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                  {t("rsvp.message")}
                </label>
                <textarea
                  name="message"
                  placeholder={t("rsvp.message_placeholder")}
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora resize-none"></textarea>
              </div>

              {/* Bouton submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-rose-gold to-gold hover:from-gold hover:to-rose-gold text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? "Envoi en cours..." : t("rsvp.submit")}
              </button>

              <p className="text-center text-gray-600 text-xs mt-4 font-lora">
                {t("rsvp.required")}
              </p>
            </form>
          )}
        </div>

        {/* Cartes de contact */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RSVP;
