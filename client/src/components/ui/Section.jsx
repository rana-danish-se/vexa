import React from "react";
import { cn } from "@/utils/cn";

export const Section = ({ 
  children, 
  className, 
  id, 
  containerClassName,
  as: Tag = "section" 
}) => {
  return (
    <Tag 
      id={id} 
      className={cn("py-20 md:py-32 px-6", className)}
    >
      <div className={cn("max-w-7xl mx-auto", containerClassName)}>
        {children}
      </div>
    </Tag>
  );
};
