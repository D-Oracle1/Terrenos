"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BloompayLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      router.replace("/bloompay/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#0a1628] flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 right-0 h-72"
          style={{ background: "linear-gradient(180deg, rgba(37,99,235,0.1) 0%, transparent 100%)" }}
        />
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="bloom-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#2563eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bloom-grid)" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center px-5 pt-14 pb-4"
      >
        <Link
          href="/"
          className="w-10 h-10 rounded-xl flex items-center justify-center mr-4"
          style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}
        >
          <ArrowLeft size={18} className="text-white/60" />
        </Link>
        <div>
          <div className="text-white/40 text-xs tracking-widest uppercase">Welcome to</div>
          <div
            className="text-lg font-bold"
            style={{
              background: "linear-gradient(135deg, #2563eb, #c9a227)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BLOOMPAY
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <div className="relative z-10 flex-1 flex flex-col px-5 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1a3a6b, #2563eb)",
                boxShadow: "0 0 20px rgba(37,99,235,0.4)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path d="M14 8v12M10 10.5l4-3 4 3M10 17.5l4 3 4-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Investor Login</h2>
              <p className="text-white/40 text-sm">Access your portfolio</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <label className="text-white/50 text-xs uppercase tracking-wider font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@bloompay.com"
                  required
                  style={{ height: 52 }}
                  className="w-full bg-white/04 border border-[#2563eb]/20 rounded-xl pl-11 pr-4 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#2563eb]/50 focus:ring-2 focus:ring-[#2563eb]/15 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-white/50 text-xs uppercase tracking-wider font-medium">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ height: 52 }}
                  className="w-full bg-white/04 border border-[#2563eb]/20 rounded-xl pl-11 pr-12 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#2563eb]/50 focus:ring-2 focus:ring-[#2563eb]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button type="button" style={{ color: "#c9a227" }} className="text-sm">
                Forgot Password?
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl font-bold text-white text-base transition-all disabled:opacity-50 mt-2"
              style={{
                background: "linear-gradient(135deg, #1a3a6b 0%, #2563eb 100%)",
                boxShadow: loading ? "none" : "0 0 20px rgba(37,99,235,0.4)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Access Portfolio"
              )}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/08" />
            <span className="text-white/25 text-xs">SECURE BANKING</span>
            <div className="flex-1 h-px bg-white/08" />
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            {["Bank-grade SSL", "Insured Funds", "CBN Regulated"].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider"
                style={{
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  color: "#60a5fa",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 px-5 pb-10 text-center">
        <p className="text-white/15 text-[10px] tracking-widest uppercase">
          Bloompay · Investment Platform · v2.0
        </p>
      </div>
    </div>
  );
}
