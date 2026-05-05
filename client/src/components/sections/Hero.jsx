"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import { HeroDashboardPreview } from "@/components/sections/HeroDashboardPreview";

export const Hero = () => {
  return (
    <Section className="relative pt-30  overflow-hidden">
   
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
  
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[800px] z-5 overflow-visible pointer-events-none">
        {/* Strong central glow */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#2ba37e]/25 blur-[120px] rounded-full" />
        {/* Wider, softer ambient glow */}
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2ba37e]/10 blur-[150px] rounded-[100%]" />
      </div>

      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 border border-primary/20 bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-md">
            <HiSparkles className="w-4 h-4 mr-2" />
            Instant answers from your own docs
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-5 text-text-primary leading-[1.1]"
        >
          Your docs <span className="relative inline-block">
            answer.
            <svg 
              className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-primary" 
              viewBox="0 0 200 12" 
              preserveAspectRatio="none"
            >
              <path 
                d="M5,10 Q100,-2 195,8" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
            </svg>
          </span> Your<br className="hidden md:block" />
          team rests.<br />
          Customers love it.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto text-md md:text-lg text-text-primary/70 mb-6 leading-relaxed font-inter"
        >
          Connect your documentation in seconds. Deploy an AI assistant that actually<br className="hidden md:block" />
          knows your product inside and out, resolving 80% of tier-1 tickets instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-24"
        >
          <Button size="md" className="flex items-center gap-2 bg-[#2ba37e] hover:bg-[#238a6a] text-white  rounded-lg text-lg font-medium">
            Start for free <HiArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button size="md" variant="ghost" className="flex items-center gap-2 border border-outline-variant hover:bg-surface-container hover:text-text-primary text-text-primary  rounded-lg text-lg font-medium transition-colors">
            <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
            </svg>
            Watch demo
          </Button>
        </motion.div>

        <HeroDashboardPreview />
      </div>
    </Section>
  );
};
