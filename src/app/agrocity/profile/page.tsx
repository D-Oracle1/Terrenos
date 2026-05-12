"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AgrocityBottomNav } from "@/components/agrocity/bottom-nav";
import { ChevronRight, User, Shield, Bell, HelpCircle, LogOut, Copy, Leaf, Gift } from "lucide-react";

export default function AgrocityProfile() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    router.replace("/");
  };

  const stats = [
    { label: "Invested", value: "₦950K" },
    { label: "Returns", value: "₦100K" },
    { label: "Farms", value: "3" },
    { label: "Impact", value: "4.5ha" },
  ];

  const menuItems = [
    { icon: User, label: "Personal Information", desc: "KYC verified" },
    { icon: Shield, label: "Security Settings", desc: "PIN & 2FA" },
    { icon: Bell, label: "Notifications", desc: "Harvest alerts & updates" },
    { icon: Gift, label: "Referral Program", desc: "Earn ₦3,000 per referral" },
    { icon: Leaf, label: "My Impact", desc: "Carbon footprint tracker" },
    { icon: HelpCircle, label: "Help & Support", desc: "Talk to our team" },
  ];

  return (
    <div className="min-h-dvh bg-[#0d1f0d] safe-pb">
      <div
        className="h-52 relative"
        style={{
          background: "linear-gradient(135deg, #0f2a0f 0%, #1a3a1a 60%, #0d1f0d 100%)",
          borderBottom: "1px solid rgba(45,122,45,0.15)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 pt-14">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black mb-3"
            style={{
              background: "linear-gradient(135deg, #2d7a2d, #163316)",
              boxShadow: "0 0 30px rgba(45,122,45,0.4)",
              color: "white",
            }}
          >
            AO
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-white font-bold text-lg">Amaka Obi</h2>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <Leaf size={10} style={{ color: "#4ade80" }} />
              <span className="text-xs font-semibold" style={{ color: "#4ade80" }}>Impact Farmer</span>
              <span className="text-white/30 text-xs">· AG-18234</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 mt-4 pb-4 space-y-5">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-3 text-center"
              style={{ background: "rgba(45,122,45,0.08)", border: "1px solid rgba(45,122,45,0.15)" }}
            >
              <p className="text-white font-bold text-base">{s.value}</p>
              <p className="text-white/35 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(74,222,128,0.08), rgba(45,122,45,0.05))",
            border: "1px solid rgba(74,222,128,0.2)",
          }}
        >
          <Gift size={18} style={{ color: "#4ade80" }} className="flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white/50 text-[10px] uppercase tracking-wider">Referral Code</p>
            <p className="text-white font-bold text-base">AMAKA-AGRO</p>
          </div>
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "#4ade80", color: "#0d1f0d" }}
          >
            <Copy size={11} /> Copy
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                style={{ borderBottom: i < menuItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(45,122,45,0.1)" }}
                >
                  <Icon size={16} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  <p className="text-white/35 text-xs">{item.desc}</p>
                </div>
                <ChevronRight size={15} className="text-white/25" />
              </motion.button>
            );
          })}
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="w-full h-12 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
        >
          <LogOut size={16} /> Sign Out
        </motion.button>

        <p className="text-center text-white/15 text-[10px] tracking-widest uppercase">
          Agrocity · Agricultural Platform · v2.0
        </p>
      </div>

      <AgrocityBottomNav />
    </div>
  );
}
