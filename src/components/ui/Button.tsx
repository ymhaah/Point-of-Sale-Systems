import { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/mergeTwClass";

const buttonVariants = cva(
    "inline-flex items-center pointer cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type ButtonPropsT<E extends React.ElementType = "button"> = {
    children: ReactNode;
    className?: string;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
    isDisabled?: boolean;
    iconOnlyAlt?: string;
    handleClick?: (event: React.MouseEvent) => void;
    as?: E;
    asChild?: boolean;
} & Omit<
    React.ComponentProps<E>,
    "children" | "className" | "disabled" | "onClick"
>;
/**
 * Button component.
 * Renders a 'button' or 'a' (anchor) element.
 * @param {ButtonPropsT} props - Component props.
 *    - isDisabled: Indicates whether the button is disabled. Default is false.
 *    - iconOnlyAlt: Alternative text for the button icon, used for accessibility when only an icon is displayed.
 *    - as: The element type to render. Can be either 'button' or 'a' (anchor). Defaults to 'button'.
 * @returns {ReactNode} - Rendered button component.
 */
function Button<E extends React.ElementType = "button">({
    children,
    className,
    variant,
    size,
    isDisabled,
    iconOnlyAlt,
    handleClick,
    as,
    asChild = false,
    ...props
}: ButtonPropsT<E>): ReactNode {
    const Component = asChild ? Slot : as || "button";

    return (
        <Component
            data-slot="button"
            type={
                Component === "button" && !asChild
                    ? (props as any).type || "button"
                    : undefined
            }
            aria-label={iconOnlyAlt}
            aria-disabled={isDisabled}
            disabled={
                Component === "button" && !asChild ? isDisabled : undefined
            }
            onClick={handleClick}
            className={cn(
                buttonVariants({ variant, size }),
                isDisabled && "disabled",
                iconOnlyAlt && "icon-only",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

export { Button, buttonVariants };
