import {
    BadgeInfo,
    Image as ImageIcon,
    AlignLeft,
    Tags,
    Layers,
    Store,
    DollarSign,
    CreditCard,
    PackageOpen,
    CircleDollarSign,
    Wallet,
    ArrowUpRight,
    BarChart3,
    TrendingUp,
    Boxes,
} from "lucide-react";

import type { ProductFieldT } from "@ts/ProductFieldT";

const productFields: ProductFieldT[] = [
    // ? Info Section
    {
        inputId: 1,
        name: "name",
        label: "Product Name",
        type: "text",
        required: true,
        icon: BadgeInfo,
        placeholder: "e.g., Premium Gel Pen",
        inputCategory: "Info",
        autoComplete: "name",
    },
    {
        inputId: 2,
        name: "description",
        label: "Description",
        type: "textarea",
        required: false,
        icon: AlignLeft,
        placeholder:
            "Describe your product features, benefits, and specifications...",
        inputCategory: "Info",
    },
    // ? Pricing Section
    {
        inputId: 3,
        name: "wholesalePrice",
        label: "Wholesale Price",
        type: "number",
        required: true,
        icon: DollarSign,
        unit: "EGP",
        step: 0.01,
        inputMode: "decimal",
        inputCategory: "Pricing",
        placeholder: "0.00",
        description: "Price you pay to purchase this product",
    },
    {
        inputId: 4,
        name: "retailPrice",
        label: "Retail Price",
        type: "number",
        required: true,
        icon: CreditCard,
        unit: "EGP",
        step: 0.01,
        inputMode: "decimal",
        inputCategory: "Pricing",
        placeholder: "0.00",
        description: "Price you sell this product for",
    },

    // ? Unit Details Section
    {
        inputId: 5,
        name: "itemsPerUnit",
        label: "Items per Unit",
        type: "number",
        required: true,
        icon: PackageOpen,
        placeholder: "e.g., 12",
        inputCategory: "Details",
        step: 1,
        inputMode: "numeric",
    },
    {
        inputId: 6,
        name: "stockQuantity",
        label: "Stock Quantity",
        type: "number",
        required: true,
        icon: Boxes,
        step: 1,
        inputMode: "numeric",
        inputCategory: "Stock",
        placeholder: "0",
        description: "Current stock quantity in your inventory",
    },
];
// const productFields: ProductFieldT[] = [
//     // 🧾 Info Section
//     {
//         inputId: 1,
//         name: "name",
//         label: "Product Name",
//         type: "text",
//         required: true,
//         icon: BadgeInfo,
//         placeholder: "e.g., Premium Gel Pen",
//         inputCategory: "Info",
//         fullWidth: false,
//         gridSpan: 6,
//         autoComplete: "name",
//         validation: {
//             min: 2,
//             max: 50,
//         },
//     },
//     {
//         inputId: 2,
//         name: "image",
//         label: "Product Image",
//         type: "image",
//         required: false,
//         icon: ImageIcon,
//         placeholder: "Upload or paste image URL",
//         inputCategory: "Info",
//         fullWidth: true,
//         gridSpan: 12,
//         description: "Supports JPG, PNG, WebP, GIF formats",
//     },
//     {
//         inputId: 3,
//         name: "description",
//         label: "Description",
//         type: "textarea",
//         required: false,
//         icon: AlignLeft,
//         placeholder:
//             "Describe your product features, benefits, and specifications...",
//         inputCategory: "Info",
//         fullWidth: true,
//         gridSpan: 12,
//         validation: {
//             min: 2,
//             max: 500,
//         },
//     },
//     {
//         inputId: 4,
//         name: "category",
//         label: "Category",
//         type: "select",
//         required: true,
//         icon: Tags,
//         inputCategory: "Info",
//         gridSpan: 6,
//         options: [
//             { label: "Select Category", value: "default", disabled: true },
//             { label: "📝 Stationery", value: "stationery" },
//             { label: "🍕 Food & Beverages", value: "food" },
//             { label: "🧽 Cleaning Supplies", value: "cleaning" },
//             { label: "💻 Electronics", value: "electronics" },
//             { label: "👕 Clothing", value: "clothing" },
//             { label: "🏠 Home & Garden", value: "home" },
//             { label: "🎮 Toys & Games", value: "toys" },
//             { label: "📚 Books & Media", value: "books" },
//             { label: "🔧 Tools & Hardware", value: "tools" },
//             { label: "🎨 Arts & Crafts", value: "arts" },
//         ],
//         defaultSelectValue: ["default"],
//     },
//     {
//         inputId: 5,
//         name: "type",
//         label: "Product Type",
//         type: "text",
//         required: false,
//         icon: Layers,
//         placeholder: "e.g., Ballpoint, Gel, Fountain",
//         inputCategory: "Info",
//         gridSpan: 6,
//         description: "Specific type or variant of the product",
//     },
//     {
//         inputId: 6,
//         name: "source",
//         label: "Purchase Source",
//         type: "text",
//         required: false,
//         icon: Store,
//         placeholder: "e.g., Local Supplier, Online Store, Manufacturer",
//         inputCategory: "Info",
//         gridSpan: 6,
//         description: "Where you purchase this product from",
//     },

