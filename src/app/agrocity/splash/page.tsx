"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AgrocitySplash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/agrocity/login"), 3200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-dvh bg-[#0d1f0d] flex flex-col items-center justify-center overflow-hidden relative">
      {/* Organic animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 600, height: 600 }}
          animate={{
            background: [
              "radial-gradient(circle, rgba(45,122,45,0.2) 0%, transparent 60%)",
              "radial-gradient(circle, rgba(74,222,128,0.25) 0%, transparent 60%)",
              "radial-gradient(circle, rgba(45,122,45,0.2) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating leaf particles */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${5 + (i * 43) % 90}%`,
              top: `${5 + (i * 67) % 90}%`,
              width: i % 3 === 0 ? 6 : 4,
              height: i % 3 === 0 ? 8 : 5,
              borderRadius: "50% 0 50% 0",
              background: i % 2 === 0 ? "rgba(45,122,45,0.4)" : "rgba(74,222,128,0.3)",
              rotate: `${i * 30}deg`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [`${i * 30}deg`, `${i * 30 + 20}deg`, `${i * 30}deg`],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.3) % 3,
              ease: "easeInOut",
            }}
          />
        ))}

        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="agro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2d7a2d" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#agro-grid)" />
        </svg>
      </div>

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
              background: "linear-gradient(135deg, #1a3a1a 0%, #2d7a2d 50%, #163316 100%)",
              boxShadow: "0 0 40px rgba(45,122,45,0.5), 0 0 100px rgba(74,222,128,0.15)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 8C24 8 10 18 10 30a14 14 0 0028 0C38 18 24 8 24 8z" fill="#2d7a2d" opacity="0.7" />
              <path d="M24 16C24 16 14 24 14 32a10 10 0 0020 0C34 24 24 16 24 16z" fill="#4ade80" opacity="0.9" />
              <line x1="24" y1="44" x2="24" y2="28" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
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
              background: "linear-gradient(135deg, #2d7a2d 0%, #4ade80 50%, #86efac 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AGROCITY
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/40 text-xs tracking-[0.4em] uppercase mt-2"
          >
            Agricultural Investment
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-32"
          style={{ background: "linear-gradient(90deg, transparent, #4ade80, transparent)" }}
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
              className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"
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
          Grow · Harvest · Prosper
        </p>
      </motion.div>
    </div>
  );
}
