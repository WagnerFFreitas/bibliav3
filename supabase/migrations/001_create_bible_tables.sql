
-- Enable RLS
alter table if exists public.reading_history enable row level security;
alter table if exists public.study_notes enable row level security;
alter table if exists public.bookmarks enable row level security;

-- Create reading_history table
create table if not exists public.reading_history (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    livro text not null,
    capitulo integer not null,
    versiculo integer,
    versao text not null,
    texto text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create study_notes table
create table if not exists public.study_notes (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    livro text not null,
    capitulo integer not null,
    versiculo integer not null,
    versao text not null,
    note text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bookmarks table
create table if not exists public.bookmarks (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    livro text not null,
    capitulo integer not null,
    versiculo integer not null,
    versao text not null,
    texto text not null,
    note text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
create policy "Users can view own reading history" on public.reading_history
    for select using (auth.uid() = user_id);

create policy "Users can insert own reading history" on public.reading_history
    for insert with check (auth.uid() = user_id);

create policy "Users can update own reading history" on public.reading_history
    for update using (auth.uid() = user_id);

create policy "Users can delete own reading history" on public.reading_history
    for delete using (auth.uid() = user_id);

create policy "Users can view own study notes" on public.study_notes
    for select using (auth.uid() = user_id);

create policy "Users can insert own study notes" on public.study_notes
    for insert with check (auth.uid() = user_id);

create policy "Users can update own study notes" on public.study_notes
    for update using (auth.uid() = user_id);

create policy "Users can delete own study notes" on public.study_notes
    for delete using (auth.uid() = user_id);

create policy "Users can view own bookmarks" on public.bookmarks
    for select using (auth.uid() = user_id);

create policy "Users can insert own bookmarks" on public.bookmarks
    for insert with check (auth.uid() = user_id);

create policy "Users can update own bookmarks" on public.bookmarks
    for update using (auth.uid() = user_id);

create policy "Users can delete own bookmarks" on public.bookmarks
    for delete using (auth.uid() = user_id);
