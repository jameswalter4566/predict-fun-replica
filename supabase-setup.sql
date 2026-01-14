-- Supabase Setup SQL for Predict.fun Replica
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/bqncfjnigubyictxbliq/sql

-- Create users table for storing user profiles
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    privy_user_id TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT,
    bio TEXT,
    profile_photo_url TEXT,
    wallet_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_privy_user_id ON public.users(privy_user_id);
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON public.users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read user profiles (public profiles)
CREATE POLICY "Users are publicly viewable" ON public.users
    FOR SELECT USING (true);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update the updated_at column
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.users TO anon;
GRANT ALL ON public.users TO authenticated;

-- ===========================================
-- STORAGE BUCKET SETUP
-- ===========================================
-- Note: Storage buckets need to be created via the Supabase Dashboard UI
-- Go to: Storage > New Bucket
-- Name: avatars
-- Public bucket: Yes (check the box)
--
-- Then add this policy via SQL or the UI:

-- Allow public read access to avatars bucket
-- (Run this after creating the bucket)
-- INSERT INTO storage.policies (name, bucket_id, operation, definition)
-- VALUES (
--     'Public Read Access',
--     'avatars',
--     'SELECT',
--     'true'
-- );

-- ===========================================
-- PROJECTS TABLE (for tracking user-owned projects)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for projects
CREATE POLICY "Projects are publicly viewable" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Users can create projects" ON public.projects
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own projects" ON public.projects
    FOR UPDATE USING (true);

-- Grant permissions
GRANT ALL ON public.projects TO anon;
GRANT ALL ON public.projects TO authenticated;

-- Create trigger for projects updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
