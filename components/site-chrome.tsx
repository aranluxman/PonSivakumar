"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ChatWidget } from "@/components/chat-widget";

const navItems = [
  ["About", "#about"],
  ["Investment Strategy", "#strategy"],
  ["Portfolio", "#portfolio"],
  ["Contact", "#contact"]
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
            <span className="brand__name">PON SIVAKUMAR</span>
            <span className="brand__descriptor">COMMERCIAL REAL ESTATE</span>
          </a>
          <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={href} onClick={closeMenu}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="button button--gold" href="tel:4169195658">
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
      <ChatWidget />
      <footer className="site-footer">
        <div className="site-footer__top">
          <div className="footer-brand">Pon Sivakumar Commercial Real Estate</div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#strategy">Strategy</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-contact">
            <a href="tel:4169195658">(416) 919-5658</a>
            <a href="mailto:pon@ponhome.com">pon@ponhome.com</a>
          </div>
        </div>
        <div className="site-footer__bottom">
          © 2025 Pon Sivakumar Commercial Real Estate. All rights reserved. Not an
          offering. For informational purposes only.
        </div>
      </footer>
    </>
  );
}
