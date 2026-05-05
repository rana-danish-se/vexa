"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiMailLine, RiLockLine } from "react-icons/ri";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      router.push("/dashboard");
    } catch (err) {
      // Error caught by Zustand store
    }
  };

  const handleGoogle = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-2">
        <h1 className="text-2xl sm:text-3xl font-plus-jakarta font-bold text-text-primary">
          Welcome back
        </h1>
        <p className="text-sm text-text-secondary font-manrope leading-[1.7]">
          Enter your details to sign in
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@company.com"
          type="email"
          icon={RiMailLine}
          autoComplete="email"
          required
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-manrope font-semibold text-on-secondary-container uppercase tracking-[0.05em]">
              Password
            </label>
            <Link
              href="/auth/reset-password"
              className="text-[10px] sm:text-xs text-primary hover:underline font-manrope font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            type="password"
            icon={RiLockLine}
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-manrope text-center bg-red-500/10 py-2 rounded-lg">
            {error}
          </p>
        )}

        <Button type="submit" disabled={isLoading} className="w-full h-12 gap-2 text-sm sm:text-base mt-1">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center gap-4">
        <div className="flex-1 h-px bg-outline-variant/20" />
        <span className="text-[10px] text-text-tertiary font-manrope uppercase tracking-[0.08em]">
          or continue with
        </span>
        <div className="flex-1 h-px bg-outline-variant/20" />
      </div>

      <Button type="button" onClick={handleGoogle} variant="secondary" className="w-full h-11 gap-2.5 text-sm">
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
        </svg>
        Sign in with Google
      </Button>

      <div className="pt-4 text-center" style={{ borderTop: "1px solid rgba(61,73,67,0.20)" }}>
        <p className="text-xs sm:text-sm text-text-secondary font-manrope">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
