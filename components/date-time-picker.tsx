"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "MM/dd/yyyy, hh:mm a") : placeholder}
          <CalendarIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (date) {
              const newDate = new Date(date);
              if (value) {
                newDate.setHours(value.getHours());
                newDate.setMinutes(value.getMinutes());
              }
              onChange(newDate);
            }
          }}
        />
        <div className="flex items-center gap-2 border-t p-3">
          <input
            type="time"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            value={value ? format(value, "HH:mm") : ""}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":").map(Number);
              const newDate = value ? new Date(value) : new Date();
              newDate.setHours(hours || 0);
              newDate.setMinutes(minutes || 0);
              onChange(newDate);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
