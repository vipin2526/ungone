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
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'closed_won', 'closed_lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

CREATE POLICY "Allow service role read on leads" 
ON leads FOR SELECT 
USING (true);

-- Create policies for newsletter_subscribers
CREATE POLICY "Allow public insert on newsletter_subscribers" 
ON newsletter_subscribers FOR INSERT 
WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Migration: Add status and notes columns to existing leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'closed_won', 'closed_lost'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create lead_history table to track status changes
CREATE TABLE IF NOT EXISTS lead_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by TEXT DEFAULT 'admin',
  notes TEXT,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on lead_history
ALTER TABLE lead_history ENABLE ROW LEVEL SECURITY;

-- Create policies for lead_history
CREATE POLICY "Allow service role read on lead_history" 
ON lead_history FOR SELECT 
USING (true);

CREATE POLICY "Allow service role insert on lead_history" 
ON lead_history FOR INSERT 
WITH CHECK (true);

-- Create index on lead_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_lead_history_lead_id ON lead_history(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_history_changed_at ON lead_history(changed_at DESC);

-- Create function to log lead status changes
CREATE OR REPLACE FUNCTION log_lead_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO lead_history (lead_id, old_status, new_status, notes)
        VALUES (NEW.id, OLD.status, NEW.status, NULL);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to log status changes
DROP TRIGGER IF EXISTS log_lead_status_change_trigger ON leads;
CREATE TRIGGER log_lead_status_change_trigger
    AFTER UPDATE OF status ON leads
    FOR EACH ROW
    EXECUTE FUNCTION log_lead_status_change();

-- Create admin_settings table for notification preferences
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_settings
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_settings
CREATE POLICY "Allow service role full access on admin_settings" 
ON admin_settings FOR ALL 
USING (true);

-- Insert default notification email
INSERT INTO admin_settings (key, value) 
VALUES ('notification_email', 'ungoneofficial@gmail.com')
ON CONFLICT (key) DO NOTHING;

-- Insert default notification enabled setting
INSERT INTO admin_settings (key, value) 
VALUES ('notifications_enabled', 'true')
ON CONFLICT (key) DO NOTHING;