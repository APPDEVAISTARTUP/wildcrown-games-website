# KAALVAN website wishlist: Supabase setup

## Current deployment status

The public wishlist collects an email and optional name, then sends them to the `kaalvan-wishlist` Edge Function for immediate insertion. It does not use Supabase Auth, create accounts, send email, or require verification. New and duplicate entries receive the same `{ "success": true }` response. This website list is separate from the official Steam wishlist and must not be reported as Steam wishlist counts.

The migrations are applied and `kaalvan-wishlist` is deployed to Supabase project `wegngmtwehunxtlhxvlg`. The function uses server-side project credentials and secrets. The `wishlist_admins` allowlist is intentionally empty; admin viewing/export is therefore unavailable until an administrator is explicitly configured. The production website itself has not been deployed from this checkout.

An Auth user UUID is **not required** for the public wishlist flow, its Edge Function, database migrations, or RLS. The UUID is needed only if an Auth user is to be added to `wishlist_admins` for the optional admin view. The empty allowlist is a valid safe configuration, and public read access remains disabled.

## Local browser configuration

Set the Supabase Project URL and publishable key in `.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; they are already set in this local checkout. `.env.local` is ignored by Git. Set the Cloudflare Turnstile **site key** there as `VITE_TURNSTILE_SITE_KEY`. These are browser values; the Supabase publishable key is safe for browser use when RLS is enabled, and the Turnstile site key is public.

See `.env.example` for the variable names. Restart Vite after editing `.env.local`.

## Turnstile bot protection

1. The existing Cloudflare Turnstile widget is configured for `wildcrown.games`, `localhost`, and `127.0.0.1`; its public site key is in the ignored local `.env.local` file.
2. The Turnstile **secret key** is configured as the Supabase Edge Function secret `TURNSTILE_SECRET_KEY`. Never place it in a `VITE_` variable.
4. The Edge Function validates tokens with Cloudflare Siteverify and checks the expected hostname and action. The form also includes a honeypot field. If the public site key or server secret is missing, submissions fail closed.

## Rate limiting and privacy

The Edge Function enforces these per-window limits:

- 12 attempts per client IP per 10 minutes.
- 3 attempts per normalized email per 24 hours.

The IP and email values are HMAC-SHA-256 hashed with `RATE_LIMIT_HMAC_SECRET` before being sent to the private rate-limit RPC. Raw IP addresses and email addresses are not stored in the rate-limit table. Set `RATE_LIMIT_HMAC_SECRET` to a randomly generated secret of at least 32 bytes in Supabase Edge Function secrets. The rate-limit RPC and table are inaccessible to `anon` and `authenticated` roles.

The function allows the production origin `https://wildcrown.games`; development origins `http://localhost:8080` and `http://127.0.0.1:8080` are built in. The server-side `WISHLIST_ALLOWED_ORIGINS` setting is configured for production. CORS/origin checks supplement Turnstile and rate limiting; they are not treated as authentication.

## Database schema and migration order

Apply both files in timestamp order to the intended project after reviewing them:

1. `supabase/migrations/20261111000000_create_wishlist_registrations.sql` creates `public.wishlist_registrations`, its normalized unique index, `public.wishlist_admins`, RLS, and the admin-only select policy.
2. `supabase/migrations/20261111010000_wishlist_edge_function_and_rate_limits.sql` removes the old confirmed-email insert policy and helper function, revokes client insert rights, and adds the private rate-limit schema/RPC. It does not delete or alter wishlist registrations or admin rows.

The registration table has `id`, `game_slug` (constrained to `kaalvan`), `email`, optional `name`, and `created_at`. The existing unique index on `(game_slug, lower(btrim(email)))` remains the duplicate guard. The public Edge Function uses the service-role credential to insert; direct `anon` and `authenticated` clients have no insert grant or public read policy. Admin SELECT remains protected by Supabase Auth plus RLS.

## Edge Function deployment and server secrets

The Function lives at `supabase/functions/kaalvan-wishlist/index.ts`. `supabase/config.toml` sets `verify_jwt = false` because visitors do not sign in. The handler enforces origin allowlisting, Turnstile validation, IP/email rate limits, input validation, and generic duplicate handling itself.

Deploy with the Supabase CLI after linking this folder to the intended project:

```sh
supabase db push
supabase functions deploy kaalvan-wishlist
```

Supabase provides `SUPABASE_URL` and the server-side `SUPABASE_SERVICE_ROLE_KEY` to hosted Edge Functions. The function uses that key only in the Edge Function runtime to bypass RLS for inserts. Never copy it into `.env.local`, a `VITE_` variable, or frontend code. Add `TURNSTILE_SECRET_KEY`, `RATE_LIMIT_HMAC_SECRET`, and `WISHLIST_ALLOWED_ORIGINS` in the Supabase Dashboard's Edge Function secrets before enabling the function. Do not commit these values.

## Admin view and export

The `/admin/wishlists` page requires an authenticated Supabase Auth account and a matching row in `public.wishlist_admins`; RLS remains the enforcement boundary. It uses email/password sign-in and does not send email. The production allowlist is empty. If admin access is enabled later, create the admin account separately in Supabase Auth and add that user's actual Auth UUID using the SQL Editor:

```sql
insert into public.wishlist_admins (user_id)
values ('PASTE_AUTH_USER_UUID_HERE');
```

Only allowlisted admins can view/export registrations. With an empty allowlist no user can read or export registrations through the public website. Admin counts are labelled website registrations and are never Steam wishlist counts.

## Deployment boundaries

The Supabase migrations and Edge Function are deployed, but the website is not published and no GitHub push has been made. Do not reapply migrations or redeploy the function unless the local files have changed and the target project has been checked first. Never put `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`, or `RATE_LIMIT_HMAC_SECRET` in frontend code, `.env.local`, or Git.
