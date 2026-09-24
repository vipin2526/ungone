-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interested TEXT,
  message TEXT NOT NULL,
  lead_type TEXT NOT NULL CHECK (lead_type IN ('contact', 'audit_request')),
  source_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for leads (allow insert from anon/public)
CREATE POLICY "Allow public insert on leads" 
ON leads FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read on leads" 
ON leads FOR SELECT 
USING (false); -- No public reads, only via service role

-- Create policies for newsletter_subscribers
CREATE POLICY "Allow public insert on newsletter_subscribers" 
ON newsletter_subscribers FOR INSERT 
WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);