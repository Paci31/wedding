import { useState } from "react";
import "./index.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Header from "./components/Header";
import CeremonyDetails from "./components/CeremonyDetails";
import ReceptionDetails from "./components/ReceptionDetails";
import Gallery from "./components/Gallery";
import OurStory from "./components/OurStory";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-ivory">
      <LanguageSwitcher />
      <Header />
      <OurStory />
      <CeremonyDetails />
      <ReceptionDetails />
      <Gallery />
      <RSVP />
      <Footer />
    </div>
  );
}

export default App;
