"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgrocityBottomNav } from "@/components/agrocity/bottom-nav";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight, Leaf, CheckCircle, X, Shield } from "lucide-react";

const investPlans = [
  {
    id: "1", name: "Starter Plot", crop: "Maize", location: "Kaduna",
    price_per_plot: 25000, roi: 22, duration: 6, min_plots: 1, max_plots: 10,
    color: "#86efac", highlight: false,
    perks: ["Digital farm certificate", "Monthly harvest updates", "Free exit after 3 months"],
  },
  {
    id: "2", name: "Growth Bundle", crop: "Rice", location: "Kano",
    price_per_plot: 35000, roi: 28, duration: 7, min_plots: 3, max_plots: 30,
    color: "#4ade80", highlight: true,
    perks: ["Priority plot selection", "Quarterly ROI distributions", "Farm visit invitation", "Certificate + insurance"],
  },
  {
    id: "3", name: "Impact Pack", crop: "Cassava", location: "Delta",
    price_per_plot: 40000, roi: 25, duration: 12, min_plots: 5, max_plots: 100,
    color: "#22c55e", highlight: false,
    perks: ["Carbon credit certificate", "Processing plant shares", "Annual impact report", "VIP farmer events"],
  },
];

export default function AgrocityInvest() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof investPlans)[0] | null>(null);
  const [plots, setPlots] = useState("1");
  const [step, setStep] = useState<"browse" | "detail" | "confirm" | "success">("browse");

  const computedAmount = selectedPlan && plots ? selectedPlan.price_per_plot * parseInt(plots || "0") : 0;
  const computedReturns = computedAmount * (selectedPlan?.roi ?? 0) / 100;

  return (
    <div className="min-h-dvh bg-[#0d1f0d] safe-pb">
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(13,31,13,0.95)", backdropFilter: "blur(20px)" }}>
        <p className="text-white/40 text-[10px] uppercase tracking-widest">Agrocity</p>
        <h1 className="text-xl font-bold text-white">Invest in Farms</h1>
      </div>

      <div className="px-5 pb-4 space-y-3">
        {/* Summary Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-2"
        >
          {[
            { label: "Active Plans", value: "3" },
            { label: "Avg ROI", value: "25%+" },
            { label: "Min. Entry", value: "₦25K" },
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

        {investPlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: plan.highlight ? "linear-gradient(135deg, rgba(74,222,128,0.1), rgba(13,31,13,0.8))" : "rgba(255,255,255,0.03)",
              border: plan.highlight ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {plan.highlight && (
              <div className="px-4 py-1.5 flex items-center gap-1.5" style={{ background: "#4ade80" }}>
                <Leaf size={10} fill="#0d1f0d" className="text-[#0d1f0d]" />
                <span className="text-[#0d1f0d] text-[10px] font-bold uppercase tracking-wider">Most Popular</span>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: plan.color }} />
                    <span className="text-white/40 text-[10px] uppercase tracking-wider">{plan.crop} · {plan.location}</span>
                  </div>
                  <h3 className="text-white font-bold text-base">{plan.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black" style={{ color: plan.color }}>{plan.roi}%</p>
                  <p className="text-white/40 text-[10px]">ROI</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: "Per Plot", value: formatCurrency(plan.price_per_plot) },
                  { label: "Duration", value: `${plan.duration} months` },
                  { label: "Min. Plots", value: `${plan.min_plots} plot` },
                ].map((d) => (
                  <div key={d.label} className="rounded-xl p-2" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <p className="text-white/35 text-[9px] uppercase">{d.label}</p>
                    <p className="text-white text-xs font-semibold mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-1.5 flex-wrap mb-3">
                {plan.perks.slice(0, 2).map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium"
                    style={{ background: `${plan.color}12`, color: plan.color, border: `1px solid ${plan.color}30` }}
                  >
                    <Shield size={8} /> {p}
                  </span>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { setSelectedPlan(plan); setPlots("1"); setStep("detail"); }}
                className="w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                style={{
                  background: plan.highlight
                    ? "linear-gradient(135deg, #163316, #2d7a2d)"
                    : `${plan.color}15`,
                  color: plan.highlight ? "white" : plan.color,
                  border: plan.highlight ? "none" : `1px solid ${plan.color}30`,
                }}
              >
                Invest in Plots <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
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
              style={{ background: "#0f2a0f", border: "1px solid rgba(45,122,45,0.2)", borderBottom: "none" }}
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
                  <h3 className="text-white text-xl font-bold">Farm Investment Active!</h3>
                  <p className="text-white/50 text-sm mt-2">{plots} plot(s) in {selectedPlan.name}</p>
                  <p className="text-green-400 font-bold text-lg mt-3">+{formatCurrency(computedReturns)} projected returns</p>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { setSelectedPlan(null); setStep("browse"); setPlots("1"); }}
                    className="w-full h-12 rounded-xl font-bold mt-6 text-white"
                    style={{ background: "linear-gradient(135deg, #163316, #2d7a2d)" }}
                  >
                    View My Farms
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
                        {selectedPlan.perks.map((perk) => (
                          <div key={perk} className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{perk}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1.5 mb-5">
                        <label className="text-white/50 text-xs uppercase tracking-wider">Number of Plots</label>
                        <input
                          type="number"
                          value={plots}
                          min={selectedPlan.min_plots}
                          max={selectedPlan.max_plots}
                          onChange={(e) => setPlots(e.target.value)}
                          style={{ height: 52 }}
                          className="w-full bg-white/04 border border-[#2d7a2d]/20 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-[#4ade80]/50"
                        />
                        {plots && parseInt(plots) >= selectedPlan.min_plots && (
                          <div className="flex justify-between text-xs">
                            <span className="text-white/40">Total Investment:</span>
                            <span className="text-white font-bold">{formatCurrency(selectedPlan.price_per_plot * parseInt(plots))}</span>
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setStep("confirm")}
                        disabled={!plots || parseInt(plots) < selectedPlan.min_plots}
                        className="w-full h-12 rounded-xl font-bold text-white disabled:opacity-40"
                        style={{ background: "linear-gradient(135deg, #163316, #2d7a2d)" }}
                      >
                        Review Investment
                      </motion.button>
                    </>
                  )}

                  {step === "confirm" && (
                    <>
                      <div className="rounded-2xl p-4 mb-5 space-y-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">Farm Plan</span>
                          <span className="text-white text-sm font-semibold">{selectedPlan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">Plots</span>
                          <span className="text-white text-sm font-semibold">{plots}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">Amount</span>
                          <span className="text-white text-sm font-semibold">{formatCurrency(computedAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 text-sm">ROI</span>
                          <span className="font-semibold text-sm text-green-400">{selectedPlan.roi}%</span>
                        </div>
                        <div className="border-t border-white/08 pt-3 flex justify-between">
                          <span className="text-white font-semibold text-sm">Projected Returns</span>
                          <span className="font-bold text-sm text-green-400">+{formatCurrency(computedReturns)}</span>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setStep("success")}
                        className="w-full h-12 rounded-xl font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #163316, #2d7a2d)" }}
                      >
                        Confirm Farm Investment
                      </motion.button>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AgrocityBottomNav />
    </div>
  );
}
