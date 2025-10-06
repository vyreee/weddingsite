"use client";

import * as React from "react";
import { motion } from "motion/react";

type Variant = "primary" | "secondary" | "accent" | "ghost";

type MotionButtonProps = React.ComponentProps<typeof motion.button>;

export interface BrandButtonProps extends Omit<MotionButtonProps, "className"> {
  variant?: Variant;
  className?: string;
}

const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-primary text-brand-primary-foreground hover:bg-brand-deep focus:ring-brand-accent",
  secondary: "bg-brand-secondary text-white hover:bg-brand-deep focus:ring-brand-accent",
  accent: "bg-brand-accent text-brand-accent-foreground hover:bg-brand-secondary focus:ring-brand-secondary",
  ghost: "bg-transparent text-brand-primary hover:bg-brand-accent/20 focus:ring-brand-accent border border-brand-secondary/30",
};

export function BrandButton({ variant = "primary", className = "", ...props }: BrandButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(83,58,123,0.25)" }}
      whileTap={{ scale: 0.97 }}
      className={[base, variants[variant], className].join(" ")}
      {...props}
    />
  );
}

export default BrandButton;
