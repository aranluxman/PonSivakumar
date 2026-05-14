"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
};

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  {
    label: "Investment Strategy",
    href: "#strategy",
    children: [
      { label: "Strategic Approach", href: "#strategy" },
      { label: "Investment Solutions", href: "#solutions" },
      { label: "Investor Package", href: "/investor-package.html" }
    ]
  },
  {
    label: "Portfolio",
    href: "#portfolio",
    children: [
      { label: "Portfolio Map", href: "#portfolio-map" },
      { label: "Kennedy & Denison Plaza", href: "#portfolio" },
      {
        label: "9747 Bathurst Street",
        href: "https://www.ponhome.com/ON/north-richvale/l4c3x5/14837847-MLS-N12940302-na-9747-Bathurst-Street"
      }
    ]
  },
  { label: "Contact", href: "#contact" }
];

export function SiteChrome({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div className="site-header__inner">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Pon Sivakumar home">
            <Image
              src="/images/logo.svg"
              alt="Pon Sivakumar Commercial Real Estate"
              width={220}
              height={56}
              className="brand__logo"
              priority
            />
          </a>
          <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <div className="nav-item" key={item.label}>
                <a href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
                {item.children ? (
                  <div className="nav-dropdown">
                    {item.children.map((child) => (
                      <a href={child.href} key={child.label} onClick={closeMenu}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <a className="button button--gold nav-cta" href="#investor-form" onClick={closeMenu}>
              Book a Call
            </a>
            <button
              className={`menu-toggle ${open ? "is-open" : ""}`}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="site-footer__top">
          <div className="footer-brand">
            <Image
              src="/images/logo.svg"
              alt="Pon Sivakumar Commercial Real Estate"
              width={180}
              height={46}
              className="footer-brand__logo"
            />
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#strategy">Strategy</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-socials" aria-label="Contact links">
            <a href="tel:4169195658" aria-label="Call Pon Sivakumar">
              PH
            </a>
            <a href="mailto:pon@ponhome.com" aria-label="Email Pon Sivakumar">
              EM
            </a>
            <a href="https://www.ponhome.com/" aria-label="Visit Ponhome">
              WWW
            </a>
          </div>
        </div>
        <div className="footer-credentials">
          Pon Sivakumar, Sales Representative | VERTICAL MARKETING REALTY
        </div>
        <div className="site-footer__bottom">
          © 2025 Pon Sivakumar Commercial Real Estate. All rights reserved. Not an
          offering. For informational purposes only.
        </div>
      </footer>
    </>
  );
}
