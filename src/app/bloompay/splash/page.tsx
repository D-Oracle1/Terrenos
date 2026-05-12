"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BloompaySlash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/bloompay/login"), 3200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-dvh bg-[#0a1628] flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated royal blue background */}
      <div className="absolute inset-0">
        {/* Radial blue glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 600, height: 600 }}
          animate={{
            background: [
              "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(10,22,40,0) 60%)",
              "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(10,22,40,0) 60%)",
              "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(10,22,40,0) 60%)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Gold accent glow top right */}
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
          animate={{
            background: [
              "radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(201,162,39,0.22) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Floating particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              left: `${5 + (i * 37) % 90}%`,
              top: `${5 + (i * 53) % 90}%`,
              background: i % 2 === 0 ? "#2563eb" : "#c9a227",
              opacity: 0.15 + (i % 5) * 0.05,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.25) % 2.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Fine grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="bloom-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#2563eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bloom-grid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1a3a6b 0%, #2563eb 50%, #1d4ed8 100%)",
              boxShadow: "0 0 40px rgba(37,99,235,0.5), 0 0 100px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="24" cy="24" r="12" stroke="#c9a227" strokeWidth="1.5" />
              <path d="M24 14v20M17 19l7-5 7 5M17 29l7 5 7-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1
            className="text-5xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 50%, #c9a227 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BLOOMPAY
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/40 text-xs tracking-[0.4em] uppercase mt-2"
          >
            Private Wealth Platform
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-32"
          style={{ background: "linear-gradient(90deg, transparent, #c9a227, transparent)" }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex gap-1.5 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#c9a227" }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
          Wealth · Growth · Legacy
        </p>
      </motion.div>
    </div>
  );
}
