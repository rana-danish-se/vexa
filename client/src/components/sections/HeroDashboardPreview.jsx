"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

export const HeroDashboardPreview = () => {
  return (
    <div className="relative w-full max-w-[1000px] mx-auto mt-10 mb-5">
      {/* Background glow behind the dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-[#2ba37e]/30 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full rounded-[20px] bg-[#11141a] border border-outline-variant/20 shadow-[0_0_80px_rgba(43,163,126,0.15)] overflow-hidden group z-10"
      >
        {/* Mock Browser Header */}
        <div className="flex items-center px-4 py-3 bg-[#161a22] border-b border-white/5">
          <div className="flex items-center gap-2 mr-6">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3a4150]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3a4150]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3a4150]" />
          </div>
          <div className="flex-1 max-w-sm mx-auto h-6 rounded bg-[#1e232e] border border-white/5 flex items-center px-3">
            <span className="text-[11px] font-medium text-[#7a869e]">app.vexa.ai/dashboard</span>
          </div>
          <div className="w-10"></div>{/* spacer */}
        </div>

        <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
          {/* Left Panel */}
          <div className="w-full md:w-[45%] h-full p-6 md:p-8 bg-[#11141a] border-r border-white/5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-8">
              <HiSparkles className="w-5 h-5 text-primary" />
              <span className="text-white font-semibold text-lg tracking-tight">Resolution Rate</span>
            </div>

            {/* KPI Card */}
            <div className="w-full bg-[#161a22] border border-white/5 rounded-xl p-5 mb-8 shadow-sm">
              <p className="text-[#8e98ac] text-sm font-medium mb-1.5">Deflected Tickets</p>
              <div className="flex items-end gap-3">
                <span className="text-white text-4xl font-bold font-manrope">8,421</span>
                <span className="text-primary text-sm font-semibold mb-1 flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  12%
                </span>
              </div>
            </div>

            {/* Mock Charts */}
            <div className="w-full flex-1 flex gap-4 opacity-50">
              {/* Left Chart */}
              <div className="flex-1 bg-[#1e232e]/30 rounded-lg flex items-end gap-[3px] p-4 relative overflow-hidden">
                {[30, 40, 20, 50, 45, 60, 25, 35, 75, 40, 55, 35, 65, 45, 20, 30].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#2ba37e] rounded-sm" style={{ height: `${h}%`, opacity: 0.2 + (h/100) }} />
                ))}
                <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-primary/10 blur-xl"></div>
              </div>
              {/* Right Chart */}
              <div className="flex-1 bg-[#1e232e]/30 rounded-lg flex items-end gap-[3px] p-4 relative overflow-hidden">
                {[50, 45, 60, 25, 35, 75, 40, 55, 35, 65, 45, 20, 30, 40, 20, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#4a90e2] rounded-sm" style={{ height: `${h}%`, opacity: 0.2 + (h/100) }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel / App Mockup with overlay */}
          <div className="flex-1 bg-[#161a22] relative overflow-hidden min-h-[400px]">
            {/* Background UI element simulating an app layout behind */}
            <div className="absolute inset-0 opacity-20 p-8 md:p-12 pointer-events-none filter blur-sm transition-opacity duration-1000 group-hover:opacity-30">
              <div className="w-full max-w-sm mx-auto h-[400px] border border-white/20 rounded-2xl bg-[#1e232e] p-6 shadow-2xl">
                <div className="w-1/3 h-5 bg-white/20 rounded mb-8"></div>
                <div className="w-full h-10 bg-white/10 rounded mb-4"></div>
                <div className="w-full h-10 bg-white/10 rounded mb-4"></div>
                <div className="w-2/3 h-10 bg-white/10 rounded"></div>
              </div>
            </div>

            {/* Vexa Assistant Widget */}
            <div className="absolute right-4 md:right-8 top-8 md:top-12 w-[280px] md:w-[320px] bg-[#1a1e24] border border-[#272b35] rounded-xl shadow-2xl overflow-hidden drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] flex flex-col z-10 font-inter transform transition-transform duration-500 hover:-translate-y-1">
              {/* Widget Header */}
              <div className="bg-[#2ba37e] px-4 py-3 flex items-center justify-between">
                <span className="text-white font-medium text-[15px]">Vexa Assistant</span>
                <button className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Chat Body */}
              <div className="p-4 flex flex-col gap-4 bg-[#14171d]">
                {/* User Message */}
                <div className="self-end bg-[#1e232d] border border-white/5 rounded-xl rounded-tr-sm px-4 py-3 max-w-[85%] shadow-sm">
                  <p className="text-[#d1d5db] text-sm text-left">How do I reset my API key?</p>
                </div>
                
                {/* Bot Message */}
                <div className="self-start bg-transparent border border-white/5 rounded-xl rounded-tl-sm px-4 py-3 max-w-[90%] shadow-sm">
                  <p className="text-[#d1d5db] text-sm leading-relaxed text-left">
                    Go to <span className="text-white font-medium">Settings &gt; Developers</span> and click <span className="text-white font-medium">"Regenerate Key"</span>. 
                    Note: this invalidates old keys instantly.
                  </p>
                </div>
              </div>

              {/* Widget Input */}
              <div className="p-3 bg-[#1a1e24] border-t border-[#272b35]">
                <div className="w-full rounded bg-[#1e232d] px-3 py-2 border border-white/5 transition-colors hover:border-white/10">
                  <span className="text-[#64748b] text-[13px]">Type a question...</span>
                </div>
              </div>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#161a22] to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
