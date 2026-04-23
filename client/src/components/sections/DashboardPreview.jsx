"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { RiCloudLine, RiBarChart2Fill, RiPieChartFill, RiGroupFill } from "react-icons/ri";
import { motion } from "framer-motion";

export const DashboardPreview = () => {
  return (
    <Section className="relative overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl mb-6">Real-time Insights</h2>
        <p className="text-text-secondary max-w-2xl mx-auto leading-[1.7]">
          Monitor your AI assistant's performance and see exactly how many tickets
          you're deflecting in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doc Sync Card — surface-container base, no border */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container rounded-xl p-8 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-plus-jakarta font-bold">Doc Sync Status</h4>
            <RiCloudLine className="text-primary w-5 h-5 glow-subtle" />
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-tertiary font-manrope">v1.2.0 API Docs</span>
              <span className="text-[10px] text-primary font-manrope font-semibold uppercase tracking-[0.05em] px-2.5 py-1 bg-primary/8 rounded-md">
                SYNCED
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-full teal-wash"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-tertiary font-manrope">Getting Started Guide</span>
              <span className="text-[10px] text-primary font-manrope font-semibold uppercase tracking-[0.05em] px-2.5 py-1 bg-primary/8 rounded-md">
                SYNCED
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 1.5 }}
                className="h-full bg-primary-container"
              />
            </div>
          </div>
        </motion.div>

        {/* Analytics Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container rounded-xl p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-plus-jakarta font-bold">Resolved vs Handled</h4>
            <RiBarChart2Fill className="text-primary w-5 h-5 glow-subtle" />
          </div>
          <div className="flex items-end gap-2 h-40">
            {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                // Raised inner block — surface-container-high on surface-container (spec)
                className="flex-1 bg-surface-container-high hover:bg-primary/20 transition-colors rounded-t-md cursor-pointer group relative"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-surface-container-highest text-primary text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {height}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stat Cards — md:col-span-2 */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-container rounded-xl p-8 flex items-center gap-6"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0">
              <RiPieChartFill className="w-7 h-7 glow-subtle" />
            </div>
            <div>
              <h4 className="text-3xl font-plus-jakarta font-bold text-text-primary">88.5%</h4>
              <p className="text-xs text-text-tertiary font-manrope uppercase tracking-[0.05em] mt-1">
                Doc Accuracy
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container rounded-xl p-8 flex items-center gap-6"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0">
              <RiGroupFill className="w-7 h-7 glow-subtle" />
            </div>
            <div>
              <h4 className="text-3xl font-plus-jakarta font-bold text-text-primary">12,402</h4>
              <p className="text-xs text-text-tertiary font-manrope uppercase tracking-[0.05em] mt-1">
                Tickets Deflected
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
