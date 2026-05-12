import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TERRENOS RMS",
  description: "Enterprise Command Center",
  manifest: "/terrenos-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TERRENOS",
  },
};

export default function TerrenosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#0a0a0a]">
      {children}
    </div>
  );
}
