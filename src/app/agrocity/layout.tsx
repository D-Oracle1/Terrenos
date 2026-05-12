import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agrocity",
  description: "Agricultural Investment Platform",
  manifest: "/agrocity-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Agrocity",
  },
};

export default function AgrocityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#0d1f0d]">
      {children}
    </div>
  );
}
