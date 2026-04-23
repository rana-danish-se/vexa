"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";

export const Hero = () => {
  return (
    <Section className="relative pt-40 pb-20 overflow-hidden">
      {/* Atmospheric background — "Embrace the Void" */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[900px] -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/4 blur-[180px] rounded-full" />
        <div className="absolute top-[-100px] right-[-20%] w-[400px] h-[400px] bg-primary-container/5 blur-[120px] rounded-full" />
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-8">
            <HiSparkles className="w-3.5 h-3.5 mr-1" />
            AI-powered Chatbot for your docs
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl mb-8 text-text-primary"
        >
          Your docs. <span className="text-primary">Instant</span><br />
          answers. Zero support tickets.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary mb-12 leading-[1.7]"
        >
          Inject a brain into your documentation. Set up a chatbot in minutes that
          knows your product inside-out and solves customer problems instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-24"
        >
          <Button size="lg" className="flex items-center gap-2">
            Get started free <HiArrowRight className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="secondary">
            Book a Demo
          </Button>
        </motion.div>

        {/* Dashboard Preview — surface-container card, no border */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-2xl bg-surface-container p-4 shadow-ambient group"
        >
          {/* Mock Browser Header */}
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-red-500/25" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/25" />
            <div className="w-3 h-3 rounded-full bg-green-500/25" />
          </div>

          <div className="aspect-[16/9] rounded-xl bg-surface-lowest flex items-center justify-center relative overflow-hidden">
            {/* Mock UI Content */}
            <div className="w-full h-full p-8 flex flex-col gap-5 text-left">
              <div className="w-2/3 h-3 bg-primary/6 rounded-full" />
              <div className="w-full h-3 bg-primary/4 rounded-full" />
              <div className="w-1/2 h-3 bg-primary/4 rounded-full" />

              <div className="mt-auto ml-auto p-5 rounded-xl bg-surface-container-high max-w-sm">
                <p className="text-[10px] text-primary font-manrope font-semibold uppercase tracking-[0.05em] mb-2">
                  Vexa Assistant
                </p>
                <p className="text-sm text-text-primary">"How do I install the SDK?"</p>
                <div className="mt-4 p-3 rounded-lg bg-surface-container-highest text-xs text-text-secondary leading-relaxed">
                  To install the Vexa SDK, run:{" "}
                  <code className="text-primary font-mono">npm install @vexa/client</code>
                </div>
              </div>
            </div>

            {/* Felt-not-seen teal wash overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/4 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
