"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

export const CTABanner = () => {
  return (
    <Section className="pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        // Teal-wash CTA block — the signature gradient at section level
        className="teal-wash rounded-[2.5rem] p-12 md:p-24 text-center overflow-hidden relative group"
      >
        {/* Ambient blobs — "felt not seen" */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/8 blur-[120px] rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-700" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-on-primary-container/15 blur-[100px] rounded-full -ml-32 -mb-32 transition-transform group-hover:scale-110 duration-700" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-plus-jakarta font-bold text-on-primary-container mb-8 tracking-tight leading-[1.1]">
            Your documentation is already<br />
            <span className="text-surface">the answer.</span> Let it speak.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            {/* White fill button on teal background */}
            <button className="inline-flex items-center gap-2 bg-on-primary-container text-surface px-8 py-4 rounded-xl font-manrope font-semibold text-base hover:bg-on-primary-container/90 transition-all active:scale-[0.97]">
              Get Started for Free
            </button>
            <button className="inline-flex items-center gap-2 text-on-primary-container font-manrope font-semibold hover:translate-x-1 transition-transform text-base">
              Book a live demo <HiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
