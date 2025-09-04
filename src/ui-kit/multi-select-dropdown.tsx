import { ChevronDownIcon } from "lucide-react";

import { Checkbox } from "~/ui-kit/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui-kit/popover";
import { cn } from "~/utils/cn";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectDropdownProps) {
  const handleChange = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const displayValue = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label)
    .join(", ");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "block w-full overflow-hidden",
            "border-input bg-background text-foreground focus-visible:ring-ring",
            "flex h-9 items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-xs transition-colors outline-none focus-visible:ring-1",
            className,
          )}
        >
          <div className="flex w-full max-w-[calc(100vw-100px)] min-w-0 min-w-[var(--radix-popover-trigger-width)] flex-1 items-center overflow-hidden p-2">
            <span
              className={cn(
                "block truncate overflow-hidden text-left whitespace-nowrap",
                !displayValue && "text-muted-foreground",
              )}
              title={displayValue}
            >
              {displayValue || placeholder}
            </span>
          </div>
          <ChevronDownIcon className="text-muted-foreground ml-2 size-4 shrink-0" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-full max-w-[100px] min-w-[var(--radix-popover-trigger-width)] p-2"
      >
        <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleChange(option.value)}
              />
              <span className="truncate">{option.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