//     // 💰 Pricing Section
//     {
//         inputId: 7,
//         name: "wholesalePrice",
//         label: "Wholesale Price",
//         type: "number",
//         required: true,
//         icon: DollarSign,
//         unit: "EGP",
//         step: 0.01,
//         inputMode: "decimal",
//         inputCategory: "Pricing",
//         gridSpan: 6,
//         placeholder: "0.00",
//         description: "Price you pay to purchase this product",
//         validation: {
//             min: 0.01,
//             max: 999999.99,
//         },
//     },
//     {
//         inputId: 8,
//         name: "retailPrice",
//         label: "Retail Price",
//         type: "number",
//         required: true,
//         icon: CreditCard,
//         unit: "EGP",
//         step: 0.01,
//         inputMode: "decimal",
//         inputCategory: "Pricing",
//         gridSpan: 6,
//         placeholder: "0.00",
//         description: "Price you sell this product for",
//         validation: {
//             min: 0.01,
//             max: 999999.99,
//         },
//         dependsOn: ["wholesalePrice"],
//         condition: (values) => values.wholesalePrice > 0,
//     },

//     // 📦 Unit Details Section
//     {
//         inputId: 9,
//         name: "itemsPerUnit", // ✅ Match schema field name
//         label: "Items per Unit",
//         type: "number",
//         required: true, // ✅ Match schema requirement
//         icon: PackageOpen,
//         placeholder: "e.g., 12",
//         inputCategory: "Details",
//         gridSpan: 4,
//         step: 1,
//         inputMode: "numeric",
//         defaultValue: 1,
//         description: "How many individual items come in one unit/package",
//         validation: {
//             min: 1,
//             max: 10000,
//         },
//     },
//     {
//         inputId: 10,
//         name: "unitWholesale",
//         label: "Unit Wholesale Price",
//         type: "number",
//         required: false,
//         icon: CircleDollarSign,
//         unit: "EGP",
//         step: 0.01,
//         inputMode: "decimal",
//         inputCategory: "Details",
//         gridSpan: 4,
//         readOnly: true, // ✅ Auto-calculated field
//         description: "Wholesale price per individual item (auto-calculated)",
//         dependsOn: ["wholesalePrice", "itemsPerUnit"],
//         condition: (values) =>
//             values.wholesalePrice > 0 && values.itemsPerUnit > 0,
//         formatDisplay: (value) => value?.toFixed(2) || "0.00",
//     },
//     {
//         inputId: 11,
//         name: "unitRetail",
//         label: "Unit Retail Price",
//         type: "number",
//         required: false,
//         icon: Wallet,
//         unit: "EGP",
//         step: 0.01,
//         inputMode: "decimal",
//         inputCategory: "Details",
//         gridSpan: 4,
//         readOnly: true, // ✅ Auto-calculated field
//         description: "Retail price per individual item (auto-calculated)",
//         dependsOn: ["retailPrice", "itemsPerUnit"],
//         condition: (values) =>
//             values.retailPrice > 0 && values.itemsPerUnit > 0,
//         formatDisplay: (value) => value?.toFixed(2) || "0.00",
//     },

//     // 📈 Profit & Stock Section
//     {
//         inputId: 12,
//         name: "unitProfit",
//         label: "Profit per Item",
//         type: "number",
//         required: false,
//         icon: ArrowUpRight,
//         unit: "EGP",
//         step: 0.01,
//         inputMode: "decimal",
//         inputCategory: "Stock",
//         gridSpan: 4,
//         readOnly: true, // ✅ Auto-calculated field
//         description: "Profit per individual item (auto-calculated)",
//         dependsOn: ["unitRetail", "unitWholesale"],
//         condition: (values) =>
//             values.unitRetail > 0 && values.unitWholesale > 0,
//         formatDisplay: (value) => value?.toFixed(2) || "0.00",
//     },
//     {
//         inputId: 13,
//         name: "groupProfit",
//         label: "Profit per Unit",
//         type: "number",
//         required: false,
//         icon: BarChart3,
//         unit: "EGP",
//         step: 0.01,
//         inputMode: "decimal",
//         inputCategory: "Stock",
//         gridSpan: 4,
//         readOnly: true, // ✅ Auto-calculated field
//         description: "Total profit per unit/package (auto-calculated)",
//         dependsOn: ["retailPrice", "wholesalePrice"],
//         condition: (values) =>
//             values.retailPrice > 0 && values.wholesalePrice > 0,
//         formatDisplay: (value) => value?.toFixed(2) || "0.00",
//     },
//     {
//         inputId: 14,
//         name: "profitMargin",
//         label: "Profit Margin",
//         type: "number",
//         required: false,
//         icon: TrendingUp,
//         unit: "%",
//         step: 0.1,
//         inputMode: "decimal",
//         inputCategory: "Stock",
//         gridSpan: 4,
//         readOnly: true, // ✅ Auto-calculated field
//         description: "Profit margin percentage (auto-calculated)",
//         dependsOn: ["retailPrice", "wholesalePrice"],
//         condition: (values) =>
//             values.retailPrice > 0 && values.wholesalePrice > 0,
//         formatDisplay: (value) => value?.toFixed(1) || "0.0",
//     },
//     {
//         inputId: 15,
//         name: "stockQuantity", // ✅ Match schema field name
//         label: "Stock Quantity",
//         type: "number",
//         required: true, // ✅ Match schema requirement
//         icon: Boxes,
//         step: 1,
//         inputMode: "numeric",
//         inputCategory: "Stock",
//         gridSpan: 6,
//         defaultValue: 0,
//         placeholder: "0",
//         description: "Current stock quantity in your inventory",
//         validation: {
//             min: 0,
//             max: 1000000,
//         },
//     },
// ];

export default productFields;
