"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { togglePreorderStatus, deletePreorder } from "@/lib/actions";
import { SortPopover, type SortField, type SortDirection } from "./sort-popover";
import { PaginationBar } from "./pagination-bar";

interface Preorder {
  id: number;
  name: string;
  products: number;
  preorderWhen: string;
  startsAt: Date;
  endsAt: Date | null;
  status: boolean;
  createdAt: Date;
}

interface PreorderTableProps {
  preorders: Preorder[];
  total: number;
  currentPage: number;
  pageSize: number;
  statusFilter: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

export function PreorderTable({
  preorders,
  total,
  currentPage,
  pageSize,
  statusFilter,
  sortField,
  sortDirection,
}: PreorderTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());
  const [pendingDeletes, setPendingDeletes] = React.useState<Set<number>>(new Set());

  const allSelected = preorders.length > 0 && preorders.every((p) => selectedIds.has(p.id));

  function buildHref(params: Record<string, string>) {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => sp.set(k, v));
    return `/?${sp.toString()}`;
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(preorders.map((p) => p.id)));
    }
  }

  function toggleOne(id: number) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  }

  async function handleToggleStatus(id: number) {
    await togglePreorderStatus(id);
  }

  async function handleDelete(id: number) {
    setPendingDeletes((prev) => new Set(prev).add(id));
    await deletePreorder(id);
  }

  function handleSortChange(option: { field: SortField; direction: SortDirection }) {
    router.push(buildHref({ sortField: option.field, sortDirection: option.direction, page: "1" }));
  }

  function handleFilterChange(filter: string) {
    router.push(buildHref({ status: filter, page: "1" }));
  }

  function handlePageChange(page: number) {
    router.push(buildHref({ page: String(page) }));
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-1.5 rounded-xl bg-muted p-1">
          {["all", "active", "inactive"].map((f) => (
            <button
              key={f}
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === f
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <SortPopover
          value={{ field: sortField, direction: sortDirection }}
          onChange={handleSortChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm font-medium text-muted-foreground">
              <th className="px-5 py-4 w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Products</th>
              <th className="px-5 py-4">Preorder when</th>
              <th className="px-5 py-4">Starts at</th>
              <th className="px-5 py-4">Ends at</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {preorders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-16 text-center text-sm text-muted-foreground">
                  No preorders found
                </td>
              </tr>
            ) : (
              preorders.map((preorder) => (
                <tr
                  key={preorder.id}
                  className={`border-b last:border-b-0 transition-colors ${
                    pendingDeletes.has(preorder.id) ? "opacity-40" : "hover:bg-muted/30"
                  }`}
                >
                  <td className="px-5 py-4">
                    <Checkbox
                      checked={selectedIds.has(preorder.id)}
                      onCheckedChange={() => toggleOne(preorder.id)}
                      aria-label={`Select ${preorder.name}`}
                    />
                  </td>
                  <td className="px-5 py-4 text-base font-medium">{preorder.name}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{preorder.products}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground capitalize">
                    {preorder.preorderWhen.replace(/-/g, " ")}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    {format(new Date(preorder.startsAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    {preorder.endsAt
                      ? format(new Date(preorder.endsAt), "MMM d, yyyy")
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <Switch
                      checked={preorder.status}
                      onCheckedChange={() => handleToggleStatus(preorder.id)}
                      aria-label={`Toggle status for ${preorder.name}`}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a href={`/${preorder.id}/edit`}>
                          <Pencil className="size-4" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(preorder.id)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationBar
        currentPage={currentPage}
        totalItems={total}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
