"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-surface flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-inter">
      {/* Background Dot Grid — Atmospheric texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient blobs — felt, not seen */}
      <div className="absolute top-[-15%] right-[-5%] w-[45%] h-[45%] bg-primary/5 blur-[160px] rounded-full z-0" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[40%] h-[40%] bg-primary-container/4 blur-[120px] rounded-full z-0" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo — text removed, image only */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center group">
            <div className="relative w-11 h-11 transition-transform group-hover:scale-105 glow-subtle">
              <Image
                src="/assets/logo.png"
                alt="Vexa Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Form card — surface-container, tonal lift, no hard border */}
        <div className="bg-surface-container rounded-2xl p-8 md:p-10 shadow-ambient">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
