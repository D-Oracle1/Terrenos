"use client";

import { motion } from "framer-motion";
import { AgrocityBottomNav } from "@/components/agrocity/bottom-nav";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  TrendingUp, Bell, ChevronRight, Leaf, Droplets, Sun,
  ArrowUpRight, Wind, BarChart3,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const portfolioGrowth = [
  { month: "Nov", value: 600000 },
  { month: "Dec", value: 680000 },
  { month: "Jan", value: 720000 },
  { month: "Feb", value: 790000 },
  { month: "Mar", value: 850000 },
  { month: "Apr", value: 940000 },
  { month: "May", value: 1050000 },
];

const farmCycles = [
  {
    id: "1", name: "Dry Season Maize", location: "Kaduna", state: "Kaduna",
    crop: "Maize", status: "growing", progress: 65,
    invested: 250000, expected_roi: 22, harvest: "Jul 2026",
    color: "#4ade80",
  },
  {
    id: "2", name: "Wet Season Rice", location: "Kano", state: "Kano",
    crop: "Rice", status: "planting", progress: 20,
    invested: 400000, expected_roi: 28, harvest: "Oct 2026",
    color: "#86efac",
  },
  {
    id: "3", name: "Cassava Farm Delta", location: "Warri", state: "Delta",
    crop: "Cassava", status: "harvesting", progress: 90,
    invested: 300000, expected_roi: 25, harvest: "Jun 2026",
    color: "#22c55e",
  },
];

const cropAlloc = [
  { crop: "Maize", pct: 26 },
  { crop: "Rice", pct: 42 },
  { crop: "Cassava", pct: 32 },
];

