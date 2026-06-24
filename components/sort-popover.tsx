"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type SortField = "name" | "createdAt" | "startsAt" | "endsAt";
export type SortDirection = "asc" | "desc";

interface SortOption {
  field: SortField;
  direction: SortDirection;
}

interface SortPopoverProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

const fields: { value: SortField; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Created At" },
  { value: "startsAt", label: "Starts At" },
  { value: "endsAt", label: "Ends At" },
];

export function SortPopover({ value, onChange }: SortPopoverProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="size-10 rounded-xl">
          <ArrowUpDown className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end">
        <div className="space-y-5">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-foreground">
              Sort by
            </legend>
            <div className="flex flex-col gap-1.5">
              {fields.map((f) => (
                <label
                  key={f.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    value.field === f.value
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="sort-field"
                    className="size-4 accent-foreground"
                    checked={value.field === f.value}
                    onChange={() => onChange({ ...value, field: f.value })}
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-foreground">
              Direction
            </legend>
            <div className="flex flex-col gap-1.5">
              <Button
                variant={value.direction === "asc" ? "default" : "outline"}
                size="default"
                className="w-full justify-start"
                onClick={() => onChange({ ...value, direction: "asc" })}
              >
                ↑ Ascending
              </Button>
              <Button
                variant={value.direction === "desc" ? "default" : "outline"}
                size="default"
                className="w-full justify-start"
                onClick={() => onChange({ ...value, direction: "desc" })}
              >
                ↓ Descending
              </Button>
            </div>
          </fieldset>
        </div>
      </PopoverContent>
    </Popover>
  );
}
