-- ============================================================
-- GovRise Platform — Full Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- ─── EXTENSIONS ─────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── PROFILES ───────────────────────────────────────────────
-- Extends Supabase auth.users with platform-specific fields
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  email         text,
  phone         text,
  job_title     text,
  role          text not null default 'refugee'
                  check (role in ('refugee','family','caseworker','ngo','government','sponsor','admin')),
  language      text not null default 'en',
  time_zone     text not null default 'UTC',
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'refugee')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── REGISTRATIONS ──────────────────────────────────────────
-- Refugee registration form submissions
create table if not exists public.registrations (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid references auth.users(id) on delete set null,
  reference_number    text unique not null default 'GR-' || floor(random() * 90000000 + 10000000)::text,

  -- Personal
  first_name          text not null,
  last_name           text not null,
  date_of_birth       date,
  gender              text,
  nationality         text,
  ethnicity           text,
  religion            text,
  phone               text,
  email               text,
  current_country     text,
  current_city        text,

  -- Family
  family_status       text default 'single',
  spouse_name         text,
  spouse_dob          date,
  children            jsonb default '[]',
  separated_family    boolean default false,
  separated_members   text,

  -- Situation
  refugee_status      text,
  displacement_date   date,
  origin_country      text,
  flight_reason       text,
  destination_country text,
  has_passport        boolean default false,
  has_travel_doc      boolean default false,
  special_needs       text[] default '{}',
  additional_needs    text,

  -- Documents
  documents           text[] default '{}',

  -- Meta
  status              text not null default 'pending'
                        check (status in ('pending','active','under_review','approved','closed')),
  notes               text,
  assigned_to         uuid references auth.users(id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table public.registrations enable row level security;

create policy "Users can view their own registrations"
  on public.registrations for select
  using (auth.uid() = user_id);

create policy "Caseworkers can view all registrations"
  on public.registrations for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

create policy "Anyone authenticated can insert a registration"
  on public.registrations for insert
  with check (auth.uid() is not null);

create policy "Caseworkers can update registrations"
  on public.registrations for update
  using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

-- ─── CASES ──────────────────────────────────────────────────
-- Collaboration case management
create table if not exists public.cases (
  id            uuid primary key default uuid_generate_v4(),
  case_id       text unique not null default 'AU-' || floor(random() * 9000 + 1000)::text,
  family        text not null,
  members       int not null default 1,
  status        text not null default 'In Progress',
  priority      text not null default 'Medium'
                  check (priority in ('High','Medium','Low')),
  progress      int not null default 0 check (progress between 0 and 100),
  due_date      text,
  created_by    uuid references auth.users(id) on delete set null,
  assigned_to   uuid[] default '{}',
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.cases enable row level security;

create policy "Authenticated users can view cases"
  on public.cases for select
  using (auth.uid() is not null);

create policy "Caseworkers can insert cases"
  on public.cases for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

create policy "Caseworkers can update cases"
  on public.cases for update
  using (
    auth.uid() = created_by or
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

-- ─── SUPPORT REQUESTS ───────────────────────────────────────
-- Find Support / matching requests
create table if not exists public.support_requests (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id) on delete cascade,
  provider_name     text not null,
  provider_category text,
  message           text,
  contact_phone     text,
  contact_email     text,
  status            text not null default 'pending'
                      check (status in ('pending','contacted','in_progress','resolved','closed')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.support_requests enable row level security;

create policy "Users can view their own support requests"
  on public.support_requests for select
  using (auth.uid() = user_id);

create policy "Users can insert support requests"
  on public.support_requests for insert
  with check (auth.uid() = user_id);

create policy "Caseworkers can view all support requests"
  on public.support_requests for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

-- ─── NOTIFICATIONS ──────────────────────────────────────────
create table if not exists public.notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade,
  title       text not null,
  message     text not null,
  type        text not null default 'system'
                check (type in ('case_update','document_reminder','interview','policy_update','support','training','system')),
  priority    text not null default 'low'
                check (priority in ('high','medium','low')),
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "System can insert notifications"
  on public.notifications for insert
  with check (auth.uid() is not null);

-- ─── UASC CASES ─────────────────────────────────────────────
-- Child protection cases — restricted access
create table if not exists public.uasc_cases (
  id              uuid primary key default uuid_generate_v4(),
  caseworker_id   uuid references auth.users(id) on delete set null,
  child_name      text not null,
  date_of_birth   date,
  gender          text,
  nationality     text,
  origin_country  text,
  guardian_name   text,
  guardian_role   text,
  current_location text,
  family_tracing  boolean default false,
  bид_completed   boolean default false,
  status          text not null default 'active'
                    check (status in ('active','family_found','reunified','resettled','closed')),
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.uasc_cases enable row level security;

create policy "Only caseworkers/government can access UASC cases"
  on public.uasc_cases for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

-- ─── DOCUMENTS ──────────────────────────────────────────────
-- Document metadata (actual files stored in Supabase Storage)
create table if not exists public.documents (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id) on delete cascade,
  registration_id   uuid references public.registrations(id) on delete set null,
  name              text not null,
  doc_type          text,
  file_size         text,
  storage_path      text not null,
  is_verified       boolean default false,
  uploaded_at       timestamptz not null default now()
);

alter table public.documents enable row level security;

create policy "Users can view their own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can upload their own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Caseworkers can view all documents"
  on public.documents for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

-- ─── UPDATED_AT TRIGGER ─────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_registrations_updated_at
  before update on public.registrations
  for each row execute procedure public.set_updated_at();

create trigger set_cases_updated_at
  before update on public.cases
  for each row execute procedure public.set_updated_at();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_support_requests_updated_at
  before update on public.support_requests
  for each row execute procedure public.set_updated_at();

-- ─── REALTIME ───────────────────────────────────────────────
-- Enable realtime for key tables
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.cases;
alter publication supabase_realtime add table public.registrations;

-- ─── STORAGE BUCKET ─────────────────────────────────────────
-- Run this separately if needed:
-- insert into storage.buckets (id, name, public) values ('documents', 'documents', false);

-- ─── KNOWLEDGE BASE (AI / RAG) ──────────────────────────────
-- Store documents and URL content used to power the AI assistant

create table if not exists public.knowledge_documents (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  source_url  text,
  source_type text not null default 'manual'
                check (source_type in ('manual', 'url', 'pdf')),
  category    text not null default 'general'
                check (category in ('general','unhcr','government','legal','policy','training')),
  content     text not null,
  added_by    uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Full-text search index (English + multilingual fallback)
create index if not exists knowledge_documents_fts
  on public.knowledge_documents
  using gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,'')));

alter table public.knowledge_documents enable row level security;

-- Anyone authenticated can read knowledge documents
create policy "Authenticated users can read knowledge base"
  on public.knowledge_documents for select
  using (auth.uid() is not null);

-- Only caseworkers/admins/ngo can add or delete
create policy "Staff can manage knowledge base"
  on public.knowledge_documents for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('caseworker','ngo','government','admin')
    )
  );

-- Chat history
create table if not exists public.chat_messages (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade,
  role        text not null check (role in ('user','assistant')),
  content     text not null,
  created_at  timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

create policy "Users can read their own chat history"
  on public.chat_messages for select
  using (auth.uid() = user_id);

create policy "Users can insert their own messages"
  on public.chat_messages for insert
  with check (auth.uid() = user_id);
