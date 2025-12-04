import { useState } from "react";
import { useTranslation } from "react-i18next";

// Import des photos
import photo2016 from "../assets/photo/2016.jpeg";
import photo2025 from "../assets/photo/2025.jpeg";

function Gallery() {
  const { t } = useTranslation();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Photos : première (2016) et dernière (2025)
  const photos = [
    { id: 1, year: "2016", src: photo2016 },
    { id: 2, year: "2025", src: photo2025 },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
              {/* Image */}
              <div className="relative h-80 w-full">
                <img
                  src={photo.src}
                  alt={`Flavio & Letizia ${photo.year}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-white mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                    <p className="text-white font-lora text-sm">
                      {t("gallery.click")}
                    </p>
                  </div>
                </div>

                {/* Légende avec l'année */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-playfair text-2xl font-bold text-center">
                    {photo.year}
                  </p>
                </div>
              </div>

              {/* Bordure décorative */}
              <div className="absolute inset-0 border-2 border-rose-gold/20 pointer-events-none rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-rose-gold transition-colors duration-300 z-10">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div
              className="max-w-5xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedPhoto.src}
                alt={`Flavio & Letizia ${selectedPhoto.year}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-white font-playfair text-3xl font-bold">
                  {selectedPhoto.year}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
