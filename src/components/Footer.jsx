import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-gold opacity-5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold opacity-5 rounded-full -ml-36 -mb-36"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6">
          {/* Logo et noms */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-gold to-gold p-0.5">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
          </div>

          {/* Noms et date */}
          <h3 className="text-2xl font-playfair font-bold">Flavio & Letizia</h3>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-rose-gold"></div>
            <span className="text-rose-gold">✦</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-rose-gold"></div>
          </div>

          {/* Date du mariage */}
          <p className="font-lora text-white/80">{t("footer.date")}</p>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-6 mt-6">
            <p className="text-white/60 font-lora text-sm mb-2">
              {t("footer.copyright")}
            </p>
            <p className="text-rose-gold font-playfair text-lg italic">
              {t("footer.love")}
            </p>
          </div>

          {/* Liens sociaux (optionnel) */}
          <div className="flex justify-center gap-6 pt-4">
            <a
              href="#header"
              className="text-white/60 hover:text-rose-gold transition-colors duration-300"
              title="Retour au début">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
