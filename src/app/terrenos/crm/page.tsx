"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerrenosBottomNav } from "@/components/terrenos/bottom-nav";
import { Search, Plus, ChevronRight, Globe, MessageCircle, Phone, Star, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const sourceIcons: Record<string, React.ReactNode> = {
  facebook: <span className="text-[10px] font-black text-blue-400">f</span>,
  instagram: <span className="text-[10px] font-black text-pink-400">IG</span>,
  google: <Globe size={12} className="text-yellow-400" />,
  whatsapp: <MessageCircle size={12} className="text-green-400" />,
  referral: <Star size={12} className="text-purple-400" />,
  walk_in: <Phone size={12} className="text-orange-400" />,
};

const stageColors: Record<string, string> = {
  lead: "rgba(255,255,255,0.15)",
  prospect: "rgba(37,99,235,0.3)",
  negotiation: "rgba(212,175,55,0.3)",
  won: "rgba(34,197,94,0.3)",
  lost: "rgba(239,68,68,0.2)",
};

const stageLabels: Record<string, string> = {
  lead: "Lead",
  prospect: "Prospect",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

const mockClients = [
  {
    id: "1", full_name: "Adebayo Johnson", phone: "080-1234-5678", email: "adebayo@gmail.com",
    source: "facebook", stage: "negotiation", score: 87, assigned_to: "Emeka O.",
    estate: "Greenfield Estate", budget: 15000000, created_at: "2h ago",
  },
  {
    id: "2", full_name: "Chioma Okafor", phone: "070-9876-5432", email: "chioma@yahoo.com",
    source: "instagram", stage: "prospect", score: 72, assigned_to: "Tunde A.",
    estate: "Royal Gardens", budget: 25000000, created_at: "5h ago",
  },
  {
    id: "3", full_name: "Ibrahim Musa", phone: "081-5555-7890", email: null,
    source: "whatsapp", stage: "lead", score: 45, assigned_to: "Ngozi B.",
    estate: "Unknown", budget: 8000000, created_at: "1d ago",
  },
  {
    id: "4", full_name: "Fatima Abubakar", phone: "090-2222-3333", email: "fatima@mail.com",
    source: "google", stage: "won", score: 95, assigned_to: "Emeka O.",
    estate: "Paradise Homes", budget: 22000000, created_at: "3d ago",
  },
  {
    id: "5", full_name: "Kelechi Eze", phone: "080-4444-9999", email: null,
    source: "referral", stage: "prospect", score: 68, assigned_to: "Tunde A.",
    estate: "Sunrise Estate", budget: 12000000, created_at: "4d ago",
  },
];

const pipeline = [
  { stage: "lead", count: 284, color: "rgba(255,255,255,0.3)" },
  { stage: "prospect", count: 141, color: "#2563eb" },
  { stage: "negotiation", count: 67, color: "#d4af37" },
  { stage: "won", count: 143, color: "#22c55e" },
  { stage: "lost", count: 89, color: "#ef4444" },
];

export default function TerrenosCRM() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = mockClients.filter((c) => {
    const matchStage = !activeStage || c.stage === activeStage;
    const matchSearch = !search || c.full_name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    return matchStage && matchSearch;
  });

  return (
    <div className="min-h-dvh bg-[#0a0a0a] safe-pb">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-5 pt-12 pb-3"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">CRM Engine</p>
            <h1 className="text-xl font-bold text-white">Lead Pipeline</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAdd(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)" }}
          >
            <Plus size={18} className="text-[#0a0a0a]" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full h-11 bg-white/05 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#d4af37]/30"
          />
        </div>

        {/* Pipeline stages */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setActiveStage(null)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: !activeStage ? "#d4af37" : "rgba(255,255,255,0.08)",
              color: !activeStage ? "#0a0a0a" : "rgba(255,255,255,0.5)",
            }}
          >
            All ({mockClients.length})
          </button>
          {pipeline.map((p) => (
            <button
              key={p.stage}
              onClick={() => setActiveStage(activeStage === p.stage ? null : p.stage)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeStage === p.stage ? p.color : "rgba(255,255,255,0.05)",
                color: activeStage === p.stage ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${activeStage === p.stage ? p.color : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {stageLabels[p.stage]} ({p.count})
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 space-y-4">
        {/* Pipeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(0,0,0,0.5))",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-3">Pipeline Flow</p>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden">
            {pipeline.map((p) => {
              const total = pipeline.reduce((sum, s) => sum + s.count, 0);
              return (
                <motion.div
                  key={p.stage}
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.count / total) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ background: p.color }}
                  className="rounded-full"
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {pipeline.map((p) => (
              <div key={p.stage} className="text-center">
                <p className="text-white font-bold text-sm">{p.count}</p>
                <p className="text-white/30 text-[9px] capitalize">{p.stage}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lead Score Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Avg Score", value: "67", icon: <Star size={14} className="text-[#d4af37]" /> },
            { label: "Hot Leads", value: "43", icon: <TrendingUp size={14} className="text-green-400" /> },
            { label: "This Week", value: "+28", icon: <Plus size={14} className="text-blue-400" /> },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-3 flex flex-col gap-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {m.icon}
              <p className="text-white font-bold text-lg">{m.value}</p>
              <p className="text-white/30 text-[9px] uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Client List */}
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-3">
            {filtered.length} Clients
          </p>
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((client, i) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                      style={{
                        background: stageColors[client.stage],
                        color: "#fff",
                      }}
                    >
                      {client.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-sm truncate">{client.full_name}</p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {sourceIcons[client.source]}
                        </div>
                      </div>
                      <p className="text-white/40 text-xs">{client.phone}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase"
                          style={{ background: stageColors[client.stage], color: "#fff" }}
                        >
                          {stageLabels[client.stage]}
                        </span>
                        <span className="text-white/30 text-[10px]">→ {client.estate}</span>
                      </div>
                    </div>

                    {/* Score + Actions */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div
                        className="px-2 py-0.5 rounded-lg text-xs font-bold"
                        style={{
                          background: client.score >= 80 ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.08)",
                          color: client.score >= 80 ? "#d4af37" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {client.score}
                      </div>
                      <p className="text-[#d4af37] text-[10px] font-semibold">
                        {formatCurrency(client.budget)}
                      </p>
                      <p className="text-white/30 text-[9px]">{client.created_at}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      className="flex-1 h-8 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.2)" }}
                    >
                      Call
                    </button>
                    <button
                      className="flex-1 h-8 rounded-lg text-xs font-semibold"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      Message
                    </button>
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <ChevronRight size={14} className="text-white/40" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <TerrenosBottomNav />
    </div>
  );
}
