"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Home, Leaf, TrendingUp, BarChart3, User } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/agrocity/dashboard" },
  { id: "farms", label: "Farms", icon: Leaf, href: "/agrocity/farms" },
  { id: "invest", label: "Invest", icon: TrendingUp, href: "/agrocity/invest" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/agrocity/reports" },
  { id: "profile", label: "Profile", icon: User, href: "/agrocity/profile" },
];

export function AgrocityBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const activeId = navItems.find((item) => pathname.startsWith(item.href))?.id ?? "home";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 nav-blur-agro"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {navItems.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="flex-1 flex flex-col items-center gap-0.5 py-1.5 relative focus:outline-none min-w-0"
            >
              {isActive && (
                <motion.div
                  layoutId="agro-nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: "#4ade80" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon
                  size={22}
                  style={{ color: isActive ? "#4ade80" : "rgba(255,255,255,0.3)" }}
                  strokeWidth={isActive ? 2 : 1.5}
                />
              </motion.div>
              <span
                className="text-[9px] font-semibold tracking-wider uppercase truncate w-full text-center"
                style={{ color: isActive ? "#4ade80" : "rgba(255,255,255,0.25)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
