import { useState } from "react";
import "./RSVP.css";

function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "",
    guests: "",
    dietary: "",
    message: "",
  });

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
    // Vous pouvez ajouter la logique d'envoi ici
    alert("Merci ! Votre réponse a été reçue.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      attending: "",
      guests: "",
      dietary: "",
      message: "",
    });
  };

  return (
    <section className="rsvp-section">
      <div className="container">
        <h2 className="section-title">RSVP</h2>
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Votre Nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Votre Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Votre Téléphone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                required>
                <option value="">-- Votre réponse --</option>
                <option value="yes">Oui, je serai présent(e)</option>
                <option value="no">Non, je ne serai pas présent(e)</option>
                <option value="maybe">À confirmer</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="guests"
                placeholder="Nombre de convives"
                min="1"
                value={formData.guests}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="dietary"
              placeholder="Régimes alimentaires spéciaux"
              value={formData.dietary}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Un message pour les mariés..."
              rows="5"
              value={formData.message}
              onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Envoyer ma réponse
          </button>
        </form>
      </div>
    </section>
  );
}

export default RSVP;
