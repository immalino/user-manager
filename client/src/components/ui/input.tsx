import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-blue-200 selection:text-primary-background dark:bg-input/30 border-input text-sm flex h-9 w-full min-w-0  bg-transparent shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none pl-10 pr-3 py-3 border rounded-lg leading-5 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring  focus-visible:ring-blue-500 focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
