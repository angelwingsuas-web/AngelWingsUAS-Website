const services = [
  {
    number: "01",
    title: "Aerial media",
    text: "Professional drone photography, cinematic videography, promotional media, and immersive 360° virtual tours.",
    tag: "Photo · Video · 360°",
  },
  {
    number: "02",
    title: "Inspections",
    text: "Clear aerial imagery for roofs, facilities, infrastructure, and hard-to-reach assets—captured with safety at the center.",
    tag: "Inspect · Document",
  },
  {
    number: "03",
    title: "Mapping support",
    text: "Mapping and surveying support that gives project teams a detailed, useful view of sites and surrounding conditions.",
    tag: "Map · Measure",
  },
  {
    number: "04",
    title: "Progress documentation",
    text: "Repeatable construction captures and visual records that make progress easier to communicate, compare, and understand.",
    tag: "Track · Report",
  },
];

const sectors = [
  {
    type: "BUSINESSES",
    title: "Stronger marketing and smarter decisions",
    className: "project-one",
    image: "/beach-aerial.jpg",
     location: "Santa Barbara, CA",
  },
  {
    type: "LOCAL GOVERNMENT",
    title: "Clear visuals for city and public projects",
    className: "project-two",
    image: "/soledad-mountain.jpg",
    location: "Mount Soledad, CA",
  },
  {
    type: "COMMUNITIES",
    title: "A new perspective on the places we share",
    className: "project-three",
    image: "/city-night.jpg",
    location: "San Diego, CA · Near Petco Park",
  },
];

const technology = [
  ["Web applications", "Purpose-built digital experiences that make information and services easier to access."],
  ["AI business tools", "Practical tools that help teams work faster, organize knowledge, and serve clients better."],
  ["Automation", "Connected workflows that reduce repetitive work and improve day-to-day efficiency."],
  ["Technology consulting", "Thoughtful guidance for choosing and applying technology around real business needs."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand brand-logo" href="#top" aria-label="Angel Wings UAS home">
          <img src="/angel-wings-uas-logo-cropped.png" alt="Angel Wings UAS" />
        </a>
        <div className="nav-links">
          <a href="#services">Drone services</a>
          <a href="#technology">Technology</a>
          <a href="#about">Our story</a>
        </div>
        <a className="nav-cta" href="#contact">Start a project <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Serving the Inland Empire & Southern California</p>
          <h1>Perspective<br /><em>with purpose.</em></h1>
          <p className="hero-intro">
            Professional drone services and practical technology solutions that help organizations see clearly, work smarter, and tell better stories.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">Request project information <span>↗</span></a>
            <a className="text-link" href="#services">Explore services <span>↓</span></a>
          </div>
        </div>
        <div className="flight-card" aria-label="Abstract aerial flight path graphic">
          <div className="flight-noise" />
          <div className="flight-grid" />
          <div className="flight-path">
            <span className="path-dot dot-one" />
            <span className="path-dot dot-two" />
            <span className="path-dot dot-three" />
          </div>
          <div className="crosshair"><span /><i /></div>
          <div className="flight-top">
            <span>ANGEL WINGS UAS / SOUTHERN CALIFORNIA</span><span>REC ●</span>
          </div>
          <div className="flight-bottom">
            <span>SAFE<br />RELIABLE<br />INNOVATIVE</span>
            <strong>107<small>FAA</small></strong>
          </div>
        </div>
        <div className="hero-index">DRONES<br />+ TECHNOLOGY</div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-inner">
          <span>Technology, creativity, and service</span>
          <strong>FAA PART 107 CERTIFIED</strong>
          <strong>SAFETY-FOCUSED</strong>
          <strong>PROFESSIONAL</strong>
          <strong>SOUTHERN CALIFORNIA</strong>
        </div>
      </section>

      <section className="services shell" id="services">
        <div className="section-heading">
          <p className="eyebrow"><span /> Professional drone services</p>
          <h2>See more.<br />Understand <em>more.</em></h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <div className="service-meta">
                <span>{service.tag}</span>
                <b>↗</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work" id="impact">
        <div className="shell work-heading">
          <p className="eyebrow light"><span /> Who we serve</p>
          <h2>Built for<br /><em>real-world impact.</em></h2>
          <p>From commercial projects to community initiatives, every service begins with the client’s goal and ends with something useful.</p>
        </div>
<div className="projects shell">
  {sectors.map((sector, index) => (
    <article className={`project ${sector.className}`} key={sector.type}>
      <div className="project-landscape">
        <img
          src={sector.image}
          alt={sector.title}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
        <div className="project-marker">
  {sector.location}
</div>
      </div>

      <div className="project-copy">
        <span>{sector.type}</span>
        <h3>{sector.title}</h3>
      </div>
    </article>
  ))}
</div>
      </section>

      <section className="technology shell" id="technology">
        <div className="technology-intro">
          <p className="eyebrow"><span /> Beyond the flight</p>
          <h2>Technology that<br /><em>moves work forward.</em></h2>
          <p>
            AngelWingsUAS is growing beyond drone operations to create custom web applications, AI-powered business tools, automation solutions, and digital resources that improve efficiency and client experiences.
          </p>
        </div>
        <div className="technology-grid">
          {technology.map(([title, text], index) => (
            <article className="technology-card" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="founder-mark">
          <span>FOUNDED BY</span>
          <strong>JW</strong>
          <p>Jevita Webster<br />FAA Part 107 Certified<br />Remote Pilot</p>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span /> The story behind the wings</p>
          <h2>Inspired by <em>Angel.</em><br />Built to help others<br />see what’s possible.</h2>
          <p>
            AngelWingsUAS was founded by FAA Part 107 Certified Remote Pilot Jevita Webster and inspired by her granddaughter, Angel. The company was created to help businesses, local governments, and communities gain valuable aerial perspectives through safe, reliable, and innovative technology.
          </p>
          <p>
            Our goal is to combine technology, creativity, and exceptional customer service to deliver solutions that help clients make better decisions and tell their stories from a new perspective.
          </p>
          <div className="proof-grid">
            <div><b>01</b><span>Safety first</span></div>
            <div><b>02</b><span>Client focused</span></div>
            <div><b>03</b><span>Innovation driven</span></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orbit orbit-a" />
        <div className="contact-orbit orbit-b" />
        <div className="shell contact-inner">
          <p className="eyebrow light"><span /> Ready when you are</p>
          <h2>Let’s build a<br /><em>better perspective.</em></h2>
          <p>Tell us about your project, challenge, or idea. We’ll help identify the right aerial or technology solution.</p>
          <a
  className="button button-light"
  href="mailto:support@angelwingsuas.com?subject=AngelWingsUAS%20project%20inquiry"
>
  support@angelwingsuas.com <span>↗</span>
</a>
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand brand-logo footer-logo" href="#top" aria-label="Angel Wings UAS home">
          <img src="/angel-wings-uas-logo-cropped.png" alt="Angel Wings UAS" />
        </a>
        <p>Drone services + technology solutions</p>
        <p>© 2026 ANGEL WINGS UAS</p>
      </footer>
    </main>
  );
}
