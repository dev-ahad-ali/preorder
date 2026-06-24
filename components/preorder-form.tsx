"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/date-time-picker";
import { createPreorder, updatePreorder } from "@/lib/actions";

interface Preorder {
  id: number;
  name: string;
  products: number;
  preorderWhen: string;
  startsAt: Date;
  endsAt: Date | null;
  status: boolean;
}

export function PreorderForm({ preorder }: { preorder?: Preorder }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [name, setName] = React.useState(preorder?.name ?? "");
  const [products, setProducts] = React.useState(preorder?.products ?? 1);
  const [preorderWhen, setPreorderWhen] = React.useState(
    preorder?.preorderWhen ?? "regardless-of-stock"
  );
  const [startsAt, setStartsAt] = React.useState<Date | undefined>(
    preorder?.startsAt ? new Date(preorder.startsAt) : undefined
  );
  const [endsAt, setEndsAt] = React.useState<Date | undefined>(
    preorder?.endsAt ? new Date(preorder.endsAt) : undefined
  );
  const [status, setStatus] = React.useState(preorder?.status ?? true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !startsAt) return;

    setPending(true);

    const formData = new FormData();
    formData.set("name", name.trim());
    formData.set("products", String(products));
    formData.set("preorderWhen", preorderWhen);
    formData.set("startsAt", startsAt.toISOString());
    formData.set("endsAt", endsAt ? endsAt.toISOString() : "");
    formData.set("status", String(status));

    try {
      if (preorder) {
        await updatePreorder(preorder.id, formData);
      } else {
        await createPreorder(formData);
      }
    } catch {
      setPending(false);
    }
  }

  function handleBack() {
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between border-b bg-background px-6 py-3">
        <Button variant="ghost" type="button" onClick={handleBack}>
          <ArrowLeft className="mr-1 size-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" type="button" onClick={handleBack}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending || !name.trim() || !startsAt}>
            {pending ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Saving...
              </span>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="px-6 py-5">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Preorder details</h2>
              <p className="text-sm text-muted-foreground">
                These values appear in the preorders list.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-[180px_1fr] gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    A label to recognize this preorder by.
                  </p>
                </div>
                <Input
                  placeholder="e.g. Summer Collection"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <Separator />

              <div className="grid grid-cols-[180px_1fr] gap-4">
                <div>
                  <Label className="text-sm font-medium">Products</Label>
                  <p className="text-xs text-muted-foreground">
                    Number of products covered by this preorder.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setProducts(Math.max(1, products - 1))}
                  >
                    −
                  </Button>
                  <span className="flex h-9 w-16 items-center justify-center rounded-md border text-sm">
                    {products}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setProducts(products + 1)}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">product(s)</span>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-[180px_1fr] gap-4">
                <div>
                  <Label className="text-sm font-medium">Preorder when</Label>
                  <p className="text-xs text-muted-foreground">
                    When customers are allowed to preorder.
                  </p>
                </div>
                <Select value={preorderWhen} onValueChange={setPreorderWhen}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regardless-of-stock">
                      Regardless of stock
                    </SelectItem>
                    <SelectItem value="out-of-stock">Out of stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="grid grid-cols-[180px_1fr] gap-4">
                <div>
                  <Label className="text-sm font-medium">Starts at</Label>
                  <p className="text-xs text-muted-foreground">
                    When the preorder window opens.
                  </p>
                </div>
                <DateTimePicker
                  value={startsAt}
                  onChange={setStartsAt}
                  placeholder="MM/DD/YYYY, HH:MM AM/PM"
                />
              </div>

              <Separator />

              <div className="grid grid-cols-[180px_1fr] gap-4">
                <div>
                  <Label className="text-sm font-medium">Ends at</Label>
                  <p className="text-xs text-muted-foreground">
                    Leave empty for no end date.
                  </p>
                </div>
                <DateTimePicker
                  value={endsAt}
                  onChange={setEndsAt}
                  placeholder="MM/DD/YYYY, HH:MM AM/PM"
                />
              </div>

              <Separator />

              <div className="grid grid-cols-[180px_1fr] gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <p className="text-xs text-muted-foreground">
                    Active preorders are visible to customers.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={status}
                    onCheckedChange={setStatus}
                    id="status"
                  />
                  <Label htmlFor="status" className="text-sm font-medium">
                    Active
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t px-6 py-4">
            <Button variant="ghost" type="button" onClick={handleBack}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending || !name.trim() || !startsAt}>
              {pending ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Saving...
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
