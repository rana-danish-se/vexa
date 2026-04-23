"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "#blog" },
  { name: "Changelog", href: "#changelog" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        // Glassmorphism: surface @ 80% + 24px blur (spec)
        scrolled
          ? "glass border-b border-outline-variant/20 py-3"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
            <Image
              src="/assets/logo.png"
              alt="Vexa Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-plus-jakarta font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors duration-200">
            Vexa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-manrope font-medium text-text-secondary hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm">Start free</Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </nav>

      {/* Mobile Menu — tonal background, no border */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface-container p-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-manrope font-medium text-text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/auth/login" className="w-full">
              <Button variant="outline" className="w-full">Log in</Button>
            </Link>
            <Link href="/auth/register" className="w-full">
              <Button className="w-full">Start free</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
