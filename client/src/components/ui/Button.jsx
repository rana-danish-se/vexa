import React from "react";
import { cn } from "@/utils/cn";

export const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  ...props 
}) => {
  const variants = {
    // Solid Glow — teal-wash gradient, deep dark text, felt glow
    primary:
      "text-on-primary-container font-semibold " +
      "bg-gradient-to-br from-primary to-primary-container " +
      "shadow-[0_0_20px_rgba(104,219,174,0.14)] " +
      "hover:shadow-[0_0_30px_rgba(104,219,174,0.26)] " +
      "hover:brightness-105 active:scale-[0.97]",

    // Ghost — 1px primary border, 8px radius (spec)
    secondary:
      "bg-transparent border border-primary/40 text-primary " +
      "hover:bg-primary/8 hover:border-primary " +
      "rounded-[8px] active:scale-[0.97]",

    // Surface lift — no border, tonal background
    outline:
      "bg-surface-container-high text-text-primary " +
      "hover:bg-surface-container-highest active:scale-[0.97]",

    // Tertiary — text only, low emphasis
    ghost:
      "bg-transparent text-text-secondary hover:text-primary " +
      "active:scale-[0.97]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "rounded-xl font-manrope font-semibold",
        "transition-all duration-200",
        "disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
