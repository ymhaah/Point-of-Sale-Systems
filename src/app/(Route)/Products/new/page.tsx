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

    // Calculate dependent fields
    useEffect(() => {
        const calculated = calculateDependentFields(formValues);
        // Here you could update calculated fields if they were part of the form
        console.log("Calculated values:", calculated);
    }, [
        formValues.wholesalePrice,
        formValues.retailPrice,
        formValues.itemsPerUnit,
    ]);

    function onSubmit(values: z.infer<typeof productFormZodSchema>) {
        const calculated = calculateDependentFields(values);
        const completeData = { ...values, ...calculated };
        console.log("Form submitted:", values);
        // Handle form submission
    }

    return (
        <div className="Container |">
            <div className="space-y-2">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>
                </Button>
            </div>

            {hasErrors(form.formState.errors) &&
                Object.keys(form.formState.touchedFields).length > 0 && (
                    <Card className="border border-destructive bg-destructive/10 text-destructive dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 font-medium">
                                <AlertCircle className="h-4 w-4" />
                                <span>Please fix the following errors:</span>
                            </div>
                            <ul className="mt-2 list-inside list-disc text-sm">
                                {Object.entries(form.formState.errors).map(
                                    ([field, error]) => (
                                        <li key={field}>
                                            -
                                            {(error as { message?: string })
                                                .message || "Invalid input"}
                                        </li>
                                    )
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <Card className="grid gap-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Add New Product
                                </h1>
                            </CardTitle>
                            <CardDescription>
                                <p className="text-muted-foreground">
                                    Fill in the details below to add a new
                                    product to your inventory.
                                </p>
                            </CardDescription>
                            <CardAction>
                                <Button type="submit" variant="link">
                                    Save Product
                                    <Save className="mr-2 h-4 w-4" />
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            {productFields.map((field, index) => {
                                return (
                                    <DynamicInput
                                        key={index}
                                        field={field}
                                        form={form}
                                        formValues={formValues}
                                    />
                                );
                            })}
                            <div className="grid grid-cols-1 gap-4 rounded-lg bg-muted p-4 md:grid-cols-2">
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Profit per Unit
                                    </span>
                                    <div className="text-2xl font-bold text-green-600">
                                        $
                                        {
                                            calculateDependentFields(formValues)
                                                .unitProfit
                                        }
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Profit Margin
                                    </span>
                                    <div className="text-2xl font-bold text-green-600">
                                        {
                                            calculateDependentFields(formValues)
                                                .profitMargin
                                        }
                                        %
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex space-x-4 pt-6">
                            <Button type="submit" className="bg-primary">
                                <Save className="mr-2 h-4 w-4" />
                                Save Product
                            </Button>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
