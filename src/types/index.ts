export type AppType = "terrenos" | "bloompay" | "agrocity";

export type UserRole = "hq_admin" | "branch_manager" | "branch_staff" | "investor" | "super_admin";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: "hq" | "branch" | "subsidiary";
  parent_id: string | null;
  settings: Record<string, unknown>;
  created_at: string;
}

export interface Branch {
  id: string;
  organization_id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  manager_id: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Subsidiary {
  id: string;
  organization_id: string;
  name: string;
  type: "bloompay" | "agrocity";
  slug: string;
  is_active: boolean;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  organization_id: string;
  branch_id: string | null;
  subsidiary_ids: string[];
  is_active: boolean;
  last_seen: string | null;
  created_at: string;
}

export interface Client {
  id: string;
  organization_id: string;
  branch_id: string;
  full_name: string;
  email: string | null;
  phone: string;
  source: "facebook" | "instagram" | "google" | "whatsapp" | "referral" | "walk_in" | "other";
  stage: "lead" | "prospect" | "negotiation" | "won" | "lost";
  score: number;
  assigned_to: string | null;
  notes: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Investor {
  id: string;
  user_id: string;
  subsidiary_id: string;
  investor_code: string;
  kyc_status: "pending" | "verified" | "rejected";
  wallet_balance: number;
  total_invested: number;
  total_returns: number;
  referral_code: string;
  referred_by: string | null;
  created_at: string;
}

export interface Investment {
  id: string;
  investor_id: string;
  plan_id: string;
  amount: number;
  returns_expected: number;
  returns_paid: number;
  status: "active" | "matured" | "withdrawn" | "cancelled";
  start_date: string;
  maturity_date: string;
  created_at: string;
}

export interface Property {
  id: string;
  organization_id: string;
  name: string;
  estate_name: string;
  type: "residential" | "commercial" | "land" | "industrial";
  status: "available" | "reserved" | "sold" | "off_plan";
  price: number;
  location: string;
  state: string;
  units_total: number;
  units_available: number;
  features: string[];
  images: string[];
  created_at: string;
}

export interface Transaction {
  id: string;
  organization_id: string;
  client_id: string | null;
  investor_id: string | null;
  property_id: string | null;
  investment_id: string | null;
  type: "payment" | "deposit" | "withdrawal" | "return" | "commission";
  amount: number;
  status: "pending" | "completed" | "failed" | "reversed";
  reference: string;
  description: string;
  created_at: string;
}

export interface Payment {
  id: string;
  client_id: string;
  property_id: string;
  total_amount: number;
  amount_paid: number;
  outstanding: number;
  installment_plan: "outright" | "6_months" | "12_months" | "24_months";
  next_due_date: string | null;
  status: "active" | "completed" | "defaulted";
  created_at: string;
}

export interface ChatRoom {
  id: string;
  organization_id: string;
  name: string | null;
  type: "direct" | "group" | "broadcast";
  participants: string[];
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  type: "text" | "image" | "voice" | "document" | "system";
  media_url: string | null;
  read_by: string[];
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: string;
  data: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  organization_id: string;
  action: string;
  resource: string;
  resource_id: string;
  changes: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

export interface Analytics {
  id: string;
  organization_id: string;
  metric: string;
  value: number;
  dimensions: Record<string, unknown>;
  period: string;
  created_at: string;
}

export interface InvestmentPlan {
  id: string;
  subsidiary_id: string;
  name: string;
  description: string;
  min_amount: number;
  max_amount: number;
  roi_percent: number;
  duration_months: number;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface FarmCycle {
  id: string;
  subsidiary_id: string;
  name: string;
  crop_type: string;
  location: string;
  start_date: string;
  harvest_date: string;
  status: "planting" | "growing" | "harvesting" | "completed";
  total_plots: number;
  available_plots: number;
  price_per_plot: number;
  expected_roi: number;
  created_at: string;
}
