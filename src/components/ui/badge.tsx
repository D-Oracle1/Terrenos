import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        gold: "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30",
        bloom: "bg-[#2563eb]/20 text-[#60a5fa] border border-[#2563eb]/30",
        agro: "bg-[#2d7a2d]/20 text-[#4ade80] border border-[#2d7a2d]/30",
        success: "bg-green-500/20 text-green-400 border border-green-500/30",
        warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        danger: "bg-red-500/20 text-red-400 border border-red-500/30",
        default: "bg-white/10 text-white/70 border border-white/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
