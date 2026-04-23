import React from "react";
import { cn } from "@/utils/cn";

// Technical chip style — on-secondary-container text on secondary-container base
// All-caps, Manrope label-sm, 0.05em tracking (spec)
export const Badge = ({ children, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
        "bg-secondary-container text-on-secondary-container",
        "text-[10px] font-manrope font-semibold uppercase tracking-[0.05em]",
        className
      )}
    >
      {children}
    </span>
  );
};
