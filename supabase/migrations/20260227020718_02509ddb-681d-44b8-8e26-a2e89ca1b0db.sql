
-- Drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Anyone can read registrations" ON public.registrations;
DROP POLICY IF EXISTS "Anyone can register" ON public.registrations;

CREATE POLICY "Anyone can read registrations"
  ON public.registrations
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can register"
  ON public.registrations
  FOR INSERT
  WITH CHECK (true);
