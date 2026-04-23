"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RiCheckLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

const tiers = [
  {
    name: "Starter",
    price: { monthly: "$0", yearly: "$0" },
    description: "Perfect for exploring the power of AI-first documentation.",
    features: [
      "1,000 requests / mo",
      "1 Knowledge Source",
      "Vexa Branding",
      "Community Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: { monthly: "$12", yearly: "$10" },
    description: "Scale your support with advanced features and customization.",
    features: [
      "10,000 requests / mo",
      "Unlimited Sources",
      "Custom Branding",
      "Priority Email Support",
      "Advanced Analytics",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "Built for companies needing extreme scale and security.",
    features: [
      "Unlimited requests",
      "SSO & Custom Security",
      "Dedicated account manager",
      "Custom SLI / SLAs",
      "On-prem deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    // Tonal background shift — surface-lowest for depth contrast (no-line rule)
    <Section id="pricing" className="bg-surface-lowest">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-6">Simple, scalable pricing</h2>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span
            className={cn(
              "text-sm font-manrope transition-colors",
              billingCycle === "monthly" ? "text-text-primary" : "text-text-tertiary"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
            }
            className="w-12 h-6 rounded-full bg-surface-container-high p-0.5 relative transition-colors hover:bg-surface-container-highest"
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full teal-wash transition-all duration-300",
                billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-manrope transition-colors",
              billingCycle === "yearly" ? "text-text-primary" : "text-text-tertiary"
            )}
          >
            Yearly
          </span>
          <Badge>SAVE 20%</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "relative rounded-2xl p-8 flex flex-col transition-all duration-300",
              // Popular card: raised surface + ambient teal shadow
              tier.popular
                ? "bg-surface-container-high scale-105 shadow-[0_0_40px_rgba(104,219,174,0.08)] z-10"
                : "bg-surface-container"
            )}
          >
            {tier.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge>Most Popular</Badge>
              </div>
            )}

            <div className="mb-8">
              <h4 className="text-2xl font-plus-jakarta font-bold mb-3">{tier.name}</h4>
              <div className="flex items-baseline gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billingCycle}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-4xl font-plus-jakarta font-bold text-text-primary"
                  >
                    {tier.price[billingCycle]}
                  </motion.span>
                </AnimatePresence>
                {tier.price[billingCycle].startsWith("$") && (
                  <span className="text-text-tertiary text-sm font-manrope">/ mo</span>
                )}
              </div>
              <p className="text-sm text-text-secondary mt-4 leading-relaxed font-manrope">
                {tier.description}
              </p>
            </div>

            <ul className="space-y-3 mb-10 flex-1">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  {/* Spec: surface-container-highest inner chip for check */}
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <RiCheckLine className="w-3 h-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={tier.popular ? "primary" : "secondary"}
              className="w-full"
            >
              {tier.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
