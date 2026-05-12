"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TerrenosBottomNav } from "@/components/terrenos/bottom-nav";
import { Search, Plus, Building2, MapPin, Home, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockProperties = [
  {
    id: "1", name: "Block A, Unit 3", estate_name: "Greenfield Estate",
    type: "residential", status: "available", price: 15000000,
    location: "Lekki Phase 1", state: "Lagos", units_total: 48, units_available: 12,
    features: ["Swimming Pool", "24hr Security", "Gym", "BQ"],
  },
  {
    id: "2", name: "Premium Duplex D7", estate_name: "Royal Gardens",
    type: "residential", status: "reserved", price: 28000000,
    location: "Maitama", state: "Abuja", units_total: 20, units_available: 3,
    features: ["Private Pool", "Smart Home", "Garage", "Garden"],
  },
  {
    id: "3", name: "Commercial Space 2B", estate_name: "Central Business Hub",
    type: "commercial", status: "available", price: 45000000,
    location: "Victoria Island", state: "Lagos", units_total: 30, units_available: 8,
    features: ["Open Plan", "Conference Rooms", "Generator", "Parking"],
  },
  {
    id: "4", name: "Plot 18, Zone C", estate_name: "Paradise Homes",
    type: "land", status: "sold", price: 8000000,
    location: "Apo", state: "Abuja", units_total: 100, units_available: 0,
    features: ["C of O", "Survey Plan", "Gated Estate"],
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: "Available", color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
  reserved: { label: "Reserved", color: "#d4af37", bg: "rgba(212,175,55,0.15)" },
  sold: { label: "Sold", color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  off_plan: { label: "Off-Plan", color: "#60a5fa", bg: "rgba(96,165,250,0.15)" },
};

const typeIcons: Record<string, React.ReactNode> = {
  residential: <Home size={14} className="text-[#d4af37]" />,
  commercial: <Building2 size={14} className="text-blue-400" />,
  land: <MapPin size={14} className="text-green-400" />,
};

const summaryStats = [
  { label: "Total Units", value: "612", sub: "across 8 estates" },
  { label: "Available", value: "184", sub: "ready to sell" },
  { label: "Revenue YTD", value: "₦2.1B", sub: "+18.4%" },
];

export default function TerrenosProperties() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = mockProperties.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.estate_name.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || p.type === typeFilter;
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="min-h-dvh bg-[#0a0a0a] safe-pb">
      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Inventory</p>
            <h1 className="text-xl font-bold text-white">Properties</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)" }}
          >
            <Plus size={18} className="text-[#0a0a0a]" />
          </motion.button>
        </div>

        <div className="relative mb-3">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties..."
            className="w-full h-11 bg-white/05 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#d4af37]/30"
          />
        </div>

        {/* Type filters */}
        <div className="flex gap-2">
          {[null, "residential", "commercial", "land"].map((type) => (
            <button
              key={type ?? "all"}
              onClick={() => setTypeFilter(type)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
              style={{
                background: typeFilter === type ? "#d4af37" : "rgba(255,255,255,0.06)",
                color: typeFilter === type ? "#0a0a0a" : "rgba(255,255,255,0.4)",
              }}
            >
              {type ?? "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          {summaryStats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-3"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(0,0,0,0.5))",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              <p className="text-white font-bold text-lg">{s.value}</p>
              <p className="text-white/40 text-[9px] uppercase tracking-wider">{s.label}</p>
              <p className="text-[#d4af37] text-[9px] mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Status filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[null, "available", "reserved", "sold", "off_plan"].map((status) => {
            const cfg = status ? statusConfig[status] : null;
            return (
              <button
                key={status ?? "all"}
                onClick={() => setStatusFilter(status)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: statusFilter === status
                    ? (cfg?.bg ?? "rgba(212,175,55,0.2)")
                    : "rgba(255,255,255,0.05)",
                  color: statusFilter === status
                    ? (cfg?.color ?? "#d4af37")
                    : "rgba(255,255,255,0.35)",
                  border: `1px solid ${statusFilter === status ? (cfg?.color ?? "#d4af37") + "40" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {status ? statusConfig[status].label : "All Status"}
              </button>
            );
          })}
        </div>

        {/* Property Cards */}
        <div className="space-y-3">
          {filtered.map((property, i) => {
            const status = statusConfig[property.status];
            const availPct = property.units_total > 0 ? (property.units_available / property.units_total) * 100 : 0;
            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Property image placeholder */}
                <div
                  className="h-32 relative"
                  style={{
                    background: `linear-gradient(135deg, rgba(212,175,55,0.1), rgba(0,0,0,0.8))`,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Building2 size={64} className="text-[#d4af37]" />
                  </div>
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <div>
                      <div
                        className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {status.label}
                      </div>
                    </div>
                    <div
                      className="px-2 py-1 rounded-lg text-[10px] font-bold"
                      style={{ background: "rgba(0,0,0,0.6)", color: "#d4af37" }}
                    >
                      {formatCurrency(property.price)}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    {typeIcons[property.type]}
                    <span className="text-white/60 text-xs capitalize">{property.type}</span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-white font-bold text-base">{property.estate_name}</p>
                  <p className="text-white/50 text-sm">{property.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-white/30" />
                    <span className="text-white/30 text-xs">{property.location}, {property.state}</span>
                  </div>

                  {/* Unit availability bar */}
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/40 text-[10px]">Units Available</span>
                      <span className="text-white/60 text-[10px] font-semibold">{property.units_available}/{property.units_total}</span>
                    </div>
                    <div className="h-1.5 bg-white/08 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${availPct}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ background: availPct > 50 ? "#4ade80" : availPct > 20 ? "#d4af37" : "#ef4444" }}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {property.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                        style={{ background: "rgba(212,175,55,0.08)", color: "rgba(212,175,55,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}
                      >
                        {f}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="text-white/30 text-[9px] self-center">+{property.features.length - 3}</span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 h-9 rounded-xl text-xs font-semibold"
                      style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)", color: "#0a0a0a" }}
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 h-9 rounded-xl text-xs font-semibold"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      Reserve
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <TerrenosBottomNav />
    </div>
  );
}
