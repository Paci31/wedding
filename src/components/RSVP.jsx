import { useState } from "react";
import { useTranslation } from "react-i18next";

function RSVP() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "",
    guests: "",
    dietary: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        attending: "",
        guests: "",
        dietary: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blush rounded-full -ml-36 -mb-36 opacity-30"></div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t("rsvp.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto"></div>
        </div>

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
                  {t("rsvp.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+41 78 XXX XX XX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                />
              </div>
            </div>

            {/* Présence et Convives */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
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
                  <option value="maybe">{t("rsvp.maybe")}</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider mb-2">
                  {t("rsvp.guests")}
                </label>
                <input
                  type="number"
                  name="guests"
                  placeholder="1"
                  min="1"
                  max="5"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition-all duration-300 font-lora"
                />
              </div>
            </div>

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
              className="w-full bg-gradient-to-r from-rose-gold to-gold hover:from-gold hover:to-rose-gold text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wider">
              {t("rsvp.submit")}
            </button>

            <p className="text-center text-gray-600 text-xs mt-4 font-lora">
              {t("rsvp.required")}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

export default RSVP;
