import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { CounterStats } from "@/components/counter-stats";
import { SiteChrome } from "@/components/site-chrome";

const approachSteps = [
  {
    title: "Identify",
    text: "Source off-market commercial plazas, industrial assets, and development land in high-growth Ontario markets."
  },
  {
    title: "Acquire",
    text: "Conservative underwriting with disciplined due diligence, strong financing, and strategic entry pricing."
  },
  {
    title: "Optimize",
    text: "Leasing optimization, tenant repositioning, operational improvements, and value-add execution."
  },
  {
    title: "Distribute",
    text: "Deliver stable income to investors while building long-term equity through appreciation and redevelopment upside."
  }
];

const solutions = [
  {
    title: "Commercial Income Strategy",
    returns: "8%-12% Annually",
    points: [
      "Stable cash flow from fully leased retail plazas",
      "Monthly income distributions",
      "Income-backed financing",
      "Low-medium risk profile"
    ]
  },
  {
    title: "Development Growth Strategy",
    returns: "12%-18% Annually",
    points: [
      "Land assembly, rezoning, redevelopment",
      "Long-term equity appreciation",
      "Community-enhancing projects",
      "Growth-focused investors"
    ]
  },
  {
    title: "Private Partnerships",
    returns: "Project-Based",
    points: [
      "Joint ventures and co-investment",
      "Custom deal structures",
      "Exclusive for high-net-worth investors",
      "Direct asset ownership"
    ]
  }
];

const propertyCards = [
  {
    title: "Kennedy & Denison Plaza",
    badge: "Retail Plaza · Active",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=84",
    location: "Markham, Ontario",
    href: "/investor-package.html",
    stats: [
      ["GLA", "41,000 SF"],
      ["Lot", "4.12 Acres"],
      ["Occupancy", "100% Leased"],
      ["NOI", "$1.077M"]
    ],
    note: "Fully leased community plaza with cash flow today and redevelopment potential over the long term."
  },
  {
    title: "Napanee Development Site",
    badge: "Land Development · Pipeline",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=84",
    location: "Napanee, Ontario",
    href: "#investor-form",
    stats: [
      ["Type", "Land"],
      ["Use", "Mixed-Use"],
      ["Status", "Planning"],
      ["Strategy", "Development"]
    ],
    note: "Long-term development pipeline focused on thoughtful community growth and durable demand."
  },
  {
    title: "Selby Independent Living Project",
    badge: "Multi-Family · Pipeline",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=84",
    location: "Selby, Ontario",
    href: "#investor-form",
    stats: [
      ["Type", "Independent Living"],
      ["Phase", "Development"],
      ["Market", "Eastern Ontario"],
      ["Strategy", "Community Housing"]
    ],
    note: "A community-oriented housing concept designed for durable demand and disciplined development."
  },
  {
    title: "Richmond Hill Commercial Asset",
    badge: "Office · For Sale",
    image: "https://storage.googleapis.com/canadian/69cc1f7f0a7da2e7f58f6057.jpeg",
    location: "North Richvale, Richmond Hill",
    href: "https://www.ponhome.com/ON/north-richvale/l4c3x5/14837847-MLS-N12940302-na-9747-Bathurst-Street",
    stats: [
      ["MLS", "N12940302"],
      ["Price", "$2.398M"],
      ["Type", "Office"],
      ["Use", "Medical / Dental"]
    ],
    note: "Large-lot Richmond Hill opportunity with rental income potential and future commercial or redevelopment upside."
  }
];

const contactCards = [
  {
    icon: "phone",
    title: "Call Directly",
    text: "(416) 919-5658",
    href: "tel:4169195658"
  },
  {
    icon: "mail",
    title: "Send an Email",
    text: "pon@ponhome.com",
    href: "mailto:pon@ponhome.com"
  },
  {
    icon: "calendar",
    title: "Book a Call",
    text: "Investor Intake",
    href: "#investor-form"
  }
];

