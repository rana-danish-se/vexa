"use client";

import React from "react";
import Link from "next/link";
import { RiMailLine, RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-2">
        <h1 className="text-2xl sm:text-3xl font-plus-jakarta font-bold text-text-primary">
          Reset password
        </h1>
        <p className="text-sm text-text-secondary font-manrope max-w-[280px] mx-auto leading-[1.7]">
          Enter your email and we'll send you a link to get back into your account.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Email Address"
          placeholder="name@company.com"
          type="email"
          icon={RiMailLine}
          autoComplete="email"
        />

        <Button className="w-full h-12 gap-2 text-sm sm:text-base">
          Send reset link <RiArrowRightLine size={17} />
        </Button>
      </form>

      <div className="pt-4 text-center" style={{ borderTop: "1px solid rgba(61,73,67,0.20)" }}>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-text-secondary hover:text-primary transition-colors font-manrope"
        >
          <RiArrowLeftLine size={15} />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
