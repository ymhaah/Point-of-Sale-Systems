"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeInfo, Boxes, DollarSign, Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardAction,
    CardFooter,
} from "@ui/card";
import { Button } from "@ui/button";

import DynamicInput from "@/components/DynamicInput";

import Link from "next/link";

import productFields from "@data/productFormInputs";
import {
    ProductFieldT,
    ProductFormDataT,
    productFormZodSchema,
} from "@ts/ProductFieldT";

import { toast } from "sonner";

import {
    ArrowLeft,
    Upload,
    Calculator,
    Archive,
    AlertCircle,
} from "lucide-react";

const calculateDependentFields = (formValues: Record<string, any>) => {
    const {
        wholesalePrice = 0,
        retailPrice = 0,
        itemsPerUnit = 1,
    } = formValues;

    // Calculate unit prices
    const unitWholesale = wholesalePrice / itemsPerUnit;
    const unitRetail = retailPrice / itemsPerUnit;

    // Calculate profits
    const unitProfit = unitRetail - unitWholesale;
    const groupProfit = retailPrice - wholesalePrice;

    // Calculate profit margin
    const profitMargin =
        wholesalePrice > 0
            ? ((retailPrice - wholesalePrice) / wholesalePrice) * 100
            : 0;

    return {
        unitWholesale: Number(unitWholesale.toFixed(2)),
        unitRetail: Number(unitRetail.toFixed(2)),
        unitProfit: Number(unitProfit.toFixed(2)),
        groupProfit: Number(groupProfit.toFixed(2)),
        profitMargin: Number(profitMargin.toFixed(1)),
    };
};

export default function DynamicProductForm() {
    // const { addProduct, lastAddedProduct, totalProducts } = useProducts();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof productFormZodSchema>>({
        resolver: zodResolver(productFormZodSchema),
        defaultValues: {
            name: "",
            description: "",
            wholesalePrice: 0,
            retailPrice: 0,
            itemsPerUnit: 1,
            stockQuantity: 1,
        },
    });

    const formValues = form.watch();

    function hasErrors(errors: Record<string, any>) {
        return Object.values(errors).some((error) => !!error);
    }

    useEffect(() => {
        const calculated = calculateDependentFields(formValues);
    }, [
        formValues.wholesalePrice,
        formValues.retailPrice,
        formValues.itemsPerUnit,
    ]);
    async function onSubmit(values: z.infer<typeof productFormZodSchema>) {
        setIsSubmitting(true);

        try {
            // Add product to context
            // const newProduct = addProduct(values);
            console.log("Submitting product:", values);

            // Show success message
            // toast(`${newProduct.name} has been added to your inventory.`);
            toast(` has been added to your inventory.`);

            // Reset form
            form.reset();

            // console.log("Product added:", newProduct);
        } catch (error) {
            toast("Failed to add product. Please try again.");
            console.error("Error adding product:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="Container | mb-20 py-6">
            <div className="mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-8 px-2 lg:px-3"
                >
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>
                </Button>
            </div>

            {hasErrors(form.formState.errors) &&
                Object.keys(form.formState.touchedFields).length > 0 && (
                    <Card className="mb-6 border-destructive bg-destructive/5">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
                                <div className="flex-1 space-y-2">
                                    <p className="text-sm font-medium text-destructive">
                                        Please fix the following errors:
                                    </p>
                                    <ul className="space-y-1 text-sm text-destructive">
                                        {Object.entries(
                                            form.formState.errors
                                        ).map(([field, error]) => (
                                            <li
                                                key={field}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="h-1 w-1 rounded-full bg-destructive" />
                                                {(error as { message?: string })
                                                    .message || "Invalid input"}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <Card className="w-full">
                        <CardHeader className="space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl font-semibold tracking-tight">
                                        Add New Product
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Fill in the details below to add a new
                                        product to your inventory.
                                    </CardDescription>
                                </div>
                                <Button type="submit" isDisabled={isSubmitting}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting
                                        ? "Saving..."
                                        : "Save Product"}
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Form Fields */}
                            <div className="grid gap-6">
                                {productFields.map((field, index) => (
                                    <DynamicInput
                                        key={index}
                                        field={field}
                                        form={form}
                                        formValues={formValues}
                                    />
                                ))}
                            </div>

                            {/* Calculated Fields Display */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calculator className="h-4 w-4 text-muted-foreground" />
                                    <h3 className="text-sm font-medium text-foreground">
                                        Calculated Values
                                    </h3>
                                </div>

                                <div className="grid gap-4 rounded-lg border bg-muted/50 p-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Profit per Unit
                                        </p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-green-600 dark:text-green-500">
                                                $
                                                {
                                                    calculateDependentFields(
                                                        formValues
                                                    ).unitProfit
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Profit Margin
                                        </p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-green-600 dark:text-green-500">
                                                {
                                                    calculateDependentFields(
                                                        formValues
                                                    ).profitMargin
                                                }
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex gap-3">
                            <Button type="submit" isDisabled={isSubmitting}>
                                <Save className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Saving..." : "Save Product"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                                asChild
                            >
                                <Link href="/products">Cancel</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
