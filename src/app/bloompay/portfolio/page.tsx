"use client";

import { motion } from "framer-motion";
import { BloompayBottomNav } from "@/components/bloompay/bottom-nav";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const portfolioItems = [
  {
    id: "1", plan: "Premium Growth Plan", amount: 500000,
    returns_expected: 90000, returns_paid: 22500,
    start: "May 1, 2026", maturity: "Apr 30, 2027",
    status: "active", roi: 18, progress: 25,
    chartData: [
      { month: "May", value: 500000 }, { month: "Jun", value: 512500 },
      { month: "Jul", value: 525000 }, { month: "Aug", value: 537500 },
      { month: "Sep", value: 550000 }, { month: "Now", value: 562500 },
    ],
    color: "#c9a227",
  },
  {
    id: "2", plan: "Fixed Income Plus", amount: 1000000,
    returns_expected: 150000, returns_paid: 75000,
    start: "Nov 1, 2025", maturity: "Jul 31, 2026",
    status: "active", roi: 15, progress: 67,
    chartData: [
      { month: "Nov", value: 1000000 }, { month: "Dec", value: 1025000 },
      { month: "Jan", value: 1050000 }, { month: "Feb", value: 1075000 },
      { month: "Mar", value: 1100000 }, { month: "Now", value: 1125000 },
    ],
    color: "#60a5fa",
  },
  {
    id: "3", plan: "Capital Shield", amount: 750000,
    returns_expected: 90000, returns_paid: 0,
    start: "Feb 15, 2026", maturity: "Aug 14, 2026",
    status: "active", roi: 12, progress: 45,
    chartData: [
      { month: "Feb", value: 750000 }, { month: "Mar", value: 758000 },
      { month: "Apr", value: 766000 }, { month: "May", value: 774000 },
    ],
    color: "#4ade80",
  },
];

const totalInvested = portfolioItems.reduce((s, p) => s + p.amount, 0);
const totalReturnsExpected = portfolioItems.reduce((s, p) => s + p.returns_expected, 0);
const totalReturnsPaid = portfolioItems.reduce((s, p) => s + p.returns_paid, 0);

export default function BloompayPortfolio() {
  return (
    <div className="min-h-dvh bg-[#0a1628] safe-pb">
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(10,22,40,0.95)", backdropFilter: "blur(20px)" }}>
        <p className="text-white/40 text-[10px] uppercase tracking-widest">Analytics</p>
        <h1 className="text-xl font-bold text-white">My Portfolio</h1>
      </div>

      <div className="px-5 pb-4 space-y-5">
        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(0,0,0,0.5))",
            border: "1px solid rgba(37,99,235,0.2)",
          }}
        >
          <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Portfolio Overview</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-white/40 text-[9px] uppercase tracking-wider">Invested</p>
              <p className="text-white font-bold text-base">{formatCurrency(totalInvested)}</p>
            </div>
            <div>
              <p className="text-white/40 text-[9px] uppercase tracking-wider">Returns Due</p>
              <p className="font-bold text-base" style={{ color: "#c9a227" }}>{formatCurrency(totalReturnsExpected)}</p>
            </div>
            <div>
              <p className="text-white/40 text-[9px] uppercase tracking-wider">Paid Out</p>
              <p className="font-bold text-base text-green-400">{formatCurrency(totalReturnsPaid)}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between mb-1">
              <span className="text-white/30 text-[9px]">Overall Progress</span>
              <span className="text-white/50 text-[9px]">{Math.round((totalReturnsPaid / totalReturnsExpected) * 100)}% returned</span>
            </div>
            <div className="h-1.5 bg-white/06 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(totalReturnsPaid / totalReturnsExpected) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #2563eb, #c9a227)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Individual Investment Cards */}
        {portfolioItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-white/40 text-[10px] uppercase tracking-wider">Active</span>
                  </div>
                  <h3 className="text-white font-bold text-base">{item.plan}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={10} className="text-white/30" />
                    <span className="text-white/30 text-xs">Matures {item.maturity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black" style={{ color: item.color }}>{item.roi}%</p>
                  <p className="text-white/40 text-[10px]">Annual ROI</p>
                </div>
              </div>

              {/* Mini chart */}
              <div className="h-16 -mx-1 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={item.chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={`grad-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={item.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={item.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      content={({ active, payload }) =>
                        active && payload?.[0] ? (
                          <div className="bg-[#0f1f3d] rounded px-2 py-1 text-xs" style={{ color: item.color }}>
                            {formatCurrency(payload[0].value as number)}
                          </div>
                        ) : null
                      }
                    />
                    <Area type="monotone" dataKey="value" stroke={item.color} strokeWidth={1.5} fill={`url(#grad-${item.id})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-white/40 text-[9px] uppercase">Principal</p>
                  <p className="text-white font-bold text-sm mt-0.5">{formatCurrency(item.amount)}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-white/40 text-[9px] uppercase">Expected Returns</p>
                  <p className="font-bold text-sm mt-0.5" style={{ color: item.color }}>+{formatCurrency(item.returns_expected)}</p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-white/30 text-[9px]">Time Elapsed</span>
                  <span className="text-white/50 text-[9px]">{item.progress}% complete</span>
                </div>
                <div className="h-1.5 bg-white/06 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Matured investments placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.1)" }}
        >
          <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">2 Completed Plans</p>
            <p className="text-white/40 text-xs">Total returns received: {formatCurrency(412000)}</p>
          </div>
          <ChevronRight size={14} className="text-white/30" />
        </motion.div>
      </div>

      <BloompayBottomNav />
    </div>
  );
}
