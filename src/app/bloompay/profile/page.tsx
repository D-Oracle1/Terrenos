"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BloompayBottomNav } from "@/components/bloompay/bottom-nav";
import { ChevronRight, User, Shield, Bell, HelpCircle, LogOut, Copy, Star, Gift } from "lucide-react";

export default function BloompayProfile() {
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
    { label: "Invested", value: "₦2.25M" },
    { label: "Returns", value: "₦330K" },
    { label: "Plans", value: "3" },
    { label: "Referrals", value: "7" },
  ];

  const menuItems = [
    { icon: User, label: "Personal Information", desc: "KYC verified" },
    { icon: Shield, label: "Security Settings", desc: "2FA enabled" },
    { icon: Bell, label: "Notifications", desc: "Alerts & updates" },
    { icon: Gift, label: "Referral Program", desc: "Earn ₦5,000 per referral" },
    { icon: Star, label: "VIP Status", desc: "Gold Investor" },
    { icon: HelpCircle, label: "Help & Support", desc: "Chat with us" },
  ];

  return (
    <div className="min-h-dvh bg-[#0a1628] safe-pb">
      {/* Profile Header */}
      <div
        className="h-52 relative"
        style={{
          background: "linear-gradient(135deg, #0f1f3d 0%, #1a3a6b 60%, #0a1628 100%)",
          borderBottom: "1px solid rgba(37,99,235,0.15)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 pt-14">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black mb-3"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 0 30px rgba(37,99,235,0.4)",
              color: "white",
            }}
          >
            CK
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-white font-bold text-lg">Chidi Kalu</h2>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <Star size={10} fill="#c9a227" style={{ color: "#c9a227" }} />
              <span className="text-xs font-semibold" style={{ color: "#c9a227" }}>Gold Investor</span>
              <span className="text-white/30 text-xs">· BP-24891</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 mt-4 pb-4 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-3 text-center"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}
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
            background: "linear-gradient(135deg, rgba(201,162,39,0.1), rgba(37,99,235,0.05))",
            border: "1px solid rgba(201,162,39,0.2)",
          }}
        >
          <Gift size={18} style={{ color: "#c9a227" }} className="flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white/50 text-[10px] uppercase tracking-wider">Your Referral Code</p>
            <p className="text-white font-bold text-base">CHIDI-2024</p>
          </div>
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "#c9a227", color: "#0a0a0a" }}
          >
            <Copy size={11} /> Copy
          </button>
        </motion.div>

        {/* Menu */}
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
                  style={{ background: "rgba(37,99,235,0.1)" }}
                >
                  <Icon size={16} className="text-blue-400" />
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
          Bloompay · Wealth Platform · v2.0
        </p>
      </div>

      <BloompayBottomNav />
    </div>
  );
}
