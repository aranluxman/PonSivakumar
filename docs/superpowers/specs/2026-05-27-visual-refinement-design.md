# Pon Sivakumar Visual Refinement Design

## Goal

Refine the existing Pon Sivakumar Commercial Real Estate website and the standalone investor package so both surfaces match the approved navy, white, warm grey, and gold institutional visual system.

## Scope

- Main Next.js website at `/`.
- Standalone investor package at `/investor-package.html`.
- Existing backend contact delivery and Vercel configuration remain unchanged.
- Chatbot removal remains unchanged.

## Main Website Design

The website keeps the current section order and content: fixed navbar, photo hero, stat strip, strategic approach, investment solutions, portfolio with map and property cards, about, investor form/contact cards, and footer.

The navbar becomes consistently white with dark navy logo and navigation from the first viewport. It remains fixed and gains only a subtle shadow when scrolled. The gold `Book a Call` CTA stays pill-shaped with dark navy uppercase text.

The hero keeps the skyscraper photo with a deep navy tint. Typography remains Playfair Display for the large white headline and Inter for all body, labels, buttons, and navigation. The secondary CTA uses a white outlined pill. Hero stats use gold serif numbers, white uppercase labels, and thin white dividers.

White sections use pure white. Investment solutions and portfolio use warm light grey. Contact and footer use deep navy. Cards use white backgrounds, restrained 12-16px rounding where specified, and subtle shadows. Property badges and stat blocks keep the gold and warm grey treatment.

The investor form keeps the smart conditional fields and backend submission. Form card remains white on navy, with rounded fields, gold focused states, gold selected pills, custom checkboxes, and a full-width gold submit button.

## Investor Package Design

The investor package keeps its eight-page memorandum structure but is restyled to match the website exactly: deep navy cover/contact pages, white or warm grey body pages, gold labels and accents, Playfair headings, Inter body copy, soft card shadows, and consistent 16px card rounding.

The print button remains fixed for screen users and hidden in print. Print styles preserve color, remove shadows, and keep section page breaks.

## Verification

Run lint, TypeScript, and production build. Inspect the rendered homepage and investor package in a browser at desktop and mobile sizes. Verify CTA anchors, investor package URL, and absence of chatbot references before committing and pushing.
