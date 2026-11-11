-- KAALVAN website wishlist registrations.
-- This migration only creates new objects; it does not modify or delete existing data.

create table public.wishlist_registrations (
  id uuid primary key default gen_random_uuid(),
  game_slug text not null check (game_slug = 'kaalvan'),
  email text not null check (char_length(btrim(email)) between 3 and 254),
  name text null check (name is null or char_length(name) <= 100),
  created_at timestamptz not null default now()
);

create unique index wishlist_registrations_game_email_unique
  on public.wishlist_registrations (game_slug, lower(btrim(email)));

create table public.wishlist_admins (
  user_id uuid primary key references auth.users (id),
  created_at timestamptz not null default now()
);

alter table public.wishlist_registrations enable row level security;
alter table public.wishlist_admins enable row level security;

revoke all on table public.wishlist_registrations from public, anon, authenticated;
revoke all on table public.wishlist_admins from public, anon, authenticated;
grant usage on schema public to authenticated;
grant insert, select on table public.wishlist_registrations to authenticated;
grant select on table public.wishlist_admins to authenticated;

-- The caller can insert only an email belonging to their confirmed Auth user.
create function public.is_confirmed_wishlist_email(target_email text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users as u
    where u.id = (select auth.uid())
      and u.email_confirmed_at is not null
      and lower(btrim(u.email)) = lower(btrim(target_email))
  );
$$;

revoke all on function public.is_confirmed_wishlist_email(text) from public, anon;
grant execute on function public.is_confirmed_wishlist_email(text) to authenticated;

-- Admin membership is checked inside RLS without exposing other admins' IDs.
create function public.is_wishlist_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.wishlist_admins as a
    where a.user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_wishlist_admin() from public, anon;
grant execute on function public.is_wishlist_admin() to authenticated;

create policy "confirmed users can register their own email"
  on public.wishlist_registrations
  for insert
  to authenticated
  with check (
    game_slug = 'kaalvan'
    and (select public.is_confirmed_wishlist_email(email))
  );

create policy "wishlist admins can read registrations"
  on public.wishlist_registrations
  for select
  to authenticated
  using ((select public.is_wishlist_admin()));

create policy "users can check only their own admin membership"
  on public.wishlist_admins
  for select
  to authenticated
  using (user_id = (select auth.uid()));
