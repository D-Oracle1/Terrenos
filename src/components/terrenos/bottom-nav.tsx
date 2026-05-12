"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Home, Users, Building2, MessageSquare, User } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/terrenos/dashboard" },
  { id: "crm", label: "CRM", icon: Users, href: "/terrenos/crm" },
  { id: "properties", label: "Properties", icon: Building2, href: "/terrenos/properties" },
  { id: "chat", label: "Chat", icon: MessageSquare, href: "/terrenos/chat" },
  { id: "profile", label: "Profile", icon: User, href: "/terrenos/profile" },
];

export function TerrenosBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const activeId = navItems.find((item) => pathname.startsWith(item.href))?.id ?? "home";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 nav-blur"
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
                  layoutId="terrenos-nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: "#d4af37" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon
                  size={22}
                  style={{ color: isActive ? "#d4af37" : "rgba(255,255,255,0.35)" }}
                  strokeWidth={isActive ? 2 : 1.5}
                />
              </motion.div>
              <span
                className="text-[9px] font-semibold tracking-wider uppercase truncate w-full text-center"
                style={{ color: isActive ? "#d4af37" : "rgba(255,255,255,0.3)" }}
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
