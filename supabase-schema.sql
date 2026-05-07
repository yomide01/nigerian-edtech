-- Enable pgvector extension for AI embeddings
create extension if not exists vector;

-- Universities table
create table if not exists universities (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  code text not null unique,
  created_at timestamp with time zone default now()
);

-- Users profile table (extends Supabase auth)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  university_id uuid references universities(id),
  faculty text,
  department text,
  level text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  university_id uuid references universities(id),
  faculty text,
  department text,
  level text,
  course_code text not null,
  course_title text,
  lecturer text,
  semester text,
  academic_session text,
  created_at timestamp with time zone default now()
);

-- Materials table (repository)
create table if not exists materials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  course_id uuid references courses(id),
  title text not null,
  description text,
  file_url text not null,
  file_type text,
  file_size bigint,
  material_type text check (material_type in ('lecture_note', 'past_question', 'assignment', 'lab_manual', 'handout', 'project', 'study_guide')),
  downloads integer default 0,
  upvotes integer default 0,
  downvotes integer default 0,
  verified boolean default false,
  created_at timestamp with time zone default now()
);

-- AI Chat history
create table if not exists ai_chats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  course_id uuid references courses(id),
  title text,
  created_at timestamp with time zone default now()
);

-- AI Chat messages
create table if not exists ai_messages (
  id uuid default gen_random_uuid() primary key,
  chat_id uuid references ai_chats(id) on delete cascade,
  role text check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default now()
);

-- Material embeddings for RAG
create table if not exists material_embeddings (
  id uuid default gen_random_uuid() primary key,
  material_id uuid references materials(id) on delete cascade,
  embedding vector(1536),
  chunk_text text,
  chunk_index integer,
  created_at timestamp with time zone default now()
);

-- Community ratings
create table if not exists material_ratings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  material_id uuid references materials(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  review text,
  created_at timestamp with time zone default now(),
  unique(user_id, material_id)
);

-- User reputation
create table if not exists user_reputation (
  user_id uuid references auth.users on delete cascade primary key,
  points integer default 0,
  uploads_count integer default 0,
  helpful_votes integer default 0,
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table materials enable row level security;
alter table ai_chats enable row level security;
alter table ai_messages enable row level security;
alter table material_ratings enable row level security;

-- Policies: Users can only see materials from their university
create policy "Users can view materials from their university"
  on materials for select
  using (
    course_id in (
      select c.id from courses c
      join profiles p on p.university_id = c.university_id
      where p.id = auth.uid()
    )
  );

-- Users can upload their own materials
create policy "Users can insert their own materials"
  on materials for insert
  with check (auth.uid() = user_id);

-- Users can update their own materials
create policy "Users can update their own materials"
  on materials for update
  using (auth.uid() = user_id);

-- Indexes for performance (scaling to 10M users)
create index if not exists idx_materials_course on materials(course_id);
create index if not exists idx_materials_university on materials(course_id);
create index if not exists idx_courses_university on courses(university_id);
create index if not exists idx_profiles_university on profiles(university_id);
create index if not exists idx_material_embeddings_material on material_embeddings(material_id);

-- Insert sample Nigerian universities
insert into universities (name, code) values
  ('University of Lagos', 'UNILAG'),
  ('Obafemi Awolowo University', 'OAU'),
  ('University of Ibadan', 'UI'),
  ('Lagos State University', 'LASU'),
  ('University of Nigeria, Nsukka', 'UNN'),
  ('Ahmadu Bello University', 'ABU'),
  ('University of Benin', 'UNIBEN'),
  ('Covenant University', 'CU'),
  ('Federal University of Technology, Akure', 'FUTA'),
  ('University of Ilorin', 'UNILORIN')
on conflict (code) do nothing;
