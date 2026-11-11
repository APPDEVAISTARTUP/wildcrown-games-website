-- Move public wishlist writes to a protected Edge Function.
-- Existing wishlist rows, the unique index, and admin read access are preserved.

drop policy if exists "confirmed users can register their own email"
  on public.wishlist_registrations;
revoke insert on table public.wishlist_registrations from public, anon, authenticated;
grant select on table public.wishlist_registrations to authenticated;
grant insert on table public.wishlist_registrations to service_role;
drop function if exists public.is_confirmed_wishlist_email(text);

create schema wishlist_private;
revoke all on schema wishlist_private from public, anon, authenticated;

create table wishlist_private.rate_limits (
  key_hash text primary key check (key_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0)
);
revoke all on table wishlist_private.rate_limits from public, anon, authenticated;

-- Atomic fixed-window counter used only by the Edge Function's service role.
create function public.consume_wishlist_rate_limit(
  p_key_hash text,
  p_max_requests integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed boolean;
begin
  if p_key_hash !~ '^[0-9a-f]{64}$'
    or p_max_requests < 1
    or p_max_requests > 1000
    or p_window_seconds < 1
    or p_window_seconds > 604800 then
    raise exception 'Invalid wishlist rate limit parameters';
  end if;

  insert into wishlist_private.rate_limits as current_limit (key_hash, window_started_at, request_count)
  values (p_key_hash, statement_timestamp(), 1)
  on conflict (key_hash) do update
    set window_started_at = case
          when current_limit.window_started_at <= statement_timestamp() - (p_window_seconds * interval '1 second')
            then statement_timestamp()
          else current_limit.window_started_at
        end,
        request_count = case
          when current_limit.window_started_at <= statement_timestamp() - (p_window_seconds * interval '1 second')
            then 1
          else current_limit.request_count + 1
        end
  returning current_limit.request_count <= p_max_requests into allowed;

  -- Opportunistically remove expired hashes so the rate-limit table stays bounded.
  if random() < 0.01 then
    delete from wishlist_private.rate_limits
    where window_started_at < statement_timestamp() - interval '2 days';
  end if;

  return allowed;
end;
$$;

revoke all on function public.consume_wishlist_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_wishlist_rate_limit(text, integer, integer) to service_role;
