"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, X } from "lucide-react";

import { Button } from "@ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Input from "@ui/input";
import Textarea from "@ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@ui/dialog";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    image: z.string().min(1, {
        message: "Please upload a product image.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string().min(1, {
        message: "Please select a category.",
    }),
    wholesalePrice: z.number().min(0.01, {
        message: "Wholesale price must be greater than 0.",
    }),
    retailPrice: z.number().min(0.01, {
        message: "Retail price must be greater than 0.",
    }),
    itemsPerUnit: z.number().min(1, {
        message: "Items per unit must be at least 1.",
    }),
    stockQuantity: z.number().min(0, {
        message: "Stock quantity cannot be negative.",
    }),
});

const defaultCategories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Beauty",
    "Food & Beverages",
];

function Product() {}

// export default function ProductForm() {
//     const [categories, setCategories] = useState(defaultCategories);
//     const [newCategory, setNewCategory] = useState("");
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [imagePreview, setImagePreview] = useState<string | null>(null);

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             image: "",
//             description: "",
//             category: "",
//             wholesalePrice: 0,
//             retailPrice: 0,
//             itemsPerUnit: 1,
//             stockQuantity: 0,
//         },
//     });

//     const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const result = e.target?.result as string;
//                 setImagePreview(result);
//                 form.setValue("image", result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const addNewCategory = () => {
//         if (newCategory.trim() && !categories.includes(newCategory.trim())) {
//             const updatedCategories = [...categories, newCategory.trim()];
//             setCategories(updatedCategories);
//             form.setValue("category", newCategory.trim());
//             setNewCategory("");
//             setIsDialogOpen(false);
//         }
//     };

//     const removeCategory = (categoryToRemove: string) => {
//         if (!defaultCategories.includes(categoryToRemove)) {
//             setCategories(categories.filter((cat) => cat !== categoryToRemove));
//             if (form.getValues("category") === categoryToRemove) {
//                 form.setValue("category", "");
//             }
//         }
//     };

//     function onSubmit(values: z.infer<typeof formSchema>) {
//         console.log(values);
//         // Handle form submission here
//         alert("Product submitted successfully!");
//     }

