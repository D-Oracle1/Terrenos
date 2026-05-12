"use client";

import { motion } from "framer-motion";
import { TerrenosBottomNav } from "@/components/terrenos/bottom-nav";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Search } from "lucide-react";
import { useState } from "react";

const payments = [
  {
    id: "1", client: "Adebayo Johnson", property: "Greenfield Estate – Unit A3",
    total: 15000000, paid: 9000000, plan: "12_months", next_due: "Jun 15, 2026",
    status: "active", installments_done: 7, installments_total: 12,
  },
  {
    id: "2", client: "Chioma Okafor", property: "Royal Gardens – Duplex D7",
    total: 28000000, paid: 28000000, plan: "outright", next_due: null,
    status: "completed", installments_done: 1, installments_total: 1,
  },
  {
    id: "3", client: "Kelechi Eze", property: "Sunrise Estate – Plot 7",
    total: 12000000, paid: 4000000, plan: "24_months", next_due: "May 30, 2026",
    status: "active", installments_done: 8, installments_total: 24,
  },
  {
    id: "4", client: "Bisi Ogunmola", property: "Paradise Homes – Unit B2",
    total: 22000000, paid: 11000000, plan: "6_months", next_due: "May 20, 2026",
    status: "defaulted", installments_done: 3, installments_total: 6,
  },
];

const planLabels: Record<string, string> = {
  outright: "Outright",
  "6_months": "6 Months",
  "12_months": "12 Months",
  "24_months": "24 Months",
};

const statusConfig = {
  active: { color: "#d4af37", bg: "rgba(212,175,55,0.12)", icon: Clock, label: "Active" },
  completed: { color: "#4ade80", bg: "rgba(74,222,128,0.12)", icon: CheckCircle, label: "Completed" },
  defaulted: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", icon: AlertTriangle, label: "Defaulted" },
};

const summaryStats = [
  { label: "Total Collected", value: "₦1.86B", change: "+12.4%", color: "#d4af37" },
  { label: "Outstanding", value: "₦842M", change: "-3.2%", color: "#ef4444" },
  { label: "Defaulted", value: "₦124M", change: "+1.8%", color: "#f59e0b" },
];

export default function TerrenosPayments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = payments.filter((p) => {
    const matchSearch = !search || p.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-dvh bg-[#0a0a0a] safe-pb">
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Finance</p>
            <h1 className="text-xl font-bold text-white">Payment Tracker</h1>
          </div>
        </div>
        <div className="relative mb-3">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payments..."
            className="w-full h-11 bg-white/05 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#d4af37]/30"
          />
        </div>
        <div className="flex gap-2">
          {[null, "active", "completed", "defaulted"].map((s) => (
            <button
              key={s ?? "all"}
              onClick={() => setStatusFilter(s)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
              style={{
                background: statusFilter === s ? "#d4af37" : "rgba(255,255,255,0.06)",
                color: statusFilter === s ? "#0a0a0a" : "rgba(255,255,255,0.4)",
              }}
            >
              {s ?? "All"}
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
                background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(0,0,0,0.5))",
                border: `1px solid ${s.color}20`,
              }}
            >
              <p className="text-white font-bold text-sm">{s.value}</p>
              <p className="text-white/35 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</p>
              <div className="flex items-center gap-0.5 mt-1">
                <TrendingUp size={8} style={{ color: s.color }} />
                <span className="text-[9px] font-semibold" style={{ color: s.color }}>{s.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment Cards */}
        <div className="space-y-3">
          {filtered.map((payment, i) => {
            const cfg = statusConfig[payment.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            const paidPct = (payment.paid / payment.total) * 100;
            const outstanding = payment.total - payment.paid;
            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold text-sm">{payment.client}</p>
                    <p className="text-white/40 text-xs mt-0.5">{payment.property}</p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    <Icon size={10} />
                    {cfg.label}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/40">Total</span>
                    <span className="text-white font-semibold">{formatCurrency(payment.total)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400">Paid</span>
                    <span className="text-green-400 font-semibold">{formatCurrency(payment.paid)}</span>
                  </div>
                  {outstanding > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[#d4af37]">Outstanding</span>
                      <span className="text-[#d4af37] font-semibold">{formatCurrency(outstanding)}</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/30 text-[10px]">Progress</span>
                    <span className="text-white/50 text-[10px]">{payment.installments_done}/{payment.installments_total} · {planLabels[payment.plan]}</span>
                  </div>
                  <div className="h-1.5 bg-white/06 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${paidPct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: payment.status === "defaulted" ? "#ef4444" : "#d4af37" }}
                    />
                  </div>
                </div>

                {payment.next_due && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <Clock size={11} className="text-white/30" />
                    <span className="text-white/30 text-[10px]">Next due: {payment.next_due}</span>
                  </div>
                )}

                {payment.status === "defaulted" && (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="w-full mt-3 h-9 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                  >
                    Send Payment Reminder
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <TerrenosBottomNav />
    </div>
  );
}
