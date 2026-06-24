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
        preorder?.preorderWhen ?? "regardless-of-stock",
    );
    const [startsAt, setStartsAt] = React.useState<Date | undefined>(
        preorder?.startsAt ? new Date(preorder.startsAt) : undefined,
    );
    const [endsAt, setEndsAt] = React.useState<Date | undefined>(
        preorder?.endsAt ? new Date(preorder.endsAt) : undefined,
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
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-6 py-10">
            <div className="mb-8 flex items-center justify-between">
                <Button
                    variant="outline"
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-5 text-base"
                >
                    <ArrowLeft className="mr-2 size-5" />
                    Back
                </Button>
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={handleBack}
                        className="text-base"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={pending || !name.trim() || !startsAt}
                        className="px-6 py-5 text-base"
                    >
                        {pending ? (
                            <span className="flex items-center gap-2">
                                <span className="size-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                Saving...
                            </span>
                        ) : (
                            "Save changes"
                        )}
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm">
                <div className="px-8 py-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold">Preorder details</h2>
                        <p className="text-base text-muted-foreground">
                            These values appear in the preorders list.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-[220px_1fr] gap-8">
                            <div>
                                <Label className="text-base font-medium">
                                    Name <span className="text-destructive">*</span>
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                    A label to recognize this preorder by.
                                </p>
                            </div>
                            <Input
                                placeholder="e.g. Summer Collection"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-12 text-base"
                            />
                        </div>

                        <Separator />

                        <div className="grid grid-cols-[220px_1fr] gap-8">
                            <div>
                                <Label className="text-base font-medium">Products</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Number of products covered by this preorder.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="size-11"
                                    onClick={() => setProducts(Math.max(1, products - 1))}
                                >
                                    −
                                </Button>
                                <span className="flex h-11 w-20 items-center justify-center rounded-lg border text-lg">
                                    {products}
                                </span>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="size-11"
                                    onClick={() => setProducts(products + 1)}
                                >
                                    +
                                </Button>
                                <span className="text-base text-muted-foreground">product(s)</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-[220px_1fr] gap-8">
                            <div>
                                <Label className="text-base font-medium">Preorder when</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                    When customers are allowed to preorder.
                                </p>
                            </div>
                            <Select value={preorderWhen} onValueChange={setPreorderWhen}>
                                <SelectTrigger className="h-12 text-base">
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

                        <div className="grid grid-cols-[220px_1fr] gap-8">
                            <div>
                                <Label className="text-base font-medium">Starts at</Label>
                                <p className="text-sm text-muted-foreground mt-1">
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

                        <div className="grid grid-cols-[220px_1fr] gap-8">
                            <div>
                                <Label className="text-base font-medium">Ends at</Label>
                                <p className="text-sm text-muted-foreground mt-1">
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

                        <div className="grid grid-cols-[220px_1fr] gap-8">
                            <div>
                                <Label className="text-base font-medium">Status</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Active preorders are visible to customers.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Switch checked={status} onCheckedChange={setStatus} id="status" />
                                <Label htmlFor="status" className="text-base font-medium">
                                    Active
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 border-t px-8 py-5">
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={handleBack}
                        className="text-base"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={pending || !name.trim() || !startsAt}
                        className="px-6 py-5 text-base"
                    >
                        {pending ? (
                            <span className="flex items-center gap-2">
                                <span className="size-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                Saving...
                            </span>
                        ) : (
                            "Save changes"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