//     return (
//         <section aria-label="Add New Product">
//             <div>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="text-2xl font-bold">
//                             Add New Product
//                         </CardTitle>
//                         <CardDescription>
//                             Fill in the details below to add a new product to
//                             your inventory.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <Form {...form}>
//                             <form
//                                 onSubmit={form.handleSubmit(onSubmit)}
//                                 className="space-y-6"
//                             >
//                                 {/* Product Name */}
//                                 <FormField
//                                     control={form.control}
//                                     name="name"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Product Name</FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     placeholder="Enter product name"
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Image Upload */}
//                                 <FormField
//                                     control={form.control}
//                                     name="image"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Product Image</FormLabel>
//                                             <FormControl>
//                                                 <div className="space-y-4">
//                                                     <div className="flex w-full items-center justify-center">
//                                                         <label
//                                                             htmlFor="image-upload"
//                                                             className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
//                                                         >
//                                                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                                                 <Upload className="mb-4 h-8 w-8 text-gray-500" />
//                                                                 <p className="mb-2 text-sm text-gray-500">
//                                                                     <span className="font-semibold">
//                                                                         Click to
//                                                                         upload
//                                                                     </span>{" "}
//                                                                     or drag and
//                                                                     drop
//                                                                 </p>
//                                                                 <p className="text-xs text-gray-500">
//                                                                     PNG, JPG or
//                                                                     JPEG (MAX.
//                                                                     5MB)
//                                                                 </p>
//                                                             </div>
//                                                             <input
//                                                                 id="image-upload"
//                                                                 type="file"
//                                                                 className="hidden"
//                                                                 accept="image/*"
//                                                                 onChange={
//                                                                     handleImageUpload
//                                                                 }
//                                                             />
//                                                         </label>
//                                                     </div>
//                                                     {imagePreview && (
//                                                         <div className="relative mx-auto h-32 w-32">
//                                                             <img
//                                                                 src={
//                                                                     imagePreview ||
//                                                                     "/placeholder.svg"
//                                                                 }
//                                                                 alt="Preview"
//                                                                 className="h-full w-full rounded-lg border object-cover"
//                                                             />
//                                                             <Button
//                                                                 type="button"
//                                                                 variant="destructive"
//                                                                 size="sm"
//                                                                 className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
//                                                                 onClick={() => {
//                                                                     setImagePreview(
//                                                                         null
//                                                                     );
//                                                                     form.setValue(
//                                                                         "image",
//                                                                         ""
//                                                                     );
//                                                                 }}
//                                                             >
//                                                                 <X className="h-3 w-3" />
//                                                             </Button>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Description */}
//                                 <FormField
//                                     control={form.control}
//                                     name="description"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Description</FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     placeholder="Enter product description"
//                                                     className="min-h-[100px]"
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormDescription>
//                                                 Provide a detailed description
//                                                 of your product.
//                                             </FormDescription>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Category */}
//                                 <FormField
//                                     control={form.control}
//                                     name="category"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Category</FormLabel>
//                                             <div className="space-y-3">
//                                                 <div className="flex gap-2">
//                                                     <Select
//                                                         onValueChange={
//                                                             field.onChange
//                                                         }
//                                                         value={field.value}
//                                                     >
//                                                         <FormControl>
//                                                             <SelectTrigger className="flex-1">
//                                                                 <SelectValue placeholder="Select a category" />
//                                                             </SelectTrigger>
//                                                         </FormControl>
//                                                         <SelectContent>
//                                                             {categories.map(
//                                                                 (category) => (
//                                                                     <SelectItem
//                                                                         key={
//                                                                             category
//                                                                         }
//                                                                         value={
//                                                                             category
//                                                                         }
//                                                                     >
//                                                                         {
//                                                                             category
//                                                                         }
//                                                                     </SelectItem>
//                                                                 )
//                                                             )}
//                                                         </SelectContent>
//                                                     </Select>
//                                                     <Dialog
//                                                         open={isDialogOpen}
//                                                         onOpenChange={
//                                                             setIsDialogOpen
//                                                         }
//                                                     >
//                                                         <DialogTrigger asChild>
//                                                             <Button
//                                                                 type="button"
//                                                                 variant="outline"
//                                                                 size="icon"
//                                                             >
//                                                                 <Plus className="h-4 w-4" />
//                                                             </Button>
//                                                         </DialogTrigger>
//                                                         <DialogContent>
//                                                             <DialogHeader>
//                                                                 <DialogTitle>
//                                                                     Add New
//                                                                     Category
//                                                                 </DialogTitle>
//                                                                 <DialogDescription>
//                                                                     Enter a new
//                                                                     category
//                                                                     name to add
//                                                                     to the list.
//                                                                 </DialogDescription>
//                                                             </DialogHeader>
//                                                             <div className="space-y-4">
//                                                                 <Input
//                                                                     placeholder="Category name"
//                                                                     value={
//                                                                         newCategory
//                                                                     }
//                                                                     onChange={(
//                                                                         e
//                                                                     ) =>
//                                                                         setNewCategory(
//                                                                             e
//                                                                                 .target
//                                                                                 .value
//                                                                         )
//                                                                     }
//                                                                     onKeyPress={(
//                                                                         e
//                                                                     ) =>
//                                                                         e.key ===
//                                                                             "Enter" &&
//                                                                         addNewCategory()
//                                                                     }
//                                                                 />
//                                                             </div>
//                                                             <DialogFooter>
//                                                                 <Button
//                                                                     type="button"
//                                                                     variant="outline"
//                                                                     onClick={() =>
//                                                                         setIsDialogOpen(
//                                                                             false
//                                                                         )
//                                                                     }
//                                                                 >
//                                                                     Cancel
//                                                                 </Button>
//                                                                 <Button
//                                                                     type="button"
//                                                                     onClick={
//                                                                         addNewCategory
//                                                                     }
//                                                                 >
//                                                                     Add Category
//                                                                 </Button>
//                                                             </DialogFooter>
//                                                         </DialogContent>
//                                                     </Dialog>
//                                                 </div>
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {categories.map(
//                                                         (category) => (
//                                                             <Badge
//                                                                 key={category}
//                                                                 variant="secondary"
//                                                                 className="text-xs"
//                                                             >
//                                                                 {category}
//                                                                 {!defaultCategories.includes(
//                                                                     category
//                                                                 ) && (
//                                                                     <Button
//                                                                         type="button"
//                                                                         variant="ghost"
//                                                                         size="sm"
//                                                                         className="ml-2 h-auto p-0 hover:bg-transparent"
//                                                                         onClick={() =>
//                                                                             removeCategory(
//                                                                                 category
//                                                                             )
//                                                                         }
//                                                                     >
//                                                                         <X className="h-3 w-3" />
//                                                                     </Button>
//                                                                 )}
//                                                             </Badge>
//                                                         )
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Pricing Section */}
//                                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                     <FormField
//                                         control={form.control}
//                                         name="wholesalePrice"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>
//                                                     Wholesale Price
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <div className="relative">
//                                                         <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
//                                                             $
//                                                         </span>
//                                                         <Input
//                                                             type="number"
//                                                             step="0.01"
//                                                             min="0"
//                                                             placeholder="0.00"
//                                                             className="pl-8"
//                                                             {...field}
//                                                             onChange={(e) =>
//                                                                 field.onChange(
//                                                                     Number.parseFloat(
//                                                                         e.target
//                                                                             .value
//                                                                     ) || 0
//                                                                 )
//                                                             }
//                                                         />
//                                                     </div>
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />

//                                     <FormField
//                                         control={form.control}
//                                         name="retailPrice"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>
//                                                     Retail Price
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <div className="relative">
//                                                         <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
//                                                             $
//                                                         </span>
//                                                         <Input
//                                                             type="number"
//                                                             step="0.01"
//                                                             min="0"
//                                                             placeholder="0.00"
//                                                             className="pl-8"
//                                                             {...field}
//                                                             onChange={(e) =>
//                                                                 field.onChange(
//                                                                     Number.parseFloat(
//                                                                         e.target
//                                                                             .value
//                                                                     ) || 0
//                                                                 )
//                                                             }
//                                                         />
//                                                     </div>
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>

//                                 {/* Inventory Section */}
//                                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                     <FormField
//                                         control={form.control}
//                                         name="itemsPerUnit"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>
//                                                     Items per Unit
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="number"
//                                                         min="1"
//                                                         placeholder="1"
//                                                         {...field}
//                                                         onChange={(e) =>
//                                                             field.onChange(
//                                                                 Number.parseInt(
//                                                                     e.target
//                                                                         .value
//                                                                 ) || 1
//                                                             )
//                                                         }
//                                                     />
//                                                 </FormControl>
//                                                 <FormDescription>
//                                                     Number of items in each
//                                                     unit/package
//                                                 </FormDescription>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />

//                                     <FormField
//                                         control={form.control}
//                                         name="stockQuantity"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>
//                                                     Stock Quantity
//                                                 </FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         type="number"
//                                                         min="0"
//                                                         placeholder="0"
//                                                         {...field}
//                                                         onChange={(e) =>
//                                                             field.onChange(
//                                                                 Number.parseInt(
//                                                                     e.target
//                                                                         .value
//                                                                 ) || 0
//                                                             )
//                                                         }
//                                                     />
//                                                 </FormControl>
//                                                 <FormDescription>
//                                                     Current stock quantity
//                                                     available
//                                                 </FormDescription>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>

//                                 <div className="flex gap-4 pt-6">
//                                     <Button type="submit" className="flex-1">
//                                         Add Product
//                                     </Button>
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         className="flex-1"
//                                     >
//                                         Save as Draft
//                                     </Button>
//                                 </div>
//                             </form>
//                         </Form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </section>
//     );
// }

export default Product;