const weatherData = [
  { label: "Kaduna", temp: 32, rain: "Heavy" },
  { label: "Kano", temp: 38, rain: "Dry" },
  { label: "Delta", temp: 30, rain: "Moderate" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  planting: { label: "Planting", color: "#86efac" },
  growing: { label: "Growing", color: "#4ade80" },
  harvesting: { label: "Harvesting", color: "#22c55e" },
  completed: { label: "Completed", color: "#16a34a" },
};

export default function AgrocityDashboard() {
  const totalInvested = farmCycles.reduce((s, f) => s + f.invested, 0);
  const avgRoi = Math.round(farmCycles.reduce((s, f) => s + f.expected_roi, 0) / farmCycles.length);

  return (
    <div className="min-h-dvh bg-[#0d1f0d] safe-pb">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-5 pt-12 pb-4"
        style={{
          background: "linear-gradient(180deg, rgba(13,31,13,0.98) 0%, rgba(13,31,13,0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase">Farm Portfolio</p>
            <h1 className="text-xl font-bold text-white">Agrocity Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(45,122,45,0.1)", border: "1px solid rgba(45,122,45,0.2)" }}
            >
              <Bell size={18} className="text-white/60" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4ade80]" />
            </motion.button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2d7a2d, #163316)" }}
            >
              <span className="text-white text-xs font-black">AO</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 space-y-5">
        {/* Portfolio Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #163316 0%, #2d7a2d 50%, #1a3a1a 100%)",
            boxShadow: "0 0 40px rgba(45,122,45,0.3)",
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="agro-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#agro-dots)" />
            </svg>
          </div>

          <div className="relative">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Total Farm Portfolio</p>
            <p className="text-4xl font-bold text-white">{formatCurrency(1050000)}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-green-300" />
              <span className="text-green-300 text-sm font-semibold">+{avgRoi}% avg. projected ROI</span>
            </div>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Invested</p>
                <p className="text-white font-bold">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="w-px bg-white/15" />
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Active Farms</p>
                <p className="text-white font-bold">{farmCycles.length}</p>
              </div>
              <div className="w-px bg-white/15" />
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Returns</p>
                <p className="font-bold" style={{ color: "#86efac" }}>{formatCurrency(100000)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(45,122,45,0.1), rgba(0,0,0,0.4))",
            border: "1px solid rgba(45,122,45,0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider">Portfolio Growth</p>
              <p className="text-white font-bold text-lg mt-0.5">+{formatCurrency(450000)}</p>
            </div>
            <BarChart3 size={16} className="text-[#4ade80]" />
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioGrowth} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="agroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-[#0f2a0f] border border-[#2d7a2d]/20 rounded-lg px-2 py-1 text-xs text-[#4ade80]">
                        {formatCurrency(payload[0].value as number)}
                      </div>
                    ) : null
                  }
                />
                <Area type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} fill="url(#agroGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Hectares", value: "4.5", icon: Leaf, color: "#4ade80" },
            { label: "Avg Rainfall", value: "High", icon: Droplets, color: "#60a5fa" },
            { label: "Season", value: "Wet '26", icon: Sun, color: "#f59e0b" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Icon size={14} style={{ color: s.color }} />
                <p className="text-white font-bold text-base mt-1">{s.value}</p>
                <p className="text-white/35 text-[9px] uppercase tracking-wider">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Active Farm Cycles */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/50 text-xs uppercase tracking-wider">Active Farm Cycles</p>
            <button className="flex items-center gap-1 text-xs" style={{ color: "#4ade80" }}>
              View All <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {farmCycles.map((farm, i) => {
              const status = statusConfig[farm.status];
              return (
                <motion.div
                  key={farm.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-semibold"
                          style={{ background: `${status.color}18`, color: status.color }}
                        >
                          ● {status.label}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm">{farm.name}</h3>
                      <p className="text-white/40 text-xs">{farm.crop} · {farm.location}, {farm.state}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xl" style={{ color: farm.color }}>{farm.expected_roi}%</p>
                      <p className="text-white/40 text-[9px]">Proj. ROI</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/30 text-[10px]">Cycle Progress</span>
                      <span className="text-white/50 text-[10px]">{farm.progress}% · Harvest {farm.harvest}</span>
                    </div>
                    <div className="h-2 bg-white/06 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${farm.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${farm.color}, rgba(134,239,172,0.6))` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-[9px]">Your Investment</p>
                      <p className="text-white font-bold text-sm">{formatCurrency(farm.invested)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-[9px]">Expected Returns</p>
                      <p className="font-bold text-sm" style={{ color: farm.color }}>
                        +{formatCurrency(farm.invested * (farm.expected_roi / 100))}
                      </p>
                    </div>
                    <ArrowUpRight size={16} style={{ color: farm.color }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Crop Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Crop Allocation</p>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropAlloc} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
                <XAxis type="number" tick={false} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-[#0f2a0f] rounded px-2 py-1 text-xs text-[#4ade80]">{payload[0].value}%</div>
                    ) : null
                  }
                />
                <Bar dataKey="pct" fill="#4ade80" radius={[0, 4, 4, 0]} opacity={0.8}
                  label={{ position: "right", fill: "rgba(255,255,255,0.5)", fontSize: 10, formatter: (v: unknown) => `${v}%` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-2">
            {cropAlloc.map((c) => (
              <div key={c.crop} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#4ade80] opacity-80" />
                <span className="text-white/40 text-[9px]">{c.crop}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weather Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Wind size={14} className="text-[#4ade80]" />
            <p className="text-white/50 text-xs uppercase tracking-wider">Farm Weather Conditions</p>
          </div>
          <div className="space-y-2">
            {weatherData.map((w) => (
              <div key={w.label} className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">{w.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-xs">{w.temp}°C</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-semibold"
                    style={{
                      background: w.rain === "Heavy" ? "rgba(96,165,250,0.12)" : w.rain === "Dry" ? "rgba(245,158,11,0.12)" : "rgba(74,222,128,0.12)",
                      color: w.rain === "Heavy" ? "#60a5fa" : w.rain === "Dry" ? "#f59e0b" : "#4ade80",
                    }}
                  >
                    {w.rain}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AgrocityBottomNav />
    </div>
  );
}
