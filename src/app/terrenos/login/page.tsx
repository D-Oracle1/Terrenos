"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TerrenosLogin() {
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
      router.replace("/terrenos/dashboard");
    } catch {
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#0a0a0a] flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 right-0 h-72"
          style={{
            background: "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, transparent 100%)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center px-5 pt-14 pb-4"
      >
        <Link
          href="/"
          className="w-10 h-10 rounded-xl glass flex items-center justify-center mr-4"
        >
          <ArrowLeft size={18} className="text-white/60" />
        </Link>
        <div>
          <div className="text-white/40 text-xs tracking-widest uppercase">Welcome to</div>
          <div className="text-lg font-bold text-gradient-gold">TERRENOS RMS</div>
        </div>
      </motion.div>

      {/* Form */}
      <div className="relative z-10 flex-1 flex flex-col px-5 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #b8960c 100%)",
                boxShadow: "0 0 20px rgba(212,175,55,0.3)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="3" width="9" height="9" rx="1.5" fill="#0a0a0a" />
                <rect x="15" y="3" width="9" height="9" rx="1.5" fill="#0a0a0a" opacity="0.7" />
                <rect x="3" y="15" width="9" height="9" rx="1.5" fill="#0a0a0a" opacity="0.7" />
                <rect x="15" y="15" width="9" height="9" rx="1.5" fill="#0a0a0a" opacity="0.4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <p className="text-white/40 text-sm">Command Center Access</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
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
                  placeholder="admin@terrenos.com"
                  required
                  className="w-full h-13 bg-white/05 border border-[#d4af37]/20 rounded-xl pl-11 pr-4 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/15 transition-all"
                  style={{ height: 52 }}
                />
              </div>
            </div>

            {/* Password */}
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
                  className="w-full h-13 bg-white/05 border border-[#d4af37]/20 rounded-xl pl-11 pr-12 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/15 transition-all"
                  style={{ height: 52 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="flex justify-end">
              <button type="button" className="text-[#d4af37] text-sm">
                Forgot Password?
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl font-bold text-[#0a0a0a] text-base transition-all disabled:opacity-50 mt-2"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #b8960c 100%)",
                boxShadow: loading ? "none" : "0 0 20px rgba(212,175,55,0.4)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">SECURE ACCESS</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Security badges */}
          <div className="flex gap-2 justify-center flex-wrap">
            {["256-bit SSL", "2FA Ready", "SOC 2"].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  color: "#d4af37",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-5 pb-10 text-center">
        <p className="text-white/20 text-[10px] tracking-widest uppercase">
          TERRENOS RMS · Enterprise Edition · v2.0
        </p>
      </div>
    </div>
  );
}
