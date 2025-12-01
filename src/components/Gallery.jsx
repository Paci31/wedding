import { useTranslation } from "react-i18next";

function Gallery() {
  const { t } = useTranslation();

  const photos = [
    { id: 1, title: t("gallery.moment") + " 1" },
    { id: 2, title: t("gallery.moment") + " 2" },
    { id: 3, title: t("gallery.moment") + " 3" },
    { id: 4, title: t("gallery.moment") + " 4" },
    { id: 5, title: t("gallery.moment") + " 5" },
    { id: 6, title: t("gallery.moment") + " 6" },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-rose-50 via-white to-blush relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold opacity-5 rounded-full -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-gold opacity-5 rounded-full -mr-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            {t("gallery.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-gold via-gold to-rose-gold mx-auto mb-4"></div>
          <p className="text-gray-600 font-lora text-lg">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Galerie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 h-80 bg-white">
              {/* Placeholder avec gradient */}
              <div className="w-full h-full bg-gradient-to-br from-rose-gold via-gold to-rose-200 flex items-center justify-center relative overflow-hidden">
                {/* Motif de fond */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0 bg-repeat"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}></div>
                </div>

                {/* Contenu */}
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4">📷</div>
                  <p className="text-white font-playfair text-xl font-bold">
                    {photo.title}
                  </p>
                  <p className="text-white/80 font-lora text-sm mt-2">
                    {t("gallery.click")}
                  </p>
                </div>

                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>

              {/* Bordure décorative */}
              <div className="absolute inset-0 border-2 border-gradient-to-r from-rose-gold/20 via-gold/20 to-rose-gold/20 pointer-events-none rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 font-lora text-lg mb-4">
            {t("gallery.note")}
          </p>
          <p className="text-rose-gold font-semibold text-sm uppercase tracking-widest">
            {t("gallery.complete")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
