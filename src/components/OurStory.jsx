import { useTranslation } from "react-i18next";

function OurStory() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-champagne relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full -mr-48 -mt-48 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold opacity-8 rounded-full -ml-36 -mb-36"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-rose-gold font-raleway font-bold mb-4">
            ✦ {t("ourStory.title")} ✦
          </p>
          <h2 className="text-5xl md:text-6xl font-garamond font-bold text-gray-900 mb-8">
            {t("ourStory.title")}
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-rose-gold"></div>
            <span className="text-rose-gold text-2xl">✦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-rose-gold"></div>
          </div>
        </div>

        {/* Contenu élégant */}
        <div className="bg-white rounded-none shadow-md p-10 md:p-16 border-l-4 border-r-4 border-rose-gold border-opacity-30">
          <div className="space-y-8 text-gray-800">
            <p className="text-2xl md:text-3xl font-vibes text-rose-gold text-center mb-8">
              "{t("ourStory.subtitle")}"
            </p>
            <p className="text-lg md:text-xl font-lora leading-relaxed text-center italic">
              {t("ourStory.text1")}
              <br />
              {t("ourStory.text2")}
              <br />
              {t("ourStory.text3")}
              <br />
              {t("ourStory.text4")}
              <br />
              {t("ourStory.text5")}
              <br />
              {t("ourStory.text6")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
