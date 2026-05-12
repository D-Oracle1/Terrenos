"use client";

import { motion } from "framer-motion";
import { AgrocityBottomNav } from "@/components/agrocity/bottom-nav";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Leaf, BarChart3, Download } from "lucide-react";
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";

const sustainabilityData = [
  { subject: "Carbon", A: 85 },
  { subject: "Water", A: 72 },
  { subject: "Soil Health", A: 90 },
  { subject: "Biodiversity", A: 68 },
  { subject: "Community", A: 95 },
  { subject: "Organic", A: 78 },
];

const roiHistory = [
  { quarter: "Q2 '25", roi: 22 },
  { quarter: "Q3 '25", roi: 25 },
  { quarter: "Q4 '25", roi: 21 },
  { quarter: "Q1 '26", roi: 28 },
  { quarter: "Q2 '26", roi: 26 },
];

const harvestData = [
  { crop: "Maize", yield: 4.2, target: 4.5, unit: "tons/ha", status: "good" },
  { crop: "Rice", yield: 3.8, target: 4.0, unit: "tons/ha", status: "good" },
  { crop: "Cassava", yield: 18.5, target: 18.0, unit: "tons/ha", status: "excellent" },
];

const impactMetrics = [
  { label: "Farmers Empowered", value: "1,240", color: "#4ade80" },
  { label: "Hectares Cultivated", value: "450", color: "#86efac" },
  { label: "CO₂ Offset (tons)", value: "320", color: "#22c55e" },
  { label: "Meals Produced", value: "2.4M", color: "#4ade80" },
];

export default function AgrocityReports() {
  return (
    <div className="min-h-dvh bg-[#0d1f0d] safe-pb">
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(13,31,13,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Analytics</p>
            <h1 className="text-xl font-bold text-white">Sustainability Reports</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <Download size={12} /> Export
          </motion.button>
        </div>
      </div>

      <div className="px-5 pb-4 space-y-5">
        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(45,122,45,0.15), rgba(0,0,0,0.5))",
            border: "1px solid rgba(45,122,45,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Leaf size={14} className="text-[#4ade80]" />
            <p className="text-white/50 text-xs uppercase tracking-wider">Impact Overview — 2026</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {impactMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <p className="text-2xl font-black" style={{ color: m.color }}>{m.value}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ROI History Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider">Quarterly ROI Performance</p>
              <p className="text-white font-bold text-lg mt-0.5">Avg 24.4% Returns</p>
            </div>
            <TrendingUp size={16} className="text-[#4ade80]" />
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiHistory} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="quarter" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-[#0f2a0f] border border-[#2d7a2d]/20 rounded-lg px-2 py-1 text-xs text-[#4ade80]">
                        {payload[0].value}% ROI
                      </div>
                    ) : null
                  }
                />
                <Area type="monotone" dataKey="roi" stroke="#4ade80" strokeWidth={2} fill="url(#roiGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sustainability Radar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={14} className="text-[#4ade80]" />
            <p className="text-white/50 text-xs uppercase tracking-wider">Sustainability Score</p>
            <div className="ml-auto px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
              81.3/100
            </div>
          </div>
          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={sustainabilityData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
                <Radar name="Score" dataKey="A" stroke="#4ade80" fill="#4ade80" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Harvest Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/50 text-xs uppercase tracking-wider mb-4">Harvest Yield Analytics</p>
          <div className="space-y-4">
            {harvestData.map((crop) => {
              const pct = Math.round((crop.yield / crop.target) * 100);
              return (
                <div key={crop.crop}>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-white font-semibold text-sm">{crop.crop}</span>
                      <span className="text-white/40 text-xs ml-2">({crop.unit})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 text-xs">{crop.yield} / {crop.target}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold capitalize"
                        style={{
                          background: crop.status === "excellent" ? "rgba(74,222,128,0.15)" : "rgba(201,162,39,0.12)",
                          color: crop.status === "excellent" ? "#4ade80" : "#c9a227",
                        }}
                      >
                        {crop.status}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/06 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: pct >= 100 ? "#4ade80" : "#f59e0b" }}
                    />
                  </div>
                  <p className="text-white/30 text-[9px] mt-0.5">{pct}% of target achieved</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Download CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.96 }}
          className="w-full h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #163316, #2d7a2d)",
            color: "white",
            boxShadow: "0 0 20px rgba(45,122,45,0.3)",
          }}
        >
          <Download size={16} /> Download Full Sustainability Report
        </motion.button>
      </div>

      <AgrocityBottomNav />
    </div>
  );
}
