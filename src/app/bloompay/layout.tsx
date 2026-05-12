import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bloompay",
  description: "Private Wealth Investment Platform",
  manifest: "/bloompay-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bloompay",
  },
};

export default function BloompayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#0a1628]">
      {children}
    </div>
  );
}
