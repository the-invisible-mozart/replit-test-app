"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "~/utils/cn";

const colorVariants = {
  default: "bg-primary",
  green: "#2A9D90",
  yellow: "#E8C468",
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
    colorVariant?: "default" | "green" | "yellow";
  }
>(({ className, value = 0, colorVariant = "default", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 transition-all")}
      style={{
        transform: `translateX(-${100 - value}%)`,
        backgroundColor: colorVariants[colorVariant],
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;
export { Progress };
