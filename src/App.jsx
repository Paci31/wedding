import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Header from "./components/Header";
import CeremonyDetails from "./components/CeremonyDetails";
import Gallery from "./components/Gallery";
import OurStory from "./components/OurStory";
import HotelInfo from "./components/HotelInfo";
import GiftInfo from "./components/GiftInfo";
import DinnerInfo from "./components/DinnerInfo";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";

function HomePage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-ivory">
      <LanguageSwitcher />
      <Header />
      <OurStory />
      <CeremonyDetails />
      <HotelInfo />
      <DinnerInfo />
      <GiftInfo />
      <Gallery />
      <RSVP />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
