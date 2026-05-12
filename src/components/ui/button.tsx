import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none",
  {
    variants: {
      variant: {
        terrenos:
          "bg-gradient-to-r from-[#d4af37] to-[#f0d060] text-[#0a0a0a] shadow-lg glow-gold hover:shadow-xl",
        bloom:
          "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-lg glow-bloom hover:shadow-xl",
        agro:
          "bg-gradient-to-r from-[#2d7a2d] to-[#4ade80] text-white shadow-lg glow-agro hover:shadow-xl",
        ghost: "bg-transparent text-white hover:bg-white/10",
        outline: "border border-white/20 bg-transparent text-white hover:bg-white/10",
        danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "terrenos",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
