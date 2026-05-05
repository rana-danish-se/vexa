import rateLimit from 'express-rate-limit';

export const otpRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many OTP requests, please try again later' },
});

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later' },
});

export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 10000 : 100, // relaxed for dev testing
  message: { success: false, message: 'Too many requests, please try again later' },
});

/*
 * ROLE: Provides protective security barriers mitigating rapid endpoint abuse across the server architecture.
 * FUNCTIONS: None natively crafted (exports customized rateLimit middleware instances).
 * ACTIONS: Maps variable time-windows tracking total IP frequency allocations, preventing bruteforce or abusive queries specifically around logins, OTP generation, or excessive overall traffic.
 * USED BY: auth.routes.js, app.js.
 */
