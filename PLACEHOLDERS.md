# Placeholders to replace

| Item | Where |
|---|---|
| Studio email (enables contact form + footer link) | `src/data/site.ts` → `email` |
| Social URLs — empty ones are hidden | `src/data/site.ts` → `socials` |
| Wishlist store link (activates the wishlist buttons) | `src/data/games.ts` → `wishlist` |
| Real KAALVAN screenshots / key art (set `placeholder: false`) | `src/assets/*`, `src/data/games.ts` → `gallery`, `cover` |
| Final logo / wordmark | `src/components/site/Wordmark.tsx`, `public/favicon.png` |
| Production domain (for absolute og:url / og:image) | route `head()` in `src/routes/*` |
| Share image (og:image, 1200x630, absolute URL) | leaf route `head()` once domain exists |
| News posts | `src/routes/news.tsx` → `posts` |
| Future game entries | add to `games` array in `src/data/games.ts` + a detail route |

All current imagery is AI-generated concept placeholder art, not KAALVAN gameplay.
