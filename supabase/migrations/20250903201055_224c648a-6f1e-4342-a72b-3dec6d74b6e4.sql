-- Create anonymous analytics table for website visits
-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table to store anonymous visits (no personal data)
CREATE TABLE IF NOT EXISTS public.analytics_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  country_code TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  user_agent TEXT,
  language TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Useful indexes for dashboard queries
CREATE INDEX IF NOT EXISTS idx_analytics_visits_started_at ON public.analytics_visits (started_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_visits_country ON public.analytics_visits (country);
CREATE INDEX IF NOT EXISTS idx_analytics_visits_path ON public.analytics_visits (path);

-- Trigger to maintain updated_at
DROP TRIGGER IF EXISTS update_analytics_visits_updated_at ON public.analytics_visits;
CREATE TRIGGER update_analytics_visits_updated_at
BEFORE UPDATE ON public.analytics_visits
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS and restrict to service role only (Edge Functions will use service role)
ALTER TABLE public.analytics_visits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access - analytics_visits" ON public.analytics_visits;
CREATE POLICY "Service role full access - analytics_visits"
ON public.analytics_visits
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');