import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import ImageUpload from "@ui/ImageUpload";

import { ProductFieldT } from "@/types/ProductFieldT";

function DynamicInput(props: {
    field: ProductFieldT;
    form: any;
    formValues: Record<string, any>;
}) {
    const { field, form, formValues } = props;
    const IconComponent = field.icon;

    // ? Check if field should be visible
    if (field.visible === false) return null;

    // ? Check condition
    if (field.condition && !field.condition(formValues)) return null;

    return (
        <div className={field.hideOnMobile ? "hidden md:block" : ""}>
            <FormField
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                    <FormItem className="space-y-2">
                        <FormLabel className="flex items-center gap-2 text-sm font-medium">
                            {IconComponent && (
                                <IconComponent className="h-4 w-4 text-muted-foreground" />
                            )}
                            {field.label}
                            {field.required && (
                                <Badge variant="default" className="px-1">
                                    Required
                                </Badge>
                            )}
                            {field.unit && (
                                <Badge variant="outline" className="px-1">
                                    {field.unit}
                                </Badge>
                            )}
                        </FormLabel>
                        <FormControl>
                            {field.type === "textarea" ? (
                                <Textarea
                                    placeholder={field.placeholder}
                                    disabled={field.disabled}
                                    readOnly={field.readOnly}
                                    className="min-h-[100px] resize-none"
                                    {...formField}
                                />
                            ) : field.type === "select" ? (
                                <Select
                                    onValueChange={formField.onChange}
                                    defaultValue={formField.value}
                                    disabled={field.disabled}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                field.placeholder ||
                                                "Select an option"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={String(option.value)}
                                                disabled={option.disabled}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : field.type === "number" ? (
                                <div className="relative">
                                    <Input
                                        type="number"
                                        step={field.step}
                                        inputMode={field.inputMode}
                                        placeholder={field.placeholder}
                                        disabled={field.disabled}
                                        readOnly={field.readOnly}
                                        className={
                                            field.readOnly
                                                ? "bg-muted text-muted-foreground"
                                                : ""
                                        }
                                        {...formField}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value === ""
                                                    ? ""
                                                    : Number(e.target.value);
                                            formField.onChange(value);
                                        }}
                                        value={
                                            field.formatDisplay
                                                ? field.formatDisplay(
                                                      formField.value
                                                  )
                                                : formField.value || ""
                                        }
                                    />
                                </div>
                            ) : field.type === "image" ? (
                                // <ImageUpload formField={formField} />
                                ""
                            ) : (
                                <Input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    disabled={field.disabled}
                                    readOnly={field.readOnly}
                                    className={
                                        field.readOnly
                                            ? "bg-muted text-muted-foreground"
                                            : ""
                                    }
                                    {...formField}
                                />
                            )}
                        </FormControl>
                        {field.description && (
                            <FormDescription className="text-xs text-muted-foreground">
                                {field.description}
                            </FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

export default DynamicInput;
