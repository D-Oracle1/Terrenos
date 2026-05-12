"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/stores/auth";
import type { AppType } from "@/types";

const apps = [
  {
    id: "terrenos" as AppType,
    name: "TERRENOS",
    tagline: "Command Center",
    subtitle: "Enterprise Management System",
    accent: "#d4af37",
    accentDim: "rgba(212,175,55,0.12)",
    border: "rgba(212,175,55,0.25)",
    glow: "rgba(212,175,55,0.5)",
    route: "/terrenos/splash",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="4" width="12" height="12" rx="2" fill="#d4af37" />
        <rect x="20" y="4" width="12" height="12" rx="2" fill="#d4af37" opacity="0.6" />
        <rect x="4" y="20" width="12" height="12" rx="2" fill="#d4af37" opacity="0.6" />
        <rect x="20" y="20" width="12" height="12" rx="2" fill="#d4af37" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "bloompay" as AppType,
    name: "BLOOMPAY",
    tagline: "Investment Banking",
    subtitle: "Private Wealth Management",
    accent: "#c9a227",
    accentDim: "rgba(37,99,235,0.12)",
    border: "rgba(37,99,235,0.25)",
    glow: "rgba(37,99,235,0.5)",
    route: "/bloompay/splash",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#2563eb" strokeWidth="2" />
        <path d="M18 10v16M13 14l5-4 5 4M13 22l5 4 5-4" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "agrocity" as AppType,
    name: "AGROCITY",
    tagline: "Agricultural Finance",
    subtitle: "Sustainable Investment Platform",
    accent: "#4ade80",
    accentDim: "rgba(45,122,45,0.12)",
    border: "rgba(45,122,45,0.25)",
    glow: "rgba(74,222,128,0.5)",
    route: "/agrocity/splash",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 6C18 6 8 14 8 22a10 10 0 0020 0C28 14 18 6 18 6z" fill="#2d7a2d" opacity="0.7" />
        <path d="M18 12C18 12 11 18 11 24a7 7 0 0014 0C25 18 18 12 18 12z" fill="#4ade80" opacity="0.9" />
        <line x1="18" y1="32" x2="18" y2="20" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function PlatformSelector() {
  const router = useRouter();
  const setActiveApp = useAuthStore((s) => s.setActiveApp);
  const [selecting, setSelecting] = useState<AppType | null>(null);

  const handleSelect = (app: (typeof apps)[0]) => {
    setSelecting(app.id);
    setActiveApp(app.id);
    setTimeout(() => router.push(app.route), 600);
  };

  return (
    <div className="min-h-dvh bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Gold particle field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${5 + (i * 37) % 90}%`,
              top: `${5 + (i * 61) % 90}%`,
              background: i % 3 === 0 ? "#d4af37" : i % 3 === 1 ? "#2563eb" : "#4ade80",
              opacity: 0.08 + (i % 5) * 0.04,
            }}
            animate={{ y: [0, -20 - (i % 15), 0], opacity: [0.08, 0.3, 0.08] }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.3) % 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Radial glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10 px-6 z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-5"
        >
          <div
            className="w-18 h-18 rounded-2xl flex items-center justify-center mx-auto"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)",
              boxShadow: "0 0 30px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15)",
              width: 72,
              height: 72,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="4" y="4" width="12" height="12" rx="2" fill="#0a0a0a" />
              <rect x="20" y="4" width="12" height="12" rx="2" fill="#0a0a0a" opacity="0.7" />
              <rect x="4" y="20" width="12" height="12" rx="2" fill="#0a0a0a" opacity="0.7" />
              <rect x="20" y="20" width="12" height="12" rx="2" fill="#0a0a0a" opacity="0.4" />
            </svg>
          </div>
        </motion.div>
        <h1 className="text-4xl font-bold tracking-tight text-gradient-gold">
          TERRENOS
        </h1>
        <p className="text-white/35 text-xs tracking-[0.25em] uppercase mt-2">
          Enterprise Ecosystem
        </p>
      </motion.div>

      {/* App Selection Cards */}
      <div className="w-full max-w-sm px-5 flex flex-col gap-3 z-10">
        {apps.map((app, i) => (
          <motion.button
            key={app.id}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(app)}
            disabled={selecting !== null}
            className="w-full text-left relative overflow-hidden rounded-2xl transition-all duration-300 focus:outline-none"
            style={{
              background: `linear-gradient(135deg, ${app.accentDim}, rgba(0,0,0,0.5))`,
              border: `1px solid ${app.border}`,
            }}
          >
            <div className="relative flex items-center gap-4 px-4 py-3.5">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: `1px solid ${app.border}`,
                }}
              >
                {app.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm tracking-widest" style={{ color: app.accent }}>
                  {app.name}
                </div>
                <div className="text-white text-sm font-semibold">{app.tagline}</div>
                <div className="text-white/40 text-xs mt-0.5 truncate">{app.subtitle}</div>
              </div>
              <motion.div
                animate={selecting === app.id ? { x: [0, 4, 0], opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 0.4, repeat: Infinity }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6 9h6M9 6l3 3-3 3" stroke={app.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            <AnimatePresence>
              {selecting === app.id && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ background: `${app.glow}18` }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-10 text-white/15 text-[10px] tracking-[0.3em] uppercase z-10"
      >
        TERRENOS RMS · Enterprise Edition
      </motion.p>
    </div>
  );
}
