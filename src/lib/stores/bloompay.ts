"use client";

import { create } from "zustand";
import type { Investor, Investment, InvestmentPlan } from "@/types";

interface BloompayState {
  investor: Investor | null;
  investments: Investment[];
  plans: InvestmentPlan[];
  activeTab: string;
  setInvestor: (investor: Investor | null) => void;
  setInvestments: (investments: Investment[]) => void;
  setPlans: (plans: InvestmentPlan[]) => void;
  setActiveTab: (tab: string) => void;
}

export const useBloompayStore = create<BloompayState>((set) => ({
  investor: null,
  investments: [],
  plans: [],
  activeTab: "home",
  setInvestor: (investor) => set({ investor }),
  setInvestments: (investments) => set({ investments }),
  setPlans: (plans) => set({ plans }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
