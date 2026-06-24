"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

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
        <Button variant="ghost" size="icon" className="size-8">
          <ArrowUpDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-muted-foreground">
              Sort by
            </Label>
            <div className="mt-2 flex flex-col gap-1">
              {fields.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  className={`flex items-center rounded-md px-2 py-1.5 text-sm transition-colors ${
                    value.field === f.value
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => onChange({ ...value, field: f.value })}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground">
              Direction
            </Label>
            <div className="mt-2 flex gap-2">
              <Button
                variant={value.direction === "asc" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => onChange({ ...value, direction: "asc" })}
              >
                ↑ Ascending
              </Button>
              <Button
                variant={value.direction === "desc" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => onChange({ ...value, direction: "desc" })}
              >
                ↓ Descending
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