function ContactIcon({ name }: { name: string }) {
  if (name === "mail") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 9h22v14H5V9Z" />
        <path d="m6 10 10 8 10-8" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 8h18v17H7V8Z" />
        <path d="M11 5v6M21 5v6M7 13h18" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 6 7 9c-.8.8-.9 2-.3 3 3.1 5.6 7.7 10.2 13.3 13.3 1 .6 2.2.5 3-.3l3-3-5-5-2.5 2.5c-2.8-1.5-5.5-4.2-7-7L15 10l-5-4Z" />
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
          <div className="hero__grain" aria-hidden="true" />
          <div className="container hero__content">
            <p className="hero__eyebrow">Ontario Commercial Real Estate Investments</p>
            <h1>
              Transforming Strategic Real Estate Opportunities Into Long-Term Wealth
            </h1>
            <p className="hero__subtitle">
              Commercial, Industrial & Development-Grade Assets Across Ontario
            </p>
            <div className="hero__actions" aria-label="Primary actions">
              <a className="button button--gold" href="#investor-form">
                Book a Call
              </a>
              <a className="button button--outline" href="#portfolio">
                View Portfolio
              </a>
            </div>
            <CounterStats />
          </div>
        </section>

        <section className="metrics-strip" aria-label="Portfolio metrics">
          <div className="container">
            <CounterStats variant="strip" />
          </div>
        </section>

        <section id="strategy" className="section section--white approach">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="section-label">Our Strategic Investment Approach</p>
              <h2>Canadian Real Estate Investments Backed by 15 Years of Experience</h2>
            </div>
            <div className="approach-flow">
              {approachSteps.map((step, index) => (
                <article className="approach-step" key={step.title}>
                  <div className="approach-step__icon">{String(index + 1).padStart(2, "0")}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" className="section solutions">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="section-label">Investment Solutions</p>
              <h2>Our Investment Solutions</h2>
            </div>
            <div className="solutions-grid">
              {solutions.map((solution) => (
                <article className="solution-card" key={solution.title}>
                  <p className="solution-card__returns">Targeted Returns: {solution.returns}</p>
                  <h3>{solution.title}</h3>
                  <ul>
                    {solution.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a className="button button--gold" href="#investor-form">
                    Learn More
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="section portfolio">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="section-label">Portfolio</p>
              <h2>Our Commercial Real Estate Portfolio</h2>
            </div>
            <div id="portfolio-map" className="map-embed map-embed--portfolio">
              <iframe title="Portfolio map" src="/portfolio-map.html" loading="lazy" />
            </div>
            <div className="portfolio-grid">
              {propertyCards.map((property) => (
                <article className="portfolio-card" key={property.title}>
                  <div className="portfolio-card__image">
                    <Image src={property.image} alt="" fill sizes="(max-width: 980px) 100vw, 50vw" />
                  </div>
                  <div className="portfolio-card__body">
                    <span className="soft-badge">{property.badge}</span>
                    <h3>{property.title}</h3>
                    <p className="portfolio-card__location">{property.location}</p>
                    <div className="portfolio-card__stats">
                      {property.stats.map(([label, value]) => (
                        <div key={label}>
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                    <p>{property.note}</p>
                    <a className="text-link" href={property.href}>
                      View Details <span>-&gt;</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section section--white about">
          <div className="container about__grid">
            <div className="about__copy">
              <p className="section-label">Who We Are</p>
              <h2>Built From the Ground Up</h2>
              <p>
                Pon Sivakumar is a real estate entrepreneur who arrived in Canada in 2008
                and built his career through hands-on market experience. Starting as a
                single-family investor with over 10 residential properties, he earned his
                real estate license in 2014 and by 2018 had shifted his full focus to
                commercial real estate. Today, Pon is actively involved in retail plazas,
                industrial properties, mixed-use developments, multi-family projects, and
                land development across Ontario. He collaborates with CCIM and SIOR
                members, developers, planners, architects, and engineers - bringing
                disciplined execution and long-term value to every deal.
              </p>
              <a
                className="text-link"
                href="https://www.ponhome.com/ON/north-richvale/l4c3x5/14837847-MLS-N12940302-na-9747-Bathurst-Street"
              >
                Learn more about investment opportunities <span>-&gt;</span>
              </a>
            </div>
            <div className="portrait">
              <Image
                src="/images/pon-sivakumar-portrait.jpg"
                alt="Pon Sivakumar"
                fill
                sizes="(max-width: 980px) 100vw, 42vw"
                priority
              />
            </div>
          </div>
        </section>

        <section id="contact" className="section investor-form-section">
          <div className="container">
            <div id="investor-form" className="section-heading section-heading--center section-heading--dark">
              <p className="section-label">Investor Relations</p>
              <h2>Investment and Investor Partnership Opportunity</h2>
              <p>
                Complete the form below and Pon will be in touch within 24 hours to
                discuss how we can work together.
              </p>
            </div>
            <div className="form-card">
              <ContactForm />
            </div>
            <div className="contact-cards">
              {contactCards.map((card) => (
                <a className="contact-card" href={card.href} key={card.title}>
                  <ContactIcon name={card.icon} />
                  <span>{card.title}</span>
                  <strong>{card.text}</strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
