import "./CeremonyDetails.css";

function CeremonyDetails() {
  return (
    <section className="ceremony-details">
      <div className="container">
        <div className="ceremony-content">
          <h2 className="section-title">La Cerimonia</h2>

          <div className="date-time">
            <p className="large-text">20 GIUGNO 2026</p>
            <p className="time">ORE 15:30</p>
          </div>

          <div className="location">
            <h3 className="location-name">Villa Laparelli 1898</h3>
            <p className="address">Via Gradisca 12, Tradate (VA)</p>
          </div>

          <div className="ceremony-details-list">
            <p className="ceremony-item">DOPO LA CERIMONIA</p>
            <p className="ceremony-item">SEGUE LA CERIMONIA</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CeremonyDetails;
