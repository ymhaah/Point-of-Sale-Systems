import * as z from "zod";
import type { LucideIcon } from "lucide-react";

// ✅ More comprehensive input types
type InputType =
    | "text"
    | "number"
    | "textarea"
    | "select"
    | "image"
    | "email"
    | "url"
    | "password"
    | "checkbox"
    | "radio";

type InputCategory = "Info" | "Pricing" | "Stock" | "Details";

// ✅ More complete autocomplete options
type AutocompleteT =
    | "name"
    | "email"
    | "tel"
    | "street-address"
    | "postal-code"
    | "url"
    | "photo"
    | "on"
    | "off";

// ✅ Add validation types for better type safety
type ValidationRuleT = {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
};

// ✅ Improved field type with better organization
type ProductFieldT = {
    // Core identity
    inputId: number;
    name: string;
    label: string;
    type: InputType;
    inputCategory: InputCategory;

    // Field behavior
    required?: boolean;
    placeholder?: string;
    defaultValue?: string | number | boolean;

    // Select/Multi options - better typing
    options?: Array<{
        label: string;
        value: string | number;
        disabled?: boolean;
    }>;
    defaultSelectValue?: (string | number)[];

    // UI & Layout
    icon?: LucideIcon;
    fullWidth?: boolean;
    gridSpan?: 1 | 2 | 3 | 4 | 6 | 12; // ✅ Constrain to valid grid values
    hideOnMobile?: boolean;
    visible?: boolean;

    // Help & guidance
    description?: string;
    tooltip?: string;
    unit?: string;

    // Input configuration
    step?: number;
    inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url";
    autoComplete?: AutocompleteT;
    readOnly?: boolean;
    disabled?: boolean;

    // ✅ Better validation integration
    validation?: ValidationRuleT;

    // Value transformation
    normalize?: (value: string | number) => any;
    formatDisplay?: (value: any) => string; // ✅ For display formatting
    formatOnSubmit?: (value: any) => any;

    // Conditional logic
    dependsOn?: string[];
    condition?: (formValues: Record<string, any>) => boolean;

    // ✅ Dynamic behavior
    onChange?: (value: any, formValues: Record<string, any>) => void;
};

// ✅ Constants for better maintainability
const PRICE_LIMITS = {
    MIN: 0.01,
    MAX: 999999.99,
    PRECISION: 0.01,
} as const;

const TEXT_LIMITS = {
    NAME: { MIN: 2, MAX: 50 },
    DESCRIPTION: { MIN: 2, MAX: 500 },
} as const;

// ✅ Reusable validation schemas
const priceSchema = (fieldName: string) =>
    z
        .number({
            required_error: `${fieldName} is required.`,
            invalid_type_error: `${fieldName} must be a valid number.`,
        })
        .positive({ message: `${fieldName} must be greater than 0.` })
        .max(PRICE_LIMITS.MAX, {
            message: `${fieldName} cannot exceed $${PRICE_LIMITS.MAX.toLocaleString()}.`,
        })
        .multipleOf(PRICE_LIMITS.PRECISION, {
            message: "Price must be in cents (e.g., 10.99).",
        });

const textSchema = (fieldName: string, limits: { MIN: number; MAX: number }) =>
    z
        .string()
        .trim()
        .min(limits.MIN, {
            message: `${fieldName} must be at least ${limits.MIN} characters.`,
        })
        .max(limits.MAX, {
            message: `${fieldName} cannot exceed ${limits.MAX} characters.`,
        });

// ✅ Enhanced product schema with better organization
const productFormZodSchema = z
    .object({
        name: textSchema("Product name", TEXT_LIMITS.NAME),
        description: textSchema("Description", TEXT_LIMITS.DESCRIPTION),
        wholesalePrice: priceSchema("Wholesale price"),
        retailPrice: priceSchema("Retail price"),
        itemsPerUnit: z
            .number({
                required_error: "Items per unit is required.",
                invalid_type_error: "Items per unit must be a number.",
            })
            .int({ message: "Items per unit must be a whole number." })
            .positive({ message: "Items per unit must be at least 1." })
            .max(10000, { message: "Items per unit cannot exceed 10,000." }),
        stockQuantity: z
            .number({
                required_error: "Stock quantity is required.",
                invalid_type_error: "Stock quantity must be a number.",
            })
            .int({ message: "Stock quantity must be a whole number." })
            .min(0, { message: "Stock quantity cannot be negative." })
            .max(1000000, {
                message: "Stock quantity cannot exceed 1,000,000.",
            }),
    })
    // ✅ Enhanced cross-field validation
    .refine((data) => data.retailPrice > data.wholesalePrice, {
        message: "Retail price must be higher than wholesale price.",
        path: ["retailPrice"],
    })
    .refine((data) => data.retailPrice <= data.wholesalePrice * 10, {
        message:
            "Retail price seems unusually high compared to wholesale price.",
        path: ["retailPrice"],
    });

// const productFormZodSchema = z
//     .object({
//         // Basic info
//         name: textSchema("Product name", TEXT_LIMITS.NAME),

//         description: textSchema("Description", TEXT_LIMITS.DESCRIPTION),
//   image: z
//     .custom<File>()
//     .refine((file) => file instanceof File, "Image is required")
//     .refine((file) => file.size <= 10 * 1024 * 1024, "Max size is 10MB")
//     .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
//       message: "Only JPG, PNG, and GIF files are accepted",
//     }),

//         // Category with better validation
//         category: z
//             .string()
//             .min(1, { message: "Please select a category." })
//             .refine((val) => val !== "default" && val !== "", {
//                 message: "Please select a valid category.",
//             }),

//         // Pricing
//         wholesalePrice: priceSchema("Wholesale price"),
//         retailPrice: priceSchema("Retail price"),

//         // Inventory
//         itemsPerUnit: z
//             .number({
//                 required_error: "Items per unit is required.",
//                 invalid_type_error: "Items per unit must be a number.",
//             })
//             .int({ message: "Items per unit must be a whole number." })
//             .positive({ message: "Items per unit must be at least 1." })
//             .max(10000, { message: "Items per unit cannot exceed 10,000." }), // ✅ Add reasonable limit

//         stockQuantity: z
//             .number({
//                 required_error: "Stock quantity is required.",
//                 invalid_type_error: "Stock quantity must be a number.",
//             })
//             .int({ message: "Stock quantity must be a whole number." })
//             .min(0, { message: "Stock quantity cannot be negative." })
//             .max(1000000, {
//                 message: "Stock quantity cannot exceed 1,000,000.",
//             }), // ✅ Add reasonable limit
//     })
//     // ✅ Enhanced cross-field validation
//     .refine((data) => data.retailPrice > data.wholesalePrice, {
//         message: "Retail price must be higher than wholesale price.",
//         path: ["retailPrice"],
//     })
//     .refine(
//         (data) => data.retailPrice <= data.wholesalePrice * 10, // ✅ Prevent unrealistic markup
//         {
//             message:
//                 "Retail price seems unusually high compared to wholesale price.",
//             path: ["retailPrice"],
//         }
//     );

// ✅ Infer type from schema for better type safety
type ProductFormDataT = z.infer<typeof productFormZodSchema>;

// ✅ Export everything with consistent naming
export {
    type ProductFieldT,
    type ProductFormDataT,
    productFormZodSchema,
    PRICE_LIMITS,
    TEXT_LIMITS,
};
