"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { RiDoubleQuotesL } from "react-icons/ri";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Vexa has reduced our support tickets by 42% in the first month. It felt like double our engineering capacity overnight.",
    author: "Marvin J. Lee",
    role: "Head of Support at Stably",
    avatar: "https://i.pravatar.cc/150?u=marvin",
  },
  {
    quote:
      "Set up was literally 5 minutes. No other AI solution has been this fast to implement and accurate with our specific context.",
    author: "Elena Jenkins",
    role: "Developer Advocate at CloudSync",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
  {
    quote:
      "Being able to just point it at our docs and get back a fully functional AI assistant is pure magic. Saved us months of development.",
    author: "Derek S. Meyer",
    role: "CTO at Nexus Platforms",
    avatar: "https://i.pravatar.cc/150?u=derek",
  },
];

export const Testimonials = () => {
  return (
    <Section className="bg-surface-lowest">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            // Tonal card — surface-container on surface-lowest
            className="p-8 rounded-xl bg-surface-container relative group hover:bg-surface-container-high transition-colors duration-300"
          >
            <RiDoubleQuotesL className="w-8 h-8 text-primary opacity-15 absolute top-7 right-7 glow-subtle" />
            <p className="text-base text-text-primary leading-[1.7] mb-8 relative z-10 font-manrope">
              "{test.quote}"
            </p>
            <div className="flex items-center gap-4">
              <img
                src={test.avatar}
                alt={test.author}
                className="w-11 h-11 rounded-full ring-2 ring-primary/20"
              />
              <div>
                <h4 className="font-plus-jakarta font-bold text-text-primary text-sm">
                  {test.author}
                </h4>
                <p className="text-[10px] text-text-tertiary font-manrope uppercase tracking-[0.05em]">
                  {test.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
