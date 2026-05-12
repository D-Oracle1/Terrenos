"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AgrocityBottomNav } from "@/components/agrocity/bottom-nav";
import { formatCurrency } from "@/lib/utils";
import { Search, MapPin, Leaf, ChevronRight, Plus } from "lucide-react";

const farmCycles = [
  {
    id: "1", name: "Dry Season Maize Cycle A",
    crop: "Maize", location: "Kaduna State", status: "growing",
    total_plots: 200, available_plots: 45,
    price_per_plot: 25000, expected_roi: 22, duration: "6 months",
    start: "Mar 2026", harvest: "Sep 2026",
    features: ["Irrigation System", "Organic Fertilizer", "GPS Monitoring"],
    description: "Premium maize cultivation in Kaduna's fertile plains with advanced irrigation technology.",
  },
  {
    id: "2", name: "Wet Season Rice Farm",
    crop: "Rice", location: "Kano State", status: "planting",
    total_plots: 300, available_plots: 120,
    price_per_plot: 35000, expected_roi: 28, duration: "7 months",
    start: "Apr 2026", harvest: "Nov 2026",
    features: ["Flood Control", "Modern Threshers", "Cold Storage"],
    description: "High-yield rice cultivation leveraging Kano's rainy season and advanced farming techniques.",
  },
  {
    id: "3", name: "Cassava Investment Farm",
    crop: "Cassava", location: "Delta State", status: "harvesting",
    total_plots: 150, available_plots: 8,
    price_per_plot: 40000, expected_roi: 25, duration: "12 months",
    start: "Jun 2025", harvest: "Jun 2026",
    features: ["Processing Plant", "Export Ready", "Value Chain Integration"],
    description: "Industrial-grade cassava cultivation with on-site processing for flour and starch production.",
  },
  {
    id: "4", name: "Soybean Northern Plains",
    crop: "Soybean", location: "Borno State", status: "planting",
    total_plots: 400, available_plots: 280,
    price_per_plot: 20000, expected_roi: 30, duration: "5 months",
    start: "May 2026", harvest: "Oct 2026",
    features: ["Drought Resistant", "High Protein Yield", "Export Grade"],
    description: "High-demand soybean cultivation with guaranteed offtake agreement from processing companies.",
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  planting: { label: "Planting", color: "#86efac", bg: "rgba(134,239,172,0.12)" },
  growing: { label: "Growing", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  harvesting: { label: "Harvesting", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  completed: { label: "Completed", color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
};

export default function AgrocityFarms() {
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState<string | null>(null);

  const crops = [...new Set(farmCycles.map((f) => f.crop))];

  const filtered = farmCycles.filter((f) => {
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.crop.toLowerCase().includes(search.toLowerCase());
    const matchCrop = !cropFilter || f.crop === cropFilter;
    return matchSearch && matchCrop;
  });

  return (
    <div className="min-h-dvh bg-[#0d1f0d] safe-pb">
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(13,31,13,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Marketplace</p>
            <h1 className="text-xl font-bold text-white">Farm Cycles</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2d7a2d, #163316)" }}
          >
            <Plus size={18} className="text-white" />
          </motion.button>
        </div>

        <div className="relative mb-3">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search farms, crops..."
            className="w-full h-11 bg-white/05 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#4ade80]/30"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCropFilter(null)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: !cropFilter ? "#4ade80" : "rgba(255,255,255,0.06)", color: !cropFilter ? "#0d1f0d" : "rgba(255,255,255,0.4)" }}
          >
            All Crops
          </button>
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setCropFilter(crop === cropFilter ? null : crop)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: cropFilter === crop ? "#4ade80" : "rgba(255,255,255,0.06)",
                color: cropFilter === crop ? "#0d1f0d" : "rgba(255,255,255,0.4)",
              }}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 space-y-3">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-2"
        >
          {[
            { label: "Active Farms", value: "4" },
            { label: "Total Plots", value: "1,050" },
            { label: "Avg ROI", value: "26.25%" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3"
              style={{ background: "linear-gradient(135deg, rgba(45,122,45,0.1), rgba(0,0,0,0.4))", border: "1px solid rgba(45,122,45,0.12)" }}
            >
              <p className="text-white font-bold text-base">{s.value}</p>
              <p className="text-white/35 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Farm Cards */}
        {filtered.map((farm, i) => {
          const status = statusConfig[farm.status];
          const availPct = (farm.available_plots / farm.total_plots) * 100;
          return (
            <motion.div
              key={farm.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Farm Image placeholder */}
              <div
                className="h-28 relative flex items-end"
                style={{
                  background: `linear-gradient(135deg, rgba(45,122,45,0.2), rgba(13,31,13,0.9))`,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-08">
                  <Leaf size={64} className="text-[#4ade80] opacity-20" />
                </div>
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                  <span
                    className="px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: status.bg, color: status.color }}
                  >
                    ● {status.label}
                  </span>
                  <span
                    className="px-2 py-1 rounded-lg text-xs font-black"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#4ade80" }}
                  >
                    {farm.expected_roi}% ROI
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <MapPin size={11} className="text-white/50" />
                  <span className="text-white/50 text-xs">{farm.location}</span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-white font-bold text-base">{farm.name}</p>
                <p className="text-white/50 text-xs mt-0.5">{farm.description.slice(0, 80)}...</p>

                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[
                    { label: "Duration", value: farm.duration },
                    { label: "Per Plot", value: formatCurrency(farm.price_per_plot) },
                    { label: "Harvest", value: farm.harvest },
                  ].map((d) => (
                    <div key={d.label} className="rounded-xl p-2" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <p className="text-white/35 text-[9px] uppercase">{d.label}</p>
                      <p className="text-white text-xs font-semibold mt-0.5">{d.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-white/35 text-[10px]">Plots Available</span>
                    <span className="text-white/50 text-[10px]">{farm.available_plots}/{farm.total_plots} left</span>
                  </div>
                  <div className="h-1.5 bg-white/06 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${availPct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: availPct > 40 ? "#4ade80" : availPct > 15 ? "#f59e0b" : "#ef4444" }}
                    />
                  </div>
                </div>

                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {farm.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                      style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.15)" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 h-10 rounded-xl text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #163316, #2d7a2d)", color: "white" }}
                  >
                    Invest in Farm
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <ChevronRight size={14} className="text-white/40" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AgrocityBottomNav />
    </div>
  );
}
