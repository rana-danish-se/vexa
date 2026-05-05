"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RiArrowRightLine, RiShieldCheckLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const { verify, resendOtp, isLoading, error } = useAuthStore();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      router.push("/auth/register");
    }
  }, [email, router]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    
    try {
      await verify(email, code);
      router.push("/dashboard");
    } catch (err) {
      // Handled by global store error
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;
    try {
      await resendOtp({ email });
      setCooldown(60);
    } catch (err) {
      // Handled silently or UI could show error via toaster
    }
  };

  if (!email) return null;

  return (
    <div className="space-y-8">
      {/* Shield icon */}
      <div className="flex justify-center -mb-2">
        <div className="w-16 h-16 bg-primary/8 rounded-2xl flex items-center justify-center text-primary glow-subtle">
          <RiShieldCheckLine size={30} />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-plus-jakarta font-bold text-text-primary">
          Check your email
        </h1>
        <p className="text-sm text-text-secondary font-manrope max-w-[280px] mx-auto leading-[1.7]">
          We sent a 6-digit code to <span className="font-semibold text-text-primary">{email}</span>. Enter it below to verify your identity.
        </p>
      </div>

      {/* OTP inputs */}
      <div className="flex justify-between gap-2 sm:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-full h-12 sm:h-14 bg-surface-container-highest rounded-xl text-center text-xl font-bold text-text-primary font-mono outline-none border-b-2 border-transparent focus:border-b-primary focus:shadow-[0_0_0_4px_rgba(104,219,174,0.08)] transition-all select-none"
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-manrope text-center bg-red-500/10 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <Button onClick={handleSubmit} disabled={isLoading || otp.join("").length !== 6} className="w-full h-12 gap-2 text-sm sm:text-base">
          {isLoading ? "Verifying..." : "Verify code"} {!isLoading && <RiArrowRightLine size={17} />}
        </Button>

        <p className="text-center text-xs sm:text-sm text-text-secondary font-manrope">
          Didn't receive the code?{" "}
          <button 
            type="button" 
            onClick={handleResend} 
            disabled={cooldown > 0} 
            className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:no-underline"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="h-40 flex items-center justify-center text-text-secondary">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
