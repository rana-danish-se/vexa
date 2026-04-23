"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { motion } from "framer-motion";

const problems = [
  "High volume of repetitive support tickets",
  "Users struggling with complex documentation",
  "Outdated search results in technical docs",
  "Human errors in manual support responses",
];

const solutions = [
  "AI-powered instant resolutions 24/7",
  "Semantic search that understands context",
  "Automatic knowledge base synchronization",
  "Highly accurate, verified AI responses",
];

export const ProblemSolution = () => {
  return (
    // Tonal section — surface-lowest creates "deep immersion" contrast (no-line rule)
    <Section className="bg-surface-lowest relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left Column — Problems */}
        <div>
          <p className="text-red-400/70 font-manrope font-semibold tracking-[0.05em] uppercase text-xs mb-6">
            The Problem
          </p>
          <h2 className="text-4xl mb-12 text-text-primary">
            Static docs don't{" "}
            <span className="text-text-tertiary">talk back.</span>
          </h2>
          <div className="space-y-4">
            {problems.map((problem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                // Tonal lift — surface-container on surface-lowest bg
                className="flex items-start gap-4 p-5 rounded-xl bg-surface-container"
              >
                <RiCloseCircleFill className="w-5 h-5 text-red-400/40 mt-0.5 shrink-0" />
                <p className="text-text-secondary leading-relaxed text-sm">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column — Solutions */}
        <div>
          <p className="text-primary font-manrope font-semibold tracking-[0.05em] uppercase text-xs mb-6">
            The Solution
          </p>
          <h2 className="text-4xl mb-12 text-text-primary">
            Vexa turns docs{" "}
            <span className="text-primary">into answers.</span>
          </h2>
          <div className="space-y-4">
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-xl bg-surface-container"
              >
                <RiCheckboxCircleFill className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-text-primary leading-relaxed text-sm">{solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
