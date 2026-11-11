/**
 * SITE CONFIG — every placeholder lives here. See PLACEHOLDERS.md.
 * Empty strings are hidden from the live UI automatically.
 */
export const site = {
  name: "WILDCROWN GAMES",
  // TODO: replace with the real studio email, e.g. "hello@yourdomain.com". While empty, the
  // contact form shows a "not configured" notice instead of pretending to send.
  email: "",
  // TODO: add real social URLs. Empty values are not rendered.
  socials: [
    { label: "YouTube", url: "https://www.youtube.com/@WildcrownGames" },
    { label: "Instagram", url: "https://www.instagram.com/wildcrowngames/" },
  ],
};

export const activeSocials = () => site.socials.filter((s) => s.url.trim().length > 0);
