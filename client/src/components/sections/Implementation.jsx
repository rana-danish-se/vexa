"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { RiLinkM, RiCpuLine, RiSettings3Line, RiTerminalBoxLine } from "react-icons/ri";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <RiLinkM className="w-6 h-6" />,
    title: "Connect Docs",
    desc: "Import from URL, Markdown, or GitBook in seconds.",
  },
  {
    icon: <RiCpuLine className="w-6 h-6" />,
    title: "Auto-Train",
    desc: "Our engine indexes and learns your product context.",
  },
  {
    icon: <RiSettings3Line className="w-6 h-6" />,
    title: "Customize UI",
    desc: "Style the chatbot to match your brand perfectly.",
  },
  {
    icon: <RiTerminalBoxLine className="w-6 h-6" />,
    title: "One-line Install",
    desc: "Deploy with a simple script tag and start helping users.",
  },
];

export const Implementation = () => {
  return (
    <Section className="relative">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl mb-6">
          Implementation in <span className="text-primary">minutes</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto leading-[1.7]">
          From documentation to AI-indexed knowledge base. No complex setups or weeks of training required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="text-center p-6"
          >
            {/* Icon container — tonal lift, no border */}
            <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mx-auto mb-6 text-primary hover:bg-surface-container-high transition-colors duration-200">
              {step.icon}
            </div>
            <h4 className="text-xl mb-3 font-plus-jakarta font-bold">{step.title}</h4>
            <p className="text-sm text-text-tertiary leading-relaxed font-manrope">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Code Terminal — surface-lowest "deep immersion" (spec) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-surface-lowest rounded-2xl p-8 shadow-ambient font-mono text-sm"
      >
        <div className="flex items-center justify-between mb-8 pb-6" style={{ borderBottom: "1px solid rgba(61,73,67,0.20)" }}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/25" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/25" />
            <div className="w-3 h-3 rounded-full bg-green-500/25" />
          </div>
          <span className="text-text-tertiary text-[10px] uppercase tracking-[0.1em] font-manrope">
            vexa-install.js
          </span>
        </div>

        <div className="text-text-secondary leading-[1.7]">
          <p className="mb-4">
            <span className="text-primary">import</span>{" "}
            <span className="text-text-primary">Vexa</span> from{" "}
            <span className="text-primary-container">'@vexa/client'</span>;
          </p>
          <p className="mb-4 text-text-tertiary">// Initialize your AI assistant</p>
          <p className="mb-4">
            <span className="text-primary">const</span> assistant ={" "}
            <span className="text-primary">new</span>{" "}
            <span className="text-text-primary">Vexa</span>
            {"{"}
          </p>
          <div className="pl-6 mb-4">
            <p>
              apiKey:{" "}
              <span className="text-primary-container">'vx_live_772...001'</span>,
            </p>
            <p>
              theme: <span className="text-primary-container">'midnight-teal'</span>,
            </p>
            <p>
              position: <span className="text-primary-container">'bottom-right'</span>
            </p>
          </div>
          {"}"});
          <p className="mt-4 mb-2 text-text-tertiary">// Ready to serve instant answers</p>
          <p>
            <span className="text-text-primary">assistant</span>.mount();
          </p>
        </div>
      </motion.div>
    </Section>
  );
};
