import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <header
      id="header"
      className="relative min-h-screen w-screen bg-gradient-to-br from-champagne via-white to-blush flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Motif de fond discret */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 float"></div>
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold rounded-full mix-blend-multiply filter blur-3xl opacity-30 float"
          style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Filigrane discret */}
      <div className="absolute top-10 right-10 text-gold opacity-10 text-9xl font-vibes">
        {t("header.watermark")}
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto fade-in-up">
        {/* Ornement du haut */}
        <div className="mb-8 flex justify-center">
          <div className="text-4xl text-rose-gold">✦ ✦ ✦</div>
        </div>

        {/* Logo avec halo */}
        <div className="mb-16 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-gold via-gold to-rose-gold rounded-full blur-2xl opacity-40 glow-pulse"></div>
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-rose-gold to-gold p-1 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-110">
              <div className="w-full h-full rounded-full bg-white p-3 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Titre annonce avec police cursive élégante */}
        <div className="mb-10">
          <p className="font-vibes text-5xl md:text-6xl text-rose-gold mb-4 drop-shadow-md">
            {t("header.announcement")}
          </p>
          <p className="text-sm md:text-base tracking-widest text-rose-gold uppercase font-raleway font-semibold letter-spacing">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Noms - Style faire-part élégant avec police Boheme Floreal */}
        <div className="mb-12 py-8 border-t-2 border-b-2 border-rose-gold border-opacity-30">
          <div className="flex flex-col items-center justify-center">
            <p className="text-7xl md:text-9xl font-boheme text-gray-900 leading-none mb-6">
              Flavio
            </p>
            <div className="flex items-center justify-center my-4">
              <span className="text-6xl md:text-8xl font-boheme text-gray-900">
                {t("header.et")}
              </span>
            </div>
            <p className="text-7xl md:text-9xl font-boheme text-gray-900 leading-none mt-6">
              Letizia
            </p>
          </div>
        </div>

        {/* Divider élégant */}
        <div className="flex items-center justify-center gap-8 my-12">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-gold"></div>
          <span className="text-rose-gold text-3xl">✦</span>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-rose-gold"></div>
        </div>

        {/* Date et lieu - Style sophistiqué */}
        <div className="space-y-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-rose-gold font-raleway font-bold mb-2">
              {t("header.date")}
            </p>
            <p className="text-3xl md:text-4xl font-playfair font-light text-gray-900">
              {t("header.time")}
            </p>
          </div>
          <div className="pt-6 border-t border-rose-gold border-opacity-20">
            <p className="text-sm uppercase tracking-widest text-gray-700 font-raleway font-semibold mb-2">
              {t("header.ceremony")}
            </p>
            <p className="text-xl md:text-2xl font-playfair text-gray-900">
              {t("header.venue")}
            </p>
            <p className="text-sm md:text-base text-gray-600 font-lora mt-2">
              {t("header.address")}
            </p>
          </div>
        </div>

        {/* Ornement du bas */}
        <div className="mb-8 flex justify-center">
          <div className="text-2xl text-rose-gold">✦</div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="bounce-smooth glow-pulse">
            <svg
              className="w-6 h-6 text-rose-gold mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
