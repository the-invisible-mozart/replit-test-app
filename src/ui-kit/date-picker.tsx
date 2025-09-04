import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import type { DayPickerSingleProps } from "react-day-picker";

import { Button } from "~/ui-kit/button";
import { Calendar } from "~/ui-kit/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui-kit/popover";
import { cn } from "~/utils/cn";

interface IDatePickerProps {
  value?: Date;
  onDateChange: (date?: Date) => void;
  className?: string;
  required?: boolean;
  ariaInvalid?: boolean;
}

/**
 * @description Although this component cannot be directly
 * imported from `shadcn`, it is created via their docs.
 * @see https://ui.shadcn.com/docs/components/date-picker
 */
export function DatePicker({
  value,
  onDateChange,
  className,
  required,
  ariaInvalid,
  ...props
}: IDatePickerProps & Omit<DayPickerSingleProps, "onSelect" | "mode">) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
          aria-invalid={ariaInvalid}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          required={required}
          mode="single"
          selected={value}
          onSelect={onDateChange}
          initialFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
