"use client";

import React from "react";
import { cn } from "@/utils/cn";

export const Input = React.forwardRef(({ label, error, icon: Icon, className, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-[11px] font-manrope font-semibold text-on-secondary-container uppercase tracking-[0.05em]">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors duration-200">
            <Icon size={16} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            // Surface-container-highest fill, no border (spec: "no border default state")
            "w-full bg-surface-container-highest rounded-xl px-4 py-3",
            "text-sm text-text-primary placeholder:text-text-tertiary",
            "outline-none transition-all duration-200",
            // Focus: 1px primary bottom-border + subtle glow
            "border-b-2 border-transparent",
            "focus:border-b-2 focus:border-primary",
            "focus:shadow-[0_0_0_4px_rgba(104,219,174,0.08)]",
            Icon && "pl-10",
            error
              ? "border-b-red-500/60 focus:border-b-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
              : "",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] sm:text-xs text-red-400 font-manrope font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
