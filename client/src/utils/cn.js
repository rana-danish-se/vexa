import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple Tailwind CSS classes using clsx and tailwind-merge.
 * This ensures that conflicting Tailwind classes are resolved correctly.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
