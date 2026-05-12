"use client";

import { create } from "zustand";
import type { Investor, Investment, FarmCycle } from "@/types";

interface AgrocityState {
  investor: Investor | null;
  investments: Investment[];
  farmCycles: FarmCycle[];
  activeTab: string;
  setInvestor: (investor: Investor | null) => void;
  setInvestments: (investments: Investment[]) => void;
  setFarmCycles: (cycles: FarmCycle[]) => void;
  setActiveTab: (tab: string) => void;
}

export const useAgrocityStore = create<AgrocityState>((set) => ({
  investor: null,
  investments: [],
  farmCycles: [],
  activeTab: "home",
  setInvestor: (investor) => set({ investor }),
  setInvestments: (investments) => set({ investments }),
  setFarmCycles: (cycles) => set({ farmCycles: cycles }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
