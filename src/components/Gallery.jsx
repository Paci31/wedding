import "./Gallery.css";

function Gallery() {
  // Placeholder images - à remplacer par vos photos
  const photos = [
    { id: 1, title: "Photo 1" },
    { id: 2, title: "Photo 2" },
    { id: 3, title: "Photo 3" },
    { id: 4, title: "Photo 4" },
    { id: 5, title: "Photo 5" },
    { id: 6, title: "Photo 6" },
  ];

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="section-title">Nos Moments</h2>
        <div className="gallery-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="gallery-item">
              <div className="gallery-placeholder">
                <span>{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
