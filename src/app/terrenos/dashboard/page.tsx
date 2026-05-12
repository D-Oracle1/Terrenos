"use client";

import { motion } from "framer-motion";
import { TerrenosBottomNav } from "@/components/terrenos/bottom-nav";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import {
  TrendingUp, TrendingDown, Users, Building2, DollarSign,
  Bell, ChevronRight, ArrowUpRight, Activity, Target, Zap,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000000, target: 45000000 },
  { month: "Feb", revenue: 51000000, target: 48000000 },
  { month: "Mar", revenue: 47000000, target: 50000000 },
  { month: "Apr", revenue: 63000000, target: 55000000 },
  { month: "May", revenue: 58000000, target: 60000000 },
  { month: "Jun", revenue: 72000000, target: 65000000 },
];

const branchData = [
  { name: "Lagos", value: 38 },
  { name: "Abuja", value: 28 },
  { name: "PH", value: 20 },
  { name: "Ibadan", value: 14 },
];

const kpiCards = [
  {
    label: "Total Revenue",
    value: formatCurrency(333_000_000),
    change: +12.4,
    icon: DollarSign,
    trend: "up",
  },
  {
    label: "Active Clients",
    value: formatNumber(2847),
    change: +8.2,
    icon: Users,
    trend: "up",
  },
  {
    label: "Properties Sold",
    value: formatNumber(143),
    change: -2.1,
    icon: Building2,
    trend: "down",
  },
  {
    label: "Conversion Rate",
    value: "34.8%",
    change: +5.7,
    icon: Target,
    trend: "up",
  },
];

const recentActivity = [
  { name: "Adebayo Johnson", action: "Property Reserved", estate: "Greenfield Estate", amount: 12500000, time: "2m ago", status: "success" },
  { name: "Chioma Okafor", action: "Payment Received", estate: "Royal Garden", amount: 5000000, time: "15m ago", status: "success" },
  { name: "Ibrahim Musa", action: "Lead Created", estate: "CRM - Facebook Ad", amount: null, time: "1h ago", status: "info" },
  { name: "Fatima Abubakar", action: "Contract Signed", estate: "Paradise Homes", amount: 22000000, time: "2h ago", status: "success" },
];

const subsidiaryPerf = [
  { name: "Bloompay", invested: 840000000, returns: 62000000, investors: 1243, color: "#2563eb" },
  { name: "Agrocity", invested: 420000000, returns: 38000000, investors: 876, color: "#4ade80" },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#d4af37]/20 rounded-xl px-3 py-2 text-xs">
        <p className="text-[#d4af37] font-semibold">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function TerrenosDashboard() {
  return (
    <div className="min-h-dvh bg-[#0a0a0a] safe-pb">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-5 pt-12 pb-4"
        style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.95) 100%)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 text-xs tracking-widest uppercase"
            >
              Good morning
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-white"
            >
              Executive Dashboard
            </motion.h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 rounded-xl glass flex items-center justify-center"
            >
              <Bell size={18} className="text-white/60" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d4af37]" />
            </motion.button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)" }}
            >
              <span className="text-[#0a0a0a] text-xs font-black">HQ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 space-y-5">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(0,0,0,0.6))",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider">Revenue Overview</p>
              <p className="text-2xl font-bold text-white mt-0.5">{formatCurrency(333_000_000)}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <TrendingUp size={12} className="text-green-400" />
                <span className="text-green-400 text-xs font-medium">+12.4% vs last period</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Activity size={14} className="text-[#d4af37]" />
              <span className="text-[#d4af37] text-xs font-semibold">Live</span>
            </div>
          </div>
          <div className="h-36 px-1 pb-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#d4af37"
                  strokeWidth={2}
                  fill="url(#goldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          {kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            const isUp = kpi.trend === "up";
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="rounded-2xl p-4"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(0,0,0,0.5))",
                  border: "1px solid rgba(212,175,55,0.12)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(212,175,55,0.15)" }}
                  >
                    <Icon size={16} className="text-[#d4af37]" />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-green-400" : "text-red-400"}`}>
                    {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {formatPercent(kpi.change)}
                  </div>
                </div>
                <p className="text-xl font-bold text-white">{kpi.value}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{kpi.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Branch Performance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(0,0,0,0.5))",
            border: "1px solid rgba(212,175,55,0.12)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/50 text-xs uppercase tracking-wider">Branch Performance</p>
            <button className="flex items-center gap-1 text-[#d4af37] text-xs">
              View All <ChevronRight size={12} />
            </button>
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-[#1a1a1a] border border-[#d4af37]/20 rounded-lg px-2 py-1 text-xs text-[#d4af37]">
                        {payload[0].value}%
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="value" fill="#d4af37" radius={[4, 4, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subsidiary Performance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl p-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-white/50 text-xs uppercase tracking-wider mb-4">Subsidiary Performance</p>
          <div className="space-y-3">
            {subsidiaryPerf.map((sub) => (
              <div key={sub.name} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black"
                  style={{ background: `${sub.color}20`, color: sub.color }}
                >
                  {sub.name.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-semibold">{sub.name}</span>
                    <span className="text-xs text-white/50">{formatNumber(sub.investors)} investors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/08 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(sub.returns / sub.invested) * 100 * 10}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ background: sub.color }}
                      />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: sub.color }}>
                      +{formatCurrency(sub.returns)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <p className="text-white/50 text-xs uppercase tracking-wider">Recent Activity</p>
            <button className="flex items-center gap-1 text-[#d4af37] text-xs">
              See All <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-white/05">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{
                    background: item.status === "success" ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
                    color: item.status === "success" ? "#d4af37" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-white/40 text-xs truncate">{item.action} · {item.estate}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {item.amount && (
                    <p className="text-[#d4af37] text-xs font-semibold">
                      +{formatCurrency(item.amount)}
                    </p>
                  )}
                  <p className="text-white/30 text-[10px]">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { label: "Add Client", icon: Users, color: "#d4af37" },
            { label: "New Property", icon: Building2, color: "#d4af37" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(0,0,0,0.4))",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(212,175,55,0.2)" }}
                >
                  <Icon size={18} className="text-[#d4af37]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-semibold text-sm">{action.label}</p>
                  <p className="text-white/40 text-[10px]">Tap to add</p>
                </div>
                <ArrowUpRight size={14} className="text-[#d4af37]" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Live Stats Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        >
          <Zap size={18} className="text-[#d4af37] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">System Status</p>
            <p className="text-white/50 text-xs">All systems operational · 99.9% uptime</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>
      </div>

      <TerrenosBottomNav />
    </div>
  );
}
