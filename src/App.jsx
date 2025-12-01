import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CeremonyDetails from "./components/CeremonyDetails";
import ReceptionDetails from "./components/ReceptionDetails";
import Gallery from "./components/Gallery";
import OurStory from "./components/OurStory";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
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
