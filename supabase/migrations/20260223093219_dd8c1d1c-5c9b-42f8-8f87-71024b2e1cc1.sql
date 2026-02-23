
-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL,
  leader_name TEXT NOT NULL,
  leader_email TEXT NOT NULL,
  leader_phone TEXT NOT NULL,
  members TEXT[] NOT NULL DEFAULT '{}',
  college TEXT NOT NULL,
  payment_screenshot_path TEXT,
  unique_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration)
CREATE POLICY "Anyone can register" ON public.registrations
  FOR INSERT WITH CHECK (true);

-- Allow reading own registration by unique_id (we'll use anon for public access)
CREATE POLICY "Anyone can read registrations" ON public.registrations
  FOR SELECT USING (true);

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-screenshots', 'payment-screenshots', true);

-- Allow anyone to upload payment screenshots
CREATE POLICY "Anyone can upload payment screenshots"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'payment-screenshots');

-- Allow anyone to view payment screenshots
CREATE POLICY "Anyone can view payment screenshots"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'payment-screenshots');
