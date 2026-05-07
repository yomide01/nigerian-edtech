-- Complete EduNaija Schema
-- Run this in Supabase Dashboard → SQL Editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Universities table
CREATE TABLE IF NOT EXISTS public.universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  university_id UUID REFERENCES public.universities(id),
  faculty TEXT,
  department TEXT,
  level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id UUID REFERENCES public.universities(id),
  faculty TEXT,
  department TEXT,
  level TEXT,
  course_code TEXT NOT NULL,
  course_title TEXT,
  lecturer TEXT,
  semester TEXT,
  academic_session TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Materials table (WITH university_id for isolation)
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id),
  university_id UUID REFERENCES public.universities(id),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  material_type TEXT CHECK (material_type IN ('lecture_note', 'past_question', 'assignment', 'lab_manual', 'handout', 'project', 'study_guide')),
  downloads INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AI Chats table
CREATE TABLE IF NOT EXISTS public.ai_chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id),
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AI Messages table
CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES public.ai_chats(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_materials_university ON public.materials(university_id);
CREATE INDEX IF NOT EXISTS idx_materials_user ON public.materials(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_university ON public.profiles(university_id);

-- Insert sample Nigerian universities
INSERT INTO public.universities (name, code) VALUES
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
ON CONFLICT (code) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

-- Policies for materials (school isolation)
CREATE POLICY IF NOT EXISTS "Users can view university materials" 
  ON public.materials FOR SELECT 
  USING (university_id = (SELECT university_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY IF NOT EXISTS "Users can insert own materials" 
  ON public.materials FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id AND 
    university_id = (SELECT university_id FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "Users can update own materials" 
  ON public.materials FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete own materials" 
  ON public.materials FOR DELETE 
  USING (auth.uid() = user_id);

-- Policies for profiles
CREATE POLICY IF NOT EXISTS "Users can view all profiles" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY IF NOT EXISTS "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Policies for AI chats
CREATE POLICY IF NOT EXISTS "Users can manage own chats" 
  ON public.ai_chats FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can manage own messages" 
  ON public.ai_messages FOR ALL 
  USING (
    chat_id IN (SELECT id FROM public.ai_chats WHERE user_id = auth.uid())
  );

-- Done!
SELECT 'Schema created successfully!' AS result;
