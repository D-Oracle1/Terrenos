"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BloompayBottomNav } from "@/components/bloompay/bottom-nav";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Clock, Shield, ChevronRight, Star, X, CheckCircle } from "lucide-react";

const plans = [
  {
    id: "1", name: "Capital Shield", category: "Conservative",
    roi: 12, duration: 6, min: 50000, max: 5000000,
    slots: 200, taken: 87, payout: "Maturity",
    color: "#60a5fa", highlight: false,
    features: ["Capital guaranteed", "Flexible exit after 3 months", "Monthly statements"],
  },
  {
    id: "2", name: "Premium Growth", category: "Balanced",
    roi: 18, duration: 12, min: 100000, max: null,
    slots: 150, taken: 112, payout: "Quarterly",
    color: "#c9a227", highlight: true,
    features: ["High-yield returns", "Quarterly ROI payouts", "Priority support", "Certificate issued"],
  },
  {
    id: "3", name: "Elite Multiplier", category: "Aggressive",
    roi: 24, duration: 18, min: 500000, max: null,
    slots: 80, taken: 71, payout: "Monthly",
    color: "#a78bfa", highlight: false,
    features: ["Premium tier access", "Monthly returns", "Dedicated relationship manager", "VIP events"],
  },
  {
    id: "4", name: "Fixed Income Plus", category: "Conservative",
    roi: 15, duration: 9, min: 200000, max: 10000000,
    slots: 300, taken: 204, payout: "Quarterly",
    color: "#4ade80", highlight: false,
    features: ["Steady income stream", "Quarterly distributions", "Low risk profile"],
  },
];

