"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BloompayBottomNav } from "@/components/bloompay/bottom-nav";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Copy, Eye, EyeOff } from "lucide-react";

const transactions = [
  { id: "1", type: "credit", desc: "Bank Transfer", amount: 500000, ref: "TXN-20240501", date: "May 1, 2026", status: "success" },
  { id: "2", type: "debit", desc: "Premium Growth Plan", amount: 500000, ref: "INV-20240501", date: "May 1, 2026", status: "success" },
  { id: "3", type: "credit", desc: "Quarterly Return - Fixed Income", amount: 37500, ref: "RET-20240428", date: "Apr 28, 2026", status: "success" },
  { id: "4", type: "credit", desc: "Referral Bonus - Emeka O.", amount: 5000, ref: "REF-20240425", date: "Apr 25, 2026", status: "success" },
  { id: "5", type: "debit", desc: "Withdrawal to GT Bank", amount: 200000, ref: "WTH-20240420", date: "Apr 20, 2026", status: "success" },
];

export default function BloompayWallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<"history" | "deposit" | "withdraw">("history");
  const [bankAmount, setBankAmount] = useState("");
  const balance = 145000;
  const totalIn = 542500;
  const totalOut = 700000;

  return (
    <div className="min-h-dvh bg-[#0a1628] safe-pb">
      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(10,22,40,0.95)", backdropFilter: "blur(20px)" }}>
        <p className="text-white/40 text-[10px] uppercase tracking-widest">Finance</p>
        <h1 className="text-xl font-bold text-white">My Wallet</h1>
      </div>

      <div className="px-5 pb-4 space-y-5">
        {/* Wallet Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f1f3d 0%, #1a3a6b 50%, #162848 100%)",
            border: "1px solid rgba(37,99,235,0.3)",
            boxShadow: "0 0 30px rgba(37,99,235,0.2)",
          }}
        >
          {/* Card decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c9a227, transparent)", transform: "translate(30%, -30%)" }} />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/50 text-xs uppercase tracking-wider">Available Balance</p>
              <button onClick={() => setShowBalance(!showBalance)} className="text-white/30">
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            <p className="text-4xl font-bold text-white mb-1">
              {showBalance ? formatCurrency(balance) : "₦••••••"}
            </p>

            <div className="flex items-center gap-1 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white/50 text-xs">Active · Verified</span>
            </div>

            {/* Account details */}
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="flex-1">
                <p className="text-white/40 text-[9px] uppercase tracking-wider">Virtual Account</p>
                <p className="text-white font-semibold text-sm mt-0.5">0123456789 · GTBank</p>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                <Copy size={13} className="text-white/50" />
              </button>
            </div>

            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-white/40 text-[10px]">Total In</p>
                <p className="text-green-400 font-bold text-sm">+{formatCurrency(totalIn)}</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white/40 text-[10px]">Total Out</p>
                <p className="text-red-400 font-bold text-sm">-{formatCurrency(totalOut)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab("deposit")}
            className="flex items-center justify-center gap-2 h-12 rounded-2xl font-semibold text-sm"
            style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <ArrowUpRight size={16} /> Deposit Funds
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab("withdraw")}
            className="flex items-center justify-center gap-2 h-12 rounded-2xl font-semibold text-sm"
            style={{ background: "rgba(37,99,235,0.1)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.2)" }}
          >
            <ArrowDownRight size={16} /> Withdraw
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "history", label: "History" },
            { id: "deposit", label: "Deposit" },
            { id: "withdraw", label: "Withdraw" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex-1 h-9 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: activeTab === tab.id ? "#c9a227" : "rgba(255,255,255,0.05)",
                color: activeTab === tab.id ? "#0a0a0a" : "rgba(255,255,255,0.4)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="divide-y divide-white/04">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-3 px-4 py-3.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: tx.type === "credit" ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)",
                      }}
                    >
                      {tx.type === "credit"
                        ? <ArrowUpRight size={16} className="text-green-400" />
                        : <ArrowDownRight size={16} className="text-red-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{tx.desc}</p>
                      <p className="text-white/30 text-xs">{tx.ref} · {tx.date}</p>
                    </div>
                    <p
                      className="font-bold text-sm flex-shrink-0"
                      style={{ color: tx.type === "credit" ? "#4ade80" : "#ef4444" }}
                    >
                      {tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {(activeTab === "deposit" || activeTab === "withdraw") && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h3 className="text-white font-bold text-base mb-4">
                {activeTab === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
              </h3>

              {activeTab === "deposit" ? (
                <div className="space-y-4">
                  <p className="text-white/50 text-sm">Transfer to this account to fund your wallet:</p>
                  <div className="rounded-xl p-4 space-y-2" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
                    <div className="flex justify-between">
                      <span className="text-white/50 text-sm">Bank</span>
                      <span className="text-white text-sm font-semibold">Guaranty Trust Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50 text-sm">Account No.</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-semibold">0123456789</span>
                        <Copy size={12} className="text-white/40" />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50 text-sm">Name</span>
                      <span className="text-white text-sm font-semibold">BLOOMPAY/CHIDI KALU</span>
                    </div>
                  </div>
                  <p className="text-white/30 text-xs text-center">Deposits are processed within 5 minutes</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-white/50 text-xs uppercase tracking-wider">Amount (₦)</label>
                    <input
                      type="number"
                      value={bankAmount}
                      onChange={(e) => setBankAmount(e.target.value)}
                      placeholder="Minimum ₦5,000"
                      style={{ height: 52 }}
                      className="w-full bg-white/04 border border-[#2563eb]/20 rounded-xl px-4 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#c9a227]/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/50 text-xs uppercase tracking-wider">Bank Account</label>
                    <select
                      style={{ height: 52 }}
                      className="w-full bg-white/04 border border-[#2563eb]/20 rounded-xl px-4 text-white text-sm focus:outline-none"
                    >
                      <option value="">Select saved bank account</option>
                      <option value="1">GT Bank – 0987654321</option>
                    </select>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    disabled={!bankAmount || parseFloat(bankAmount) < 5000}
                    className="w-full h-12 rounded-xl font-bold disabled:opacity-40 text-white"
                    style={{ background: "linear-gradient(135deg, #1a3a6b, #2563eb)" }}
                  >
                    Withdraw {bankAmount ? formatCurrency(parseFloat(bankAmount)) : ""}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BloompayBottomNav />
    </div>
  );
}
