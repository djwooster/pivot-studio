-- Audit submissions table
create table if not exists audit_submissions (
  id                uuid        primary key default gen_random_uuid(),
  created_at        timestamptz default now(),
  name              text        not null,
  email             text        not null,
  company           text        not null,
  role              text        not null,
  track             text        not null,
  answers           jsonb       not null,
  score             integer     not null,
  tier              text        not null,
  cats              jsonb       not null,
  financial_impact  jsonb,
  top_gap           text,
  source            text        default 'agency',
  pdf_url           text,
  cta_clicked       text,
  booking_url_used  text,
  results_url       text,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  shared_at         timestamptz
);

-- Enable RLS
alter table audit_submissions enable row level security;

-- Anyone can submit
create policy "Anyone can insert audit submissions"
  on audit_submissions for insert
  with check (true);

-- Only authenticated users can read
create policy "Authenticated users can read audit submissions"
  on audit_submissions for select
  using (auth.role() = 'authenticated');
