"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function PaginationBar({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationBarProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-center gap-4 rounded-b-xl bg-muted/50 px-5 py-4">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
