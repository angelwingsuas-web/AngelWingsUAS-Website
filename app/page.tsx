"use client";

import { useEffect, useRef, useState } from "react";

const photographs = [
  {
    title: "Southern California Coastline",
    location: "Santa Barbara, California",
    category: "Coastal aerial photography",
    image: "/beach-aerial.jpg",
    className: "gallery-featured",
  },
  {
    title: "Southern California From Above",
    location: "Mount Soledad, California",
    category: "Landscape documentation",
    image: "/soledad-mountain.jpg",
    className: "",
  },
  {
    title: "City After Dark",
    location: "San Diego, California",
    category: "Night aerial photography",
    image: "/city-night.jpg",
    className: "",
  },
];

const tours = [
  {
    title: "Chino Hills",
    description: "Explore this Southern California location from an immersive aerial perspective.",
    url: "https://app.cloudpano.com/tours/CjiwYMgdo",
  },
  {
    title: "Caffe Liscio",
    description: "Step inside a local cafe through a branded, interactive virtual experience.",
    url: "https://app.cloudpano.com/tours/UAPoPNDVK",
  },
  {
    title: "WindyVille Community Garden",
    description: "Look across the community garden and surrounding Inland Empire landscape from above.",
    url: "https://app.cloudpano.com/tours/Vzf8RbGUg",
  },
];

type Photograph = (typeof photographs)[number];

