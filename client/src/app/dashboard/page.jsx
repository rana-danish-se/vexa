"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { RiUserLine, RiMailLine, RiStarLine, RiMacbookLine, RiLogoutBoxRLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const router = useRouter();
  const { business, isAuthenticated, isLoading, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  // NextJS middleware handles absolute routing, but this ensures no flash of empty states during fetch
  if (isLoading || !business) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent flex items-center justify-center rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Welcome Header */}
        <div className="p-8 rounded-3xl glass glow-subtle relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-plus-jakarta font-bold text-text-primary tracking-tight">
                Welcome back, {business.name || 'Founder'}!
              </h1>
              <p className="text-text-secondary font-manrope mt-2 text-sm sm:text-base">
                Your secure session is active and verified by our dual-token system.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-surface-container-highest py-2 px-4 h-10 rounded-xl border border-outline-variant/30 text-sm font-jetbrains-mono shadow-sm">
                <RiStarLine className="text-primary" size={18} />
                <span className="font-semibold tracking-wider text-text-primary">
                  {business.plan ? business.plan.toUpperCase() : 'FREE'}
                </span>
              </div>
              <Button onClick={handleLogout} variant="secondary" className="h-10 gap-2 px-4 shadow-sm">
                <RiLogoutBoxRLine size={18} />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(104,219,174,0.08)]">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <RiUserLine size={24} />
            </div>
            <h3 className="text-[11px] tracking-[0.1em] uppercase font-manrope text-text-tertiary font-bold mb-1.5">
              Account Identifier
            </h3>
            <p className="font-jetbrains-mono text-sm text-text-primary truncate" title={business.id}>
              {business.id || 'N/A'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-[#60A5FA]/40 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(96,165,250,0.08)]">
            <div className="w-12 h-12 rounded-xl bg-[#60A5FA]/10 text-[#60A5FA] flex items-center justify-center mb-5">
              <RiMailLine size={24} />
            </div>
            <h3 className="text-[11px] tracking-[0.1em] uppercase font-manrope text-text-tertiary font-bold mb-1.5">
              Primary Email
            </h3>
            <p className="font-manrope text-base text-text-primary font-medium truncate" title={business.email}>
              {business.email || 'N/A'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-[#A78BFA]/40 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(167,139,250,0.08)] md:col-span-1 sm:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 text-[#A78BFA] flex items-center justify-center mb-5">
              <RiMacbookLine size={24} />
            </div>
            <h3 className="text-[11px] tracking-[0.1em] uppercase font-manrope text-text-tertiary font-bold mb-1.5">
              System State
            </h3>
            <p className="font-manrope text-sm text-text-secondary leading-[1.6]">
              All routes explicitly synchronized extracting identity accurately from HTTP-Only cookie layers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
