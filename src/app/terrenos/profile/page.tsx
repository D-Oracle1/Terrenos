"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TerrenosBottomNav } from "@/components/terrenos/bottom-nav";
import {
  User, Bell, Shield, HelpCircle, LogOut, ChevronRight,
  Briefcase, BarChart3, Settings, Star,
} from "lucide-react";

const menuSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Information", desc: "Name, phone, email" },
      { icon: Briefcase, label: "Role & Permissions", desc: "Branch Manager · Lagos" },
      { icon: Shield, label: "Security", desc: "Password, 2FA" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", desc: "Push, email alerts" },
      { icon: Settings, label: "App Settings", desc: "Theme, language" },
    ],
  },
  {
    title: "Reports",
    items: [
      { icon: BarChart3, label: "My Performance", desc: "Sales, targets, KPIs" },
      { icon: Star, label: "Leaderboard", desc: "Top performers" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", desc: "FAQs & guides" },
    ],
  },
];

const stats = [
  { label: "Clients", value: "84" },
  { label: "Properties", value: "23" },
  { label: "Revenue", value: "₦142M" },
  { label: "Rating", value: "4.9" },
];

export default function TerrenosProfile() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    router.replace("/");
  };

  return (
    <div className="min-h-dvh bg-[#0a0a0a] safe-pb">
      {/* Header background */}
      <div
        className="h-48 relative"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.8) 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 pt-14">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black mb-3"
            style={{
              background: "linear-gradient(135deg, #d4af37, #b8960c)",
              color: "#0a0a0a",
              boxShadow: "0 0 30px rgba(212,175,55,0.4)",
            }}
          >
            OA
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-white font-bold text-lg">Olumide Adeyemi</h2>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                style={{ background: "rgba(212,175,55,0.2)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                Branch Manager
              </span>
              <span className="text-white/40 text-xs">· Lagos Branch</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 -mt-0 pb-4 space-y-5">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-2 mt-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(0,0,0,0.4))",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              <p className="text-white font-bold text-base">{s.value}</p>
              <p className="text-white/40 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.05 }}
          >
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">{section.title}</p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/03"
                    style={{
                      borderBottom: i < section.items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(212,175,55,0.1)" }}
                    >
                      <Icon size={16} className="text-[#d4af37]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p className="text-white/35 text-xs">{item.desc}</p>
                    </div>
                    <ChevronRight size={15} className="text-white/25" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl text-sm font-semibold"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#ef4444",
          }}
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>

        <p className="text-center text-white/15 text-[10px] tracking-widest uppercase">
          TERRENOS RMS v2.0.1 · Enterprise
        </p>
      </div>

      <TerrenosBottomNav />
    </div>
  );
}