export default function Portfolio() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);
  const [panoramaPosition, setPanoramaPosition] = useState(50);
  const dragStart = useRef<{ x: number; position: number } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPhoto]);

  return (
    <main>
      <nav className="nav shell" aria-label="Portfolio navigation">
        <a className="brand-logo" href="#top" aria-label="AngelWingsUAS portfolio home">
          <img src="/angel-wings-uas-logo-cropped.png" alt="AngelWingsUAS" />
        </a>
        <div className="nav-links">
          <a href="#photography">Photography</a>
          <a href="#video">Video</a>
          <a href="#tours">Virtual tours</a>
          <a href="#panoramas">360° images</a>
          <a href="#on-location">On Location</a>
        </div>
        <a className="nav-cta" href="https://www.angelwingsuas.com" target="_blank" rel="noreferrer">
          Main website <span>↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <img className="hero-image" src="/city-night.jpg" alt="Aerial night view of San Diego near Petco Park" />
        <div className="hero-shade" />
        <div className="hero-copy shell">
          <p className="eyebrow"><span /> The AngelWingsUAS portfolio</p>
          <h1>Aerial work.<br /><em>Real perspective.</em></h1>
          <p>
            Drone photography, cinematic video, interactive 360° experiences and visual project documentation captured throughout Southern California.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#photography">Explore the work <span>↓</span></a>
            <a className="text-link" href="#tours">Launch a 360° tour <span>↗</span></a>
          </div>
        </div>
        <div className="hero-corner">FAA PART 107 CERTIFIED<br />SOUTHERN CALIFORNIA</div>
      </section>

      <section className="intro shell">
        <p className="eyebrow dark"><span /> Selected work</p>
        <div>
          <h2>See the story<br /><em>from above.</em></h2>
          <p>
            This portfolio brings together real locations, changing light and useful visual detail—from coastal landscapes and city views to immersive tours and field documentation.
          </p>
        </div>
      </section>

      <section className="photography shell" id="photography">
        <div className="section-title">
          <span>01</span>
          <h2>Drone photography</h2>
          <p>Select an image to view it full screen.</p>
        </div>
        <div className="photo-grid">
          {photographs.map((photo) => (
            <article className={`photo-card ${photo.className}`} key={photo.title}>
              <button type="button" onClick={() => setSelectedPhoto(photo)} aria-label={`Open ${photo.title} full screen`}>
                <img src={photo.image} alt={`${photo.title} — ${photo.location}`} />
                <span className="view-label">View image +</span>
              </button>
              <div className="photo-caption">
                <div><span>{photo.category}</span><h3>{photo.title}</h3></div>
                <p>{photo.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="video-section" id="video">
        <div className="shell video-layout">
          <div className="section-title light">
            <span>02</span>
            <h2>Drone video</h2>
            <p>Motion, atmosphere and perspective captured in flight.</p>
          </div>
          <div className="video-stage">
            <div className="video-preview">
              <img src="/beach-aerial.jpg" alt="Coastal aerial video preview" />
              <div className="play-mark" aria-hidden="true">▶</div>
            </div>
            <div className="video-copy">
              <p className="eyebrow light"><span /> Flight reels & project stories</p>
              <h3>Video collection<br />coming into view.</h3>
              <p>
                This area is ready for AngelWingsUAS YouTube flight replays, cinematic property videos, event coverage and construction progress footage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tours shell" id="tours">
        <div className="section-title">
          <span>03</span>
          <h2>CloudPano 360° tours</h2>
          <p>Explore a location interactively and look in every direction.</p>
        </div>
        <div className="tour-grid">
          {tours.map((tour) => (
            <article className="tour-card" key={tour.url}>
              <div className="tour-frame">
                <iframe
                  src={tour.url}
                  title={`AngelWingsUAS ${tour.title} 360 virtual tour`}
                  loading="lazy"
                  allow="accelerometer; gyroscope; fullscreen; vr"
                  allowFullScreen
                />
              </div>
              <div className="tour-copy">
                <span>INTERACTIVE 360° EXPERIENCE</span>
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <a className="button button-primary" href={tour.url} target="_blank" rel="noreferrer">
                  Open full tour <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panoramas" id="panoramas">
        <div className="shell">
          <div className="section-title light">
            <span>04</span>
            <h2>360° drone images</h2>
            <p>Drag the panorama left or right to explore the full aerial scene.</p>
          </div>
          <div
            className="panorama-viewer"
            role="img"
            aria-label="Interactive 360 degree aerial panorama of downtown San Diego"
            tabIndex={0}
            style={{ backgroundPosition: `${panoramaPosition}% center` }}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              dragStart.current = { x: event.clientX, position: panoramaPosition };
            }}
            onPointerMove={(event) => {
              if (!dragStart.current) return;
              const next = dragStart.current.position - (event.clientX - dragStart.current.x) / 8;
              setPanoramaPosition(Math.max(0, Math.min(100, next)));
            }}
            onPointerUp={() => { dragStart.current = null; }}
            onPointerCancel={() => { dragStart.current = null; }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") setPanoramaPosition((value) => Math.max(0, value - 5));
              if (event.key === "ArrowRight") setPanoramaPosition((value) => Math.min(100, value + 5));
            }}
          >
            <div className="panorama-hint" aria-hidden="true">← Drag to explore 360° →</div>
          </div>
          <div className="panorama-copy">
            <div>
              <span>360° DRONE IMAGE · ESRI UC 2026</span>
              <h3>Downtown San Diego Panorama</h3>
            </div>
            <p>A sweeping aerial view of downtown San Diego captured as an interactive equirectangular panorama.</p>
          </div>
        </div>
      </section>

      <section className="on-location" id="on-location">
        <div className="shell location-layout">
          <div>
            <p className="eyebrow light"><span /> Behind the operation</p>
            <h2>On location.<br /><em>Flight ready.</em></h2>
          </div>
          <div className="location-copy">
            <p>
              Field notes, equipment preparation, live-flight moments and behind-the-scenes updates will show how AngelWingsUAS approaches each location with planning, awareness and purpose.
            </p>
            <div className="location-tags">
              <span>Preflight</span><span>On site</span><span>Live flights</span><span>Behind the scenes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="contact-orbit orbit-one" />
        <div className="contact-orbit orbit-two" />
        <div className="shell contact-inner">
          <p className="eyebrow light"><span /> Have a project in mind?</p>
          <h2>Let’s create<br /><em>your perspective.</em></h2>
          <p>Visit the AngelWingsUAS main website to request a quote or schedule a project consultation.</p>
          <div className="contact-actions">
            <a className="button button-light" href="https://www.angelwingsuas.com" target="_blank" rel="noreferrer">Request project information <span>↗</span></a>
            <a className="text-link light-link" href="mailto:support@angelwingsuas.com">support@angelwingsuas.com</a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand-logo footer-logo" href="#top" aria-label="Back to top">
          <img src="/angel-wings-uas-logo-cropped.png" alt="AngelWingsUAS" />
        </a>
        <p>Photography · Video · Virtual tours · 360° panoramas</p>
        <p>© 2026 AngelWingsUAS</p>
      </footer>

      {selectedPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selectedPhoto.title} image viewer`} onClick={() => setSelectedPhoto(null)}>
          <button ref={closeButtonRef} type="button" className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close image viewer">
            Close <b aria-hidden="true">×</b>
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedPhoto.image} alt={`${selectedPhoto.title} — ${selectedPhoto.location}`} />
            <figcaption><span>{selectedPhoto.category}</span><strong>{selectedPhoto.title}</strong><p>{selectedPhoto.location}</p></figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
