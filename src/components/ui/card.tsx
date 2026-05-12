import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "terrenos" | "bloom" | "agro" | "default" }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClass = {
    terrenos: "glass-gold border-[#d4af37]/20",
    bloom: "glass-bloom border-[#2563eb]/20",
    agro: "glass-agro border-[#2d7a2d]/20",
    default: "glass border-white/08",
  }[variant];

  return (
    <div
      ref={ref}
      className={cn("rounded-2xl p-4", variantClass, className)}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-3", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-sm font-medium text-white/60 uppercase tracking-wider", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
