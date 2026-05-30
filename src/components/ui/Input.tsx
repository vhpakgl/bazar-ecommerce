import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn("rounded-md border border-neutral-300 px-3 py-2 text-sm", className)}
      {...props}
    />
  );
}
