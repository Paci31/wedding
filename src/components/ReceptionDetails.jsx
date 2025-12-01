import "./ReceptionDetails.css";

function ReceptionDetails() {
  return (
    <section className="reception-details">
      <div className="container">
        <div className="reception-content">
          <p className="rsvp-text">
            È GRADITA GENTILE CONFERMA ENTRO IL 30 APRILE
          </p>

          <div className="contacts">
            <div className="contact-item">
              <p className="contact-name">FLAVIO PACIFICO</p>
              <p className="contact-phone">+41 78 715 04 79</p>
            </div>

            <div className="contact-item">
              <p className="contact-name">LETIZIA CAVALIERE</p>
              <p className="contact-phone">+41 78 677 40 50</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReceptionDetails;
