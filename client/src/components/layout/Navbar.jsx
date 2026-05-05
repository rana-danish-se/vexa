"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { RiMenuLine, RiCloseLine, RiUserLine, RiDashboardLine, RiLogoutCircleLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "#blog" },
  { name: "Changelog", href: "#changelog" },
];

export const Navbar = () => {
  const router = require("next/navigation").useRouter();
  const { isAuthenticated, logout } = require("@/store/useAuthStore").useAuthStore();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setAuthDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/auth/login");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center w-full px-4 sm:px-6 py-2",
        scrolled ? "pt-4" : "pt-6"
      )}
    >
      <nav 
        className={cn(
          "w-full max-w-4xl mx-auto flex items-center justify-between transition-all duration-500 ease-out overflow-visible",
          scrolled 
            ? "bg-surface-container/60 backdrop-blur-xl border border-outline-variant/30 shadow-2xl rounded-full px-4 py-2" 
            : "bg-transparent rounded-2xl px-2 py-1.5"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group z-10">
          <div className="relative w-13 h-13 transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src="/assets/logo.png"
              alt="Vexa Logo"
              fill
              sizes="32px"
              className="object-contain relative z-10 drop-shadow-sm"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-5 py-2 text-[15px] font-manrope font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="navHover"
                  className="absolute inset-0 bg-surface-highest/50 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Toggle / Button */}
        <div className="hidden md:flex items-center relative z-10">
          {isAuthenticated ? (
            <div className="relative" onMouseLeave={() => setAuthDropdownOpen(false)}>
              <button 
                onMouseEnter={() => setAuthDropdownOpen(true)}
                className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-surface-highest border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-highest/80 transition-all duration-300 group"
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-text-primary leading-none">Dashboard</span>
                  <span className="text-[10px] text-primary/80 font-medium">Active Session</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <RiUserLine size={16} />
                </div>
              </button>

              {/* Auth Dropdown */}
              <AnimatePresence>
                {authDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-surface-container border border-outline-variant/30 shadow-xl overflow-hidden py-2"
                  >
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-primary hover:bg-surface-highest transition-colors">
                      <RiDashboardLine size={18} className="text-primary" /> Go to Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-surface-highest transition-colors">
                      <RiLogoutCircleLine size={18} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center bg-surface-highest rounded-full p-1 border border-outline-variant/30 shadow-sm relative overflow-hidden group">
              <Link href="/auth/login">
                <button className="relative z-10 px-5 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors duration-300 rounded-full group-hover:text-text-primary">
                  Log in
                </button>
              </Link>
              <div className="w-[1px] h-4 bg-outline-variant/50 mx-1"></div>
              <Link href="/auth/register">
                <button className="relative z-10 px-5 py-2 text-sm font-semibold text-white bg-[#2ba37e] hover:bg-[#238a6a] rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]">
                  Start for free
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden relative z-10 p-2 rounded-full text-text-primary hover:bg-surface-highest transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <RiCloseLine size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <RiMenuLine size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-[calc(100%+16px)] left-4 right-4 bg-surface-container/95 backdrop-blur-3xl border border-outline-variant/30 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                key={link.name}
                href={link.href}
                className="text-lg font-manrope font-semibold text-text-primary hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-surface-highest"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-3 pt-6 mt-4 border-t border-outline-variant/30"
            >
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full py-6 text-base font-semibold rounded-xl bg-surface-highest" onClick={() => setMobileMenuOpen(false)}>
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full py-6 text-base font-semibold rounded-xl hover:bg-red-500/10 hover:text-red-400" onClick={handleLogout}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/register" className="w-full">
                    <Button className="w-full py-6 text-base font-semibold bg-[#2ba37e] hover:bg-[#238a6a] rounded-xl text-white" onClick={() => setMobileMenuOpen(false)}>
                      Start for free
                    </Button>
                  </Link>
                  <Link href="/auth/login" className="w-full">
                    <Button variant="ghost" className="w-full py-6 text-base font-semibold rounded-xl bg-surface-highest/50" onClick={() => setMobileMenuOpen(false)}>
                      Log in to account
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
