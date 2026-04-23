"use client";

import React, { useState, useRef } from "react";
import { RiArrowRightLine, RiShieldCheckLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

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
          We sent a 6-digit code to your email. Enter it below to verify your identity.
        </p>
      </div>

      {/* OTP inputs — surface-container-highest, no border default */}
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

      <div className="space-y-4">
        <Button className="w-full h-12 gap-2 text-sm sm:text-base">
          Verify code <RiArrowRightLine size={17} />
        </Button>

        <p className="text-center text-xs sm:text-sm text-text-secondary font-manrope">
          Didn't receive the code?{" "}
          <button className="text-primary font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
