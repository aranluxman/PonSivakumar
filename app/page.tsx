import { ContactForm } from "@/components/contact-form";
import { SiteChrome } from "@/components/site-chrome";
import { CounterStats } from "@/components/counter-stats";

const strategyCards = [
  {
    number: "01",
    title: "Acquire",
    text: "Commercial plazas, industrial assets, development land, multi-family opportunities across Ontario"
  },
  {
    number: "02",
    title: "Add Value",
    text: "Leasing optimization, tenant repositioning, redevelopment, operational efficiencies"
  },
  {
    number: "03",
    title: "Grow Wealth",
    text: "Conservative underwriting, disciplined execution, long-term income and appreciation"
  }
];

const propertyDetails = [
  ["Location", "Kennedy Rd & Cornett Dr, Markham, Ontario"],
  ["Asset Type", "Neighbourhood Retail Plaza"],
  ["Lot Size", "4.12 Acres"],
  ["GLA", "~41,000 SF"],
  ["Built", "1987"],
  ["Occupancy", "100% Leased"],
  ["NOI", "$1.077M"],
  [
    "Key Tenants",
    "CIBC Bank, The UPS Store, Chris Jerk Caribbean, Community Services, Health Spa"
  ],
  ["Parking", "~120 surface spots"],
  ["Market Rents", "$27–$33/SF"],
  ["Transit", "1.5km to Milliken GO | Near Hwy 407"],
  ["Upside", "Redevelopment potential (FAR: 0.23), Metrolinx GO Expansion nearby"]
];

const investmentCase = [
  {
    icon: "bank",
    title: "Stable Income",
    text: "Fully leased assets with long-term tenants and strong NOI"
  },
  {
    icon: "growth",
    title: "Growth Markets",
    text: "Focused on GTA North, Markham, Richmond Hill, and Ontario corridors"
  },
  {
    icon: "cycle",
    title: "Dual Strategy",
    text: "Cash flow today + redevelopment upside tomorrow"
  },
  {
    icon: "network",
    title: "Deep Network",
    text: "CCIM, SIOR, developers, planners, architects, and lenders"
  }
];

function Icon({ name }: { name: string }) {
  if (name === "bank") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 13h24L16 6 4 13Z" />
        <path d="M7 14v10M13 14v10M19 14v10M25 14v10M5 25h22" />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 24h22" />
        <path d="m7 21 6-6 5 4 8-10" />
        <path d="M21 9h5v5" />
      </svg>
    );
  }

  if (name === "cycle") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M24 11a9 9 0 0 0-15.2-2.6L6 11" />
        <path d="M6 6v5h5" />
        <path d="M8 21a9 9 0 0 0 15.2 2.6L26 21" />
        <path d="M21 21h5v5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M11 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4 25c.7-4.1 3.2-7 7-7s6.3 2.9 7 7" />
      <path d="M14 25c.7-4.1 3.2-7 7-7s6.3 2.9 7 7" />
    </svg>
  );
}

export default function Home() {
  return (
    <SiteChrome>
      <main>
        <section id="top" className="hero">
          <div className="hero__media" aria-hidden="true" />
          <div className="hero__shade" aria-hidden="true" />
          <div className="container hero__content">
            <h1>Transforming Strategic Real Estate Opportunities Into Long-Term Wealth</h1>
            <p className="hero__subtitle">
              Commercial, Industrial & Development-Grade Assets Across Ontario
            </p>
            <div className="hero__actions" aria-label="Primary actions">
              <a className="button button--gold" href="tel:4169195658">
                Book a Call
              </a>
              <a className="button button--outline" href="/api/investor-package">
                Download Investor Package
              </a>
            </div>
            <CounterStats />
          </div>
        </section>

        <section id="about" className="section section--white about">
          <div className="container about__grid">
            <div className="portrait" aria-label="Professional photo placeholder">
              <div className="portrait__head" />
              <div className="portrait__body" />
              <span>Professional Portrait</span>
            </div>
            <div className="about__copy">
              <h2>Built From the Ground Up</h2>
              <p>
                Pon Sivakumar is a real estate entrepreneur who arrived in Canada in 2008
                and built his career through hands-on market experience. Starting as a
                single-family investor with over 10 residential properties, he earned his
                real estate license in 2014 and by 2018 had shifted his full focus to
                commercial real estate. Today, Pon is actively involved in retail plazas,
                industrial properties, mixed-use developments, multi-family projects, and
                land development across Ontario. He collaborates with CCIM and SIOR
                members, developers, planners, architects, and engineers — bringing
                disciplined execution and long-term value to every deal.
              </p>
              <div className="gold-rule" />
            </div>
          </div>
        </section>

        <section id="strategy" className="section strategy">
          <div className="container">
            <div className="section-heading">
              <h2>Our Approach</h2>
            </div>
            <div className="strategy__cards">
              {strategyCards.map((card) => (
                <article className="strategy-card" key={card.title}>
                  <span>{card.number}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
            <p className="strategy__line">
              We invest in real assets with real cash flow. We partner with investors for
              long-term wealth.
            </p>
          </div>
        </section>

        <section id="portfolio" className="section portfolio">
          <div className="container">
            <p className="section-label">Featured Asset</p>
            <article className="property-card">
              <div className="property-card__badge">Cash Flow + Redevelopment</div>
              <div className="property-card__image">
                <img
                  src="https://source.unsplash.com/1200x900/?commercial,retail,plaza"
                  alt="Commercial retail plaza"
                />
                <span>Kennedy & Denison Plaza, Markham</span>
              </div>
              <div className="property-card__details">
                <h2>Kennedy & Denison Plaza</h2>
                <div className="details-grid">
                  {propertyDetails.map(([label, value]) => (
                    <div className="detail" key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </article>
            <p className="portfolio__note">
              Situated in Markham&apos;s prime growth corridor, this fully-leased community
              plaza offers immediate income and long-term redevelopment upside.
            </p>
          </div>
        </section>

        <section className="section investment-case">
          <div className="container">
            <div className="section-heading section-heading--dark">
              <h2>The Investment Case</h2>
            </div>
            <div className="case-grid">
              {investmentCase.map((item) => (
                <article className="case-item" key={item.title}>
                  <div className="case-item__icon">
                    <Icon name={item.icon} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact__left">
            <div>
              <h2>Ready to Invest or Explore a Deal?</h2>
              <address>
                <a href="tel:4169195658">(416) 919-5658</a>
                <a href="mailto:pon@ponhome.com">pon@ponhome.com</a>
                <a href="https://www.ponhome.com">www.ponhome.com</a>
              </address>
              <a className="button button--gold" href="tel:4169195658">
                Book a Call
              </a>
            </div>
          </div>
          <div className="contact__right">
            <ContactForm />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
