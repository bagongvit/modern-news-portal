import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
    outline: "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    accent: "bg-amber-500 text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
