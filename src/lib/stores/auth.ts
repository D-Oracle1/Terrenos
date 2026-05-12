"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AppType } from "@/types";

interface AuthState {
  user: User | null;
  activeApp: AppType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setActiveApp: (app: AppType) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      activeApp: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setActiveApp: (activeApp) => set({ activeApp }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false, activeApp: null }),
    }),
    {
      name: "terrenos-auth",
      partialize: (state) => ({ activeApp: state.activeApp }),
    }
  )
);
