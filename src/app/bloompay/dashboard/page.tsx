"use client";

import { motion } from "framer-motion";
import { BloompayBottomNav } from "@/components/bloompay/bottom-nav";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils";
import {
  TrendingUp, TrendingDown, Wallet, Bell, ChevronRight,
  ArrowUpRight, ArrowDownRight, Gift, Star,
} from "lucide-react";
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const portfolioHistory = [
  { month: "Dec", value: 1800000 },
  { month: "Jan", value: 2100000 },
  { month: "Feb", value: 1950000 },
  { month: "Mar", value: 2400000 },
  { month: "Apr", value: 2700000 },
  { month: "May", value: 3200000 },
];

const investments = [
  { name: "Premium Growth Plan", amount: 500000, roi: 18, maturity: "Dec 2026", status: "active", returns: 90000 },
  { name: "Fixed Income Plus", amount: 1000000, roi: 15, maturity: "Sep 2026", status: "active", returns: 150000 },
  { name: "Capital Shield", amount: 750000, roi: 12, maturity: "Mar 2027", status: "active", returns: 90000 },
];

const pieData = [
  { name: "Premium Growth", value: 44, color: "#2563eb" },
  { name: "Fixed Income", value: 40, color: "#c9a227" },
  { name: "Capital Shield", value: 16, color: "#60a5fa" },
];

const recentTx = [
  { type: "deposit", desc: "Wallet Top-up", amount: 500000, time: "2h ago" },
  { type: "invest", desc: "Premium Growth Plan", amount: -500000, time: "2h ago" },
  { type: "return", desc: "Fixed Income Return", amount: 12500, time: "1d ago" },
  { type: "return", desc: "Capital Shield Return", amount: 7500, time: "3d ago" },
];

export default function BloompayDashboard() {
  const totalPortfolio = 3200000;
  const totalReturns = 330000;
  const walletBalance = 145000;

  return (
    <div className="min-h-dvh bg-[#0a1628] safe-pb">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-5 pt-12 pb-4"
        style={{
          background: "linear-gradient(180deg, rgba(10,22,40,0.98) 0%, rgba(10,22,40,0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase">Investor Portal</p>
            <h1 className="text-xl font-bold text-white">My Portfolio</h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}
            >
              <Bell size={18} className="text-white/60" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "#c9a227" }} />
            </motion.button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            >
              <span className="text-white text-xs font-black">CK</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 space-y-5">
        {/* Portfolio Value Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a3a6b 0%, #2563eb 50%, #1d4ed8 100%)",
            boxShadow: "0 0 40px rgba(37,99,235,0.3)",
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="bloom-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bloom-dots)" />
            </svg>
          </div>

          <div className="relative">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Total Portfolio Value</p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white"
            >
              {formatCurrency(totalPortfolio)}
            </motion.p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-green-300" />
              <span className="text-green-300 text-sm font-semibold">+18.4% overall returns</span>
            </div>

            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Total Returns</p>
                <p className="text-[#e8c547] font-bold text-base">{formatCurrency(totalReturns)}</p>
              </div>
              <div className="w-px bg-white/15" />
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Wallet</p>
                <p className="text-white font-bold text-base">{formatCurrency(walletBalance)}</p>
              </div>
              <div className="w-px bg-white/15" />
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">Investor ID</p>
                <p className="text-white font-bold text-sm">BP-24891</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Invest", icon: TrendingUp, color: "#c9a227" },
            { label: "Deposit", icon: ArrowUpRight, color: "#4ade80" },
            { label: "Withdraw", icon: ArrowDownRight, color: "#60a5fa" },
            { label: "Refer", icon: Gift, color: "#a78bfa" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                whileTap={{ scale: 0.92 }}
                className="flex flex-col items-center gap-2 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${action.color}15` }}
                >
                  <Icon size={18} style={{ color: action.color }} />
                </div>
                <span className="text-white/60 text-[10px] font-semibold">{action.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(0,0,0,0.4))",
            border: "1px solid rgba(37,99,235,0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider">Portfolio Growth</p>
              <p className="text-white font-bold text-lg mt-0.5">+{formatCurrency(1400000)}</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "rgba(74,222,128,0.1)" }}>
              <TrendingUp size={12} className="text-green-400" />
              <span className="text-green-400 text-xs font-semibold">+77.8%</span>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioHistory} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="bloomLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#c9a227" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-[#0f1f3d] border border-[#2563eb]/20 rounded-lg px-2 py-1 text-xs" style={{ color: "#c9a227" }}>
                        {formatCurrency(payload[0].value as number)}
                      </div>
                    ) : null
                  }
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#bloomLine)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "#c9a227" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Allocation Pie */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl p-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/50 text-xs uppercase tracking-wider">Allocation</p>
            <button className="flex items-center gap-1 text-xs" style={{ color: "#c9a227" }}>
              Details <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={28} outerRadius={44} dataKey="value" strokeWidth={0}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-white/60 text-xs flex-1 truncate">{item.name}</span>
                  <span className="text-white text-xs font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Investments */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/50 text-xs uppercase tracking-wider">Active Investments</p>
            <button className="flex items-center gap-1 text-xs" style={{ color: "#c9a227" }}>
              All <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {investments.map((inv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{inv.name}</p>
                    <p className="text-white/40 text-xs">Matures {inv.maturity}</p>
                  </div>
                  <div
                    className="px-2 py-0.5 rounded-lg text-xs font-bold"
                    style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}
                  >
                    {inv.roi}% ROI
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-white/40 text-[10px]">Principal</p>
                    <p className="text-white text-sm font-bold">{formatCurrency(inv.amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[10px]">Returns</p>
                    <p className="font-bold text-sm" style={{ color: "#c9a227" }}>+{formatCurrency(inv.returns)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
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
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <p className="text-white/50 text-xs uppercase tracking-wider">Recent Transactions</p>
            <button className="text-xs" style={{ color: "#c9a227" }}>See All</button>
          </div>
          <div className="divide-y divide-white/04">
            {recentTx.map((tx, i) => {
              const isPositive = tx.amount > 0;
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isPositive ? "rgba(74,222,128,0.1)" : "rgba(37,99,235,0.1)",
                    }}
                  >
                    {isPositive
                      ? <ArrowUpRight size={16} className="text-green-400" />
                      : <ArrowDownRight size={16} className="text-blue-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{tx.desc}</p>
                    <p className="text-white/35 text-xs">{tx.time}</p>
                  </div>
                  <p
                    className="font-bold text-sm flex-shrink-0"
                    style={{ color: isPositive ? "#4ade80" : "rgba(255,255,255,0.6)" }}
                  >
                    {isPositive ? "+" : ""}{formatCurrency(Math.abs(tx.amount))}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Referral Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(37,99,235,0.1))",
            border: "1px solid rgba(201,162,39,0.2)",
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,162,39,0.2)" }}>
            <Gift size={18} style={{ color: "#c9a227" }} />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Earn ₦5,000 per referral</p>
            <p className="text-white/40 text-xs">Invite friends and earn when they invest</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ background: "#c9a227", color: "#0a0a0a" }}
          >
            Share
          </motion.button>
        </motion.div>
      </div>

      <BloompayBottomNav />
    </div>
  );
}
