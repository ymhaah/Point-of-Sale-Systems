import type { LucideIcon } from "lucide-react";

type InputType = "text" | "number" | "textarea" | "select" | "image";
type InputCategory = "Info" | "Pricing" | "Stock" | "Details";

export type ProductFieldT = {
    inputId: number;

    // Field identity
    name: string;
    label: string;
    type: InputType;
    inputCategory: InputCategory;

    // Basic properties
    required?: boolean;
    placeholder?: string;
    icon?: LucideIcon;
    defaultValue?: string | number;

    // Layout & display
    fullWidth?: boolean;
    gridSpan?: number; // useful for Tailwind grid systems
    hideOnMobile?: boolean;
    visible?: boolean;
    group?: string; // for organizing fields in sections or tabs

    // Help text & hints
    description?: string;
    tooltip?: string;
    unit?: string; // like "EGP", "kg", "pcs"

    // Numeric configuration
    step?: number;
    min?: number;
    max?: number;
    inputMode?: "text" | "numeric" | "decimal";

    // Input behavior
    validationMessage?: string;
    autoComplete?: string;
    readOnly?: boolean;
    disabled?: boolean;

    // Transform values
    normalize?: (value: string | number) => any;
    formatOnSubmit?: (value: any) => any;

    // For selects
    SelectValue?: (string | number)[];

    // Conditional rendering
    dependsOn?: string[];
    condition?: (formValues: Record<string, any>) => boolean;
};

export default ProductFieldT;
