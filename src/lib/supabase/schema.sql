-- TERRENOS RMS Multi-Tenant Enterprise Schema
-- Run this in your Supabase SQL editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- ORGANIZATIONS (HQ, Branches, Subsidiaries)
-- ============================================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hq', 'branch', 'subsidiary')),
  parent_id UUID REFERENCES organizations(id),
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Nigeria',
  address TEXT,
  phone TEXT,
  email TEXT,
  manager_id UUID,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subsidiaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bloompay', 'agrocity')),
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- USERS, ROLES & PERMISSIONS
-- ============================================================
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  permissions JSONB DEFAULT '[]',
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  UNIQUE(resource, action)
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'branch_staff' CHECK (role IN ('super_admin', 'hq_admin', 'branch_manager', 'branch_staff', 'investor')),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  branch_id UUID REFERENCES branches(id),
  subsidiary_ids UUID[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_seen TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Back-reference manager after users table exists
ALTER TABLE branches ADD CONSTRAINT branches_manager_fk FOREIGN KEY (manager_id) REFERENCES users(id);

-- ============================================================
-- CLIENTS (CRM)
-- ============================================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  branch_id UUID NOT NULL REFERENCES branches(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'other' CHECK (source IN ('facebook', 'instagram', 'google', 'whatsapp', 'referral', 'walk_in', 'other')),
  stage TEXT NOT NULL DEFAULT 'lead' CHECK (stage IN ('lead', 'prospect', 'negotiation', 'won', 'lost')),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  ad_campaign_id TEXT,
  ad_source_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVESTORS
-- ============================================================
CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  subsidiary_id UUID NOT NULL REFERENCES subsidiaries(id),
  investor_code TEXT UNIQUE NOT NULL,
  kyc_status TEXT NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  kyc_documents JSONB DEFAULT '[]',
  wallet_balance NUMERIC(15, 2) DEFAULT 0,
  total_invested NUMERIC(15, 2) DEFAULT 0,
  total_returns NUMERIC(15, 2) DEFAULT 0,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES investors(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVESTMENT PLANS
-- ============================================================
CREATE TABLE investment_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subsidiary_id UUID NOT NULL REFERENCES subsidiaries(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  min_amount NUMERIC(15, 2) NOT NULL,
  max_amount NUMERIC(15, 2),
  roi_percent NUMERIC(5, 2) NOT NULL,
  duration_months INTEGER NOT NULL,
  payout_frequency TEXT NOT NULL DEFAULT 'maturity' CHECK (payout_frequency IN ('monthly', 'quarterly', 'maturity')),
  is_active BOOLEAN DEFAULT true,
  slots_total INTEGER,
  slots_taken INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVESTMENTS
-- ============================================================
CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID NOT NULL REFERENCES investors(id),
  plan_id UUID NOT NULL REFERENCES investment_plans(id),
  amount NUMERIC(15, 2) NOT NULL,
  returns_expected NUMERIC(15, 2) NOT NULL,
  returns_paid NUMERIC(15, 2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'matured', 'withdrawn', 'cancelled')),
  start_date DATE NOT NULL,
  maturity_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FARM CYCLES (Agrocity specific)
-- ============================================================
CREATE TABLE farm_cycles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subsidiary_id UUID NOT NULL REFERENCES subsidiaries(id),
  name TEXT NOT NULL,
  crop_type TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  start_date DATE NOT NULL,
  harvest_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'planting' CHECK (status IN ('planting', 'growing', 'harvesting', 'completed')),
  total_plots INTEGER NOT NULL,
  available_plots INTEGER NOT NULL,
  price_per_plot NUMERIC(15, 2) NOT NULL,
  expected_roi NUMERIC(5, 2) NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROPERTIES
-- ============================================================
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  estate_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('residential', 'commercial', 'land', 'industrial')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold', 'off_plan')),
  price NUMERIC(15, 2) NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  size_sqm NUMERIC(10, 2),
  units_total INTEGER DEFAULT 1,
  units_available INTEGER DEFAULT 1,
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  documents TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRANSACTIONS
-- ============================================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  client_id UUID REFERENCES clients(id),
  investor_id UUID REFERENCES investors(id),
  property_id UUID REFERENCES properties(id),
  investment_id UUID REFERENCES investments(id),
  type TEXT NOT NULL CHECK (type IN ('payment', 'deposit', 'withdrawal', 'return', 'commission', 'refund')),
  amount NUMERIC(15, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'reversed')),
  reference TEXT UNIQUE NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PAYMENTS (Installment Plans)
-- ============================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id),
  property_id UUID NOT NULL REFERENCES properties(id),
  total_amount NUMERIC(15, 2) NOT NULL,
  amount_paid NUMERIC(15, 2) DEFAULT 0,
  outstanding NUMERIC(15, 2) NOT NULL,
  installment_plan TEXT NOT NULL CHECK (installment_plan IN ('outright', '6_months', '12_months', '24_months')),
  next_due_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'defaulted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CHAT
-- ============================================================
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT,
  type TEXT NOT NULL DEFAULT 'direct' CHECK (type IN ('direct', 'group', 'broadcast')),
  participants UUID[] NOT NULL DEFAULT '{}',
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'image', 'voice', 'document', 'system')),
  media_url TEXT,
  read_by UUID[] DEFAULT '{}',
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id UUID,
  changes JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS
-- ============================================================
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  metric TEXT NOT NULL,
  value NUMERIC(20, 4) NOT NULL,
  dimensions JSONB DEFAULT '{}',
  period TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_branch ON users(branch_id);
CREATE INDEX idx_clients_organization ON clients(organization_id);
CREATE INDEX idx_clients_branch ON clients(branch_id);
CREATE INDEX idx_clients_stage ON clients(stage);
CREATE INDEX idx_clients_score ON clients(score DESC);
CREATE INDEX idx_investors_user ON investors(user_id);
CREATE INDEX idx_investors_subsidiary ON investors(subsidiary_id);
CREATE INDEX idx_investments_investor ON investments(investor_id);
CREATE INDEX idx_investments_status ON investments(status);
CREATE INDEX idx_properties_organization ON properties(organization_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_transactions_organization ON transactions(organization_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_messages_room ON messages(room_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_audit_organization ON audit_logs(organization_id, created_at DESC);
CREATE INDEX idx_analytics_organization ON analytics(organization_id, metric, period);

-- Full text search on clients
CREATE INDEX idx_clients_search ON clients USING gin(to_tsvector('english', full_name || ' ' || COALESCE(email, '') || ' ' || phone));

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE subsidiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can see their own notifications
CREATE POLICY "users_own_notifications" ON notifications
  FOR ALL USING (auth.uid()::text = user_id::text);

-- Users can read their organization's data
CREATE POLICY "org_users_read" ON users
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()
    )
  );
