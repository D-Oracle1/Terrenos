"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TerrenosSplash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/terrenos/login"), 3200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-dvh bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated gold grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Gold radial glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 500, height: 500 }}
          animate={{
            background: [
              "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)",
              "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 60%)",
              "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating gold particles */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#d4af37]"
            style={{
              left: `${10 + (i * 43) % 80}%`,
              top: `${10 + (i * 67) % 80}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 2.5 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.2) % 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo reveal */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #b8960c 100%)",
              boxShadow: "0 0 40px rgba(212,175,55,0.5), 0 0 100px rgba(212,175,55,0.2)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="6" width="16" height="16" rx="3" fill="#0a0a0a" />
              <rect x="26" y="6" width="16" height="16" rx="3" fill="#0a0a0a" opacity="0.7" />
              <rect x="6" y="26" width="16" height="16" rx="3" fill="#0a0a0a" opacity="0.7" />
              <rect x="26" y="26" width="16" height="16" rx="3" fill="#0a0a0a" opacity="0.4" />
            </svg>
          </div>
        </motion.div>

        {/* Brand name reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1
            className="text-5xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #b8960c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            TERRENOS
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/40 text-xs tracking-[0.4em] uppercase mt-2"
          >
            Real Management System
          </motion.p>
        </motion.div>

        {/* Animated lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-32"
          style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
        />

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex gap-1.5 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
          Enterprise · Precision · Excellence
        </p>
      </motion.div>
    </div>
  );
}
