"use client";

import { create } from "zustand";
import type { Client, Property, Analytics } from "@/types";

interface TerrenosState {
  clients: Client[];
  properties: Property[];
  analytics: Analytics[];
  activeTab: string;
  setClients: (clients: Client[]) => void;
  setProperties: (properties: Property[]) => void;
  setAnalytics: (analytics: Analytics[]) => void;
  setActiveTab: (tab: string) => void;
}

export const useTerrenosStore = create<TerrenosState>((set) => ({
  clients: [],
  properties: [],
  analytics: [],
  activeTab: "home",
  setClients: (clients) => set({ clients }),
  setProperties: (properties) => set({ properties }),
  setAnalytics: (analytics) => set({ analytics }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
