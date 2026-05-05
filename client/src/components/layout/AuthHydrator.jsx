"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthHydrator() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return null;
}