export default function BloompayInvest() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [step, setStep] = useState<"browse" | "detail" | "confirm" | "success">("browse");

  const filtered = plans.filter((p) => !categoryFilter || p.category === categoryFilter);
  const categories = [...new Set(plans.map((p) => p.category))];

  const computedReturns = selectedPlan && amount
    ? parseFloat(amount.replace(/,/g, "")) * (selectedPlan.roi / 100)
    : 0;

  return (
    <div className="min-h-dvh bg-[#0a1628] safe-pb">
      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(10,22,40,0.95)", backdropFilter: "blur(20px)" }}>
        <p className="text-white/40 text-[10px] uppercase tracking-widest">Investment</p>
        <h1 className="text-xl font-bold text-white">Marketplace</h1>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setCategoryFilter(null)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: !categoryFilter ? "#c9a227" : "rgba(255,255,255,0.06)",
              color: !categoryFilter ? "#0a0a0a" : "rgba(255,255,255,0.4)",
            }}
          >
            All Plans
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: categoryFilter === cat ? "#c9a227" : "rgba(255,255,255,0.06)",
                color: categoryFilter === cat ? "#0a0a0a" : "rgba(255,255,255,0.4)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 space-y-3">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-2"
        >
          {[
            { label: "Active Plans", value: "4", icon: TrendingUp, color: "#c9a227" },
            { label: "Avg ROI", value: "17.25%", icon: Star, color: "#4ade80" },
            { label: "Max Duration", value: "18 Mos", icon: Clock, color: "#60a5fa" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl p-3 flex flex-col gap-1"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Icon size={14} style={{ color: s.color }} />
                <p className="text-white font-bold text-sm">{s.value}</p>
                <p className="text-white/35 text-[9px] uppercase tracking-wider">{s.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Plan Cards */}
        {filtered.map((plan, i) => {
          const slotPct = (plan.taken / plan.slots) * 100;
          const remaining = plan.slots - plan.taken;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: plan.highlight
                  ? `linear-gradient(135deg, rgba(201,162,39,0.12), rgba(10,22,40,0.8))`
                  : "rgba(255,255,255,0.03)",
                border: plan.highlight
                  ? "1px solid rgba(201,162,39,0.3)"
                  : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {plan.highlight && (
                <div
                  className="px-4 py-1.5 flex items-center gap-1.5"
                  style={{ background: "#c9a227" }}
                >
                  <Star size={10} fill="#0a0a0a" className="text-[#0a0a0a]" />
                  <span className="text-[#0a0a0a] text-[10px] font-bold uppercase tracking-wider">Most Popular</span>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: plan.color }} />
                      <span className="text-white/40 text-[10px] uppercase tracking-wider">{plan.category}</span>
                    </div>
                    <h3 className="text-white font-bold text-base mt-0.5">{plan.name}</h3>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-3xl font-black"
                      style={{ color: plan.color }}
                    >
                      {plan.roi}%
                    </div>
                    <div className="text-white/40 text-[10px]">Annual ROI</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "Duration", value: `${plan.duration} months` },
                    { label: "Payout", value: plan.payout },
                    { label: "Min. Invest", value: formatCurrency(plan.min) },
                  ].map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-xl p-2"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <p className="text-white/40 text-[9px] uppercase tracking-wider">{detail.label}</p>
                      <p className="text-white text-xs font-semibold mt-0.5">{detail.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-white/35 text-[10px]">Slots Filled</span>
                    <span className="text-white/50 text-[10px]">{remaining} left of {plan.slots}</span>
                  </div>
                  <div className="h-1.5 bg-white/06 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${slotPct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: plan.color }}
                    />
                  </div>
                </div>

                <div className="flex gap-1 flex-wrap mb-3">
                  {plan.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium"
                      style={{
                        background: `${plan.color}12`,
                        color: plan.color,
                        border: `1px solid ${plan.color}30`,
                      }}
                    >
                      <Shield size={8} /> {f}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setSelectedPlan(plan); setStep("detail"); }}
                  className="w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: plan.highlight
                      ? "#c9a227"
                      : `${plan.color}15`,
                    color: plan.highlight ? "#0a0a0a" : plan.color,
                    border: plan.highlight ? "none" : `1px solid ${plan.color}30`,
                  }}
                >
                  Invest Now <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Investment Modal */}
      <AnimatePresence>
        {selectedPlan && step !== "browse" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-end"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && (setSelectedPlan(null), setStep("browse"))}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="rounded-t-3xl p-6"
              style={{ background: "#0f1f3d", border: "1px solid rgba(37,99,235,0.2)", borderBottom: "none" }}
            >
              {step === "success" ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(74,222,128,0.15)" }}>
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-white text-xl font-bold">Investment Placed!</h3>
                  <p className="text-white/50 text-sm mt-2">Your investment in {selectedPlan.name} is now active.</p>
                  <p className="text-green-400 font-bold text-lg mt-3">+{formatCurrency(computedReturns)} expected returns</p>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { setSelectedPlan(null); setStep("browse"); setAmount(""); }}
                    className="w-full h-12 rounded-xl font-bold mt-6"
                    style={{ background: "#c9a227", color: "#0a0a0a" }}
                  >
                    View Portfolio
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white font-bold text-lg">{selectedPlan.name}</h3>
                    <button onClick={() => { setSelectedPlan(null); setStep("browse"); }}>
                      <X size={20} className="text-white/40" />
                    </button>
                  </div>

                  {step === "detail" && (
                    <>
                      <div className="space-y-3 mb-5">
                        {selectedPlan.features.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1.5 mb-5">
                        <label className="text-white/50 text-xs uppercase tracking-wider">Investment Amount (₦)</label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder={`Min. ${formatCurrency(selectedPlan.min)}`}
                          style={{ height: 52 }}
                          className="w-full bg-white/04 border border-[#2563eb]/20 rounded-xl px-4 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#c9a227]/50"
                        />
                        {amount && parseFloat(amount) >= selectedPlan.min && (
                          <p className="text-green-400 text-xs">
                            Expected returns: +{formatCurrency(parseFloat(amount) * (selectedPlan.roi / 100))}
                          </p>
                        )}
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setStep("confirm")}
                        disabled={!amount || parseFloat(amount) < selectedPlan.min}
                        className="w-full h-12 rounded-xl font-bold disabled:opacity-40"
                        style={{ background: "#c9a227", color: "#0a0a0a" }}
                      >
                        Review Investment
                      </motion.button>
                    </>
                  )}

                  {step === "confirm" && (
                    <>
                      <div className="rounded-2xl p-4 mb-5 space-y-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">Plan</span>
                          <span className="text-white text-sm font-semibold">{selectedPlan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">Amount</span>
                          <span className="text-white text-sm font-semibold">{formatCurrency(parseFloat(amount))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">ROI</span>
                          <span className="font-semibold text-sm" style={{ color: "#c9a227" }}>{selectedPlan.roi}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">Duration</span>
                          <span className="text-white text-sm font-semibold">{selectedPlan.duration} months</span>
                        </div>
                        <div className="border-t border-white/08 pt-3 flex justify-between">
                          <span className="text-white font-semibold text-sm">Expected Returns</span>
                          <span className="font-bold text-sm" style={{ color: "#4ade80" }}>+{formatCurrency(computedReturns)}</span>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setStep("success")}
                        className="w-full h-12 rounded-xl font-bold"
                        style={{ background: "linear-gradient(135deg, #1a3a6b, #2563eb)", color: "white" }}
                      >
                        Confirm Investment
                      </motion.button>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BloompayBottomNav />
    </div>
  );
}
