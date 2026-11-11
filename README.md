# Wildcrown Games Website

Build a complete, polished, premium AAA-cinematic website for WILDCROWN GAMES, an independent game development studio. This is a public-facing studio website, not a SaaS dashboard.

BRAND & ART DIRECTION
- Studio name: WILDCROWN GAMES
- Positioning: Independent game development studio creating immersive worlds and memorable experiences.
- Visual direction: premium dark cinematic, immersive, restrained, editorial, high-end game-studio presentation.
- Palette: near-black/charcoal backgrounds, warm ivory typography, muted antique-gold accents, occasional deep crimson only for subtle emphasis.
- Typography: bold condensed/editorial display face for headlines, clean modern sans-serif for body copy.
- Use generous negative space, strong image composition, fine borders, subtle grain, elegant hover states, restrained motion and smooth scrolling.
- Avoid generic gaming neon, cyberpunk overload, dashboard layouts, excessive gradients, emoji, fake awards, fake testimonials, fake metrics, fake team members, or invented studio history.
- Make it visually exceptional on desktop and mobile, with accessible contrast, reduced-motion support, responsive navigation and performant media.

CORE CONTENT / TRUTHFULNESS
- Flagship featured title: KAALVAN.
- KAALVAN is an upcoming first-person horror game developed in Unreal Engine 5, inspired by Indian folklore, ancient mysteries, occult themes and supernatural horror. Core gameplay direction: exploration, puzzles and survival. The central threat is an unknown entity.
- Development is around 80–90% complete; polishing is still underway. Do not claim released, available now, launch date confirmed, Steam wishlist live, multiplayer, specific story characters, platforms, price, awards, or other unverified features.
- An official teaser exists and has been released/scheduled for November 10, 2026. Do not fabricate a video URL. Create a polished teaser/video section with an obvious editable placeholder and a clearly labelled TODO for the real YouTube URL. If no real URL is configured, show a tasteful “Teaser” visual panel rather than a broken player.
- Use provided game screenshots only if actually supplied to this Lovable project. Otherwise use cinematic image placeholders relevant to ancient Indian stone architecture, mysterious forest, temple corridors and underground chambers; keep all imagery replaceable and do not imply placeholder imagery is actual gameplay.
- Studio location, founder bio, contact email, social handles, domain and other game titles are unknown. Do not invent them. Use editable placeholders such as [Studio email], [Instagram URL], [YouTube URL] and hide empty social links on the live UI.

SITE STRUCTURE
1. HOME (/)
   - Full-screen cinematic hero with studio wordmark, concise headline such as “WE CREATE WORLDS. YOU LIVE THE STORIES.”, short studio intro and clear CTA “EXPLORE OUR GAMES”.
   - Featured KAALVAN showcase with strong visual panel, game genre, Unreal Engine 5 label, short factual description and CTA to game page.
   - Studio philosophy / craft section.
   - Latest news/updates section with clearly marked sample content only if needed; preferably use an “Updates coming soon” state rather than fabricated news.
   - Strong footer with navigation and editable contact/social placeholders.
2. GAMES (/games)
   - Portfolio grid designed to scale to multiple titles.
   - KAALVAN is the only confirmed title. Do not invent other games. Make the card feel premium and link to /games/kaalvan.
   - If future titles are added, make it easy to add them later.
3. KAALVAN DETAIL (/games/kaalvan)
   - Cinematic hero, title treatment, concise overview, genre and engine metadata.
   - Sections for atmosphere, exploration, puzzles and survival, written as design intent rather than unsupported feature promises.
   - Teaser module with editable YouTube URL placeholder; no fake embed.
   - Screenshot/gallery component using clearly replaceable placeholders if no real images are provided.
   - CTA for press/business enquiries, not a fake purchase button.
4. ABOUT (/about)
   - Studio mission and creative philosophy. Keep it concise and credible.
   - No invented team names, founding date, company size, awards or past releases.
5. NEWS (/news)
   - Elegant updates index. Since no verified posts are supplied, show an honest empty state such as “The next transmission is on its way.”
6. CONTACT (/contact)
   - Business, publishing, press and general enquiry categories.
   - Functional contact form with frontend validation and clear success/error states. Do not pretend messages are sent unless a backend/email integration is actually configured. If no backend is available, make a mailto-based contact option with editable placeholder address and explain setup requirement in code/comments.
   - Do not expose personal private details.

FUNCTIONAL & TECHNICAL REQUIREMENTS
- Use Lovable's default stack (React + TypeScript + Tailwind + shadcn/ui as appropriate).
- Build reusable components, clean route structure, maintainable data-driven game cards and consistent design tokens.
- Functional responsive nav, mobile menu, internal links, CTA buttons, gallery interactions and accessible keyboard focus.
- Add tasteful motion only; respect prefers-reduced-motion.
- Add SEO title/description, Open Graph placeholders, favicon/wordmark treatment and semantic heading hierarchy.
- Ensure no dead links, no broken media, no lorem ipsum, no fake forms, no console errors.
- Optimize images and lazy-load below-the-fold media.
- Add a README or clear project notes listing every placeholder to replace: exact domain, studio email, social URLs, official teaser URL, real KAALVAN screenshots/artwork, final logo/wordmark and any future game entries.
- Do not connect a custom domain, publish publicly, configure external services, or purchase anything. Just create and build the site in this Lovable project.
- Before finishing, review every page at desktop and mobile sizes and fix layout issues.

The finished result should feel like the official website of a serious independent game studio approaching international press and publishing partners. Prioritize visual craft, clarity, credibility and a memorable KAALVAN presentation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/aec1c06e-4c53-4730-87f2-9f397a0284f0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
