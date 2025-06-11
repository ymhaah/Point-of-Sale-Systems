"use client";

import { useState } from "react";
import productFields from "@data/productFormInputs.ts";

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Label from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@lib/mergeTwClass";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type ProductFormData = Record<string, string | number>;

function Product({ params }: { params: { product: string } }) {
    const [formData, setFormData] = useState<ProductFormData>({});

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    }

    function handleSelectChange(name: string, value: string | number) {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="mb-6 text-2xl font-bold">Add New Product</h1>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
                {productFields.map((field) => {
                    const Icon = field.icon;
                    const isFull = field.fullWidth;
                    const inputProps = {
                        id: field.name,
                        name: field.name,
                        required: field.required,
                        placeholder:
                            field.placeholder ||
                            `Enter ${field.label.toLowerCase()}`,
                        onChange: handleChange,
                        ...(field.type === "number" && {
                            type: "number",
                            step: field.step || "any",
                            min: field.min,
                            defaultValue: field.defaultValue,
                        }),
                    };

                    return (
                        <div
                            key={field.name}
                            className={cn(
                                "space-y-2",
                                isFull && "md:col-span-2"
                            )}
                        >
                            <Label
                                htmlFor={field.name}
                                className="flex items-center gap-2"
                            >
                                {Icon && (
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                )}
                                {field.label}
                            </Label>

                            {field.type === "textarea" ? (
                                <Textarea {...inputProps} />
                            ) : field.type === "select" && field.SelectValue ? (
                                <Select
                                    onValueChange={(value) =>
                                        handleSelectChange(field.name, value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                field.placeholder ||
                                                `Select ${field.label.toLowerCase()}`
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.SelectValue.map((option) => (
                                            <SelectItem
                                                key={option}
                                                value={option.toString()}
                                            >
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : field.type === "image" ? (
                                <Input
                                    type="file"
                                    name={field.name}
                                    id={field.name}
                                />
                            ) : (
                                <Input {...inputProps} type={field.type} />
                            )}
                        </div>
                    );
                })}

                <div className="text-right md:col-span-2">
                    <Button type="submit">Save Product</Button>
                </div>
            </form>
        </div>
    );
}

export default Product;
