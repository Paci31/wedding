import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="crest">
          <img src="/logo.png" alt="Logo" />
        </div>

        <p className="announcement">Annunciano il nostro matrimonio</p>

        <h1 className="names">
          <span className="name">Flavio</span>
          <span className="separator">e</span>
          <span className="name">Letizia</span>
        </h1>

        <p className="date-info">20 Giugno 2026 | Ore 15:30</p>
      </div>
    </header>
  );
}

export default Header;
