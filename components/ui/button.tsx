import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-black text-white hover:bg-zinc-800",
        variant === "outline" &&
          "border border-zinc-300 bg-white text-black hover:bg-zinc-50",
        variant === "ghost" && "bg-transparent text-black hover:bg-zinc-100",
        variant === "accent" && "bg-[#8B1A1A] text-white hover:bg-[#741616]",
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-11 px-6 text-base",
        className,
      )}
      {...props}
    />
  );
}
