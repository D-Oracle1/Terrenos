import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "terrenos" | "bloom" | "agro";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "terrenos", type, ...props }, ref) => {
    const variantClass = {
      terrenos: "border-[#d4af37]/20 focus:border-[#d4af37]/60 focus:ring-[#d4af37]/20",
      bloom: "border-[#2563eb]/20 focus:border-[#2563eb]/60 focus:ring-[#2563eb]/20",
      agro: "border-[#2d7a2d]/20 focus:border-[#2d7a2d]/60 focus:ring-[#2d7a2d]/20",
    }[variant];

    return (
      <input
        type={type}
        className={cn(
          "flex h-13 w-full rounded-xl border bg-white/05 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          variantClass,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
