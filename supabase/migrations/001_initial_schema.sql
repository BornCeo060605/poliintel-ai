-- PoliIntel AI Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'consultant' check (role in ('consultant', 'politician')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS for profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Constituencies
create table public.constituencies (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  code text unique,
  state text,
  region text,
  created_at timestamptz default now()
);

-- Booths
create table public.booths (
  id uuid default uuid_generate_v4() primary key,
  constituency_id uuid references public.constituencies on delete cascade,
  booth_number text not null,
  booth_name text,
  voter_count integer default 0,
  created_at timestamptz default now(),
  unique(constituency_id, booth_number)
);

-- Election data (booth-level)
create table public.election_data (
  id uuid default uuid_generate_v4() primary key,
  booth_id uuid references public.booths on delete cascade,
  election_year integer not null,
  our_votes integer default 0,
  opponent_votes integer default 0,
  other_votes integer default 0,
  total_turnout integer default 0,
  swing_pct numeric(5,2),
  created_at timestamptz default now()
);

-- Data uploads tracking
create table public.data_uploads (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  file_name text not null,
  rows_processed integer default 0,
  status text default 'processing' check (status in ('processing', 'completed', 'failed')),
  created_at timestamptz default now()
);

-- AI recommendations
create table public.ai_recommendations (
  id uuid default uuid_generate_v4() primary key,
  constituency_id uuid references public.constituencies on delete cascade,
  recommendation_type text check (recommendation_type in ('swing', 'turnout', 'risk', 'opportunity', 'campaign')),
  priority text check (priority in ('high', 'medium', 'low')),
  title text not null,
  description text,
  created_at timestamptz default now()
);

-- RLS for constituencies and booths
alter table public.constituencies enable row level security;
alter table public.booths enable row level security;
alter table public.election_data enable row level security;
alter table public.data_uploads enable row level security;
alter table public.ai_recommendations enable row level security;

create policy "Authenticated users can view all constituencies"
  on public.constituencies for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert constituencies"
  on public.constituencies for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can view all booths"
  on public.booths for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert booths"
  on public.booths for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can view election data"
  on public.election_data for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert election data"
  on public.election_data for insert
  with check (auth.role() = 'authenticated');

create policy "Users can view own uploads"
  on public.data_uploads for select
  using (auth.uid() = user_id);

create policy "Users can insert uploads"
  on public.data_uploads for insert
  with check (auth.uid() = user_id);

create policy "Authenticated users can view recommendations"
  on public.ai_recommendations for select
  using (auth.role() = 'authenticated');

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'email',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'role', 'consultant')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
