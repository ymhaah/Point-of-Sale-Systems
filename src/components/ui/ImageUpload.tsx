"use client";

import { useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

type ImageUploadProps = {
    formField: {
        value: File | null;
        onChange: (file: File | null) => void;
        onBlur: () => void;
        name: string;
    };
};

function ImageUpload({ formField }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!formField.value) {
            setPreviewUrl(null);
        }
    }, [formField.value]);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center">
            <div className="mt-4">
                <Input
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    className="hidden"
                    onChange={handleImageChange}
                    onBlur={formField.onBlur}
                    name={formField.name}
                />

                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium text-muted-foreground">
                    Choose Image
                </p>
                <Button
                    type="button"
                    variant="outline"
                    handleClick={() => inputRef.current?.click()}
                    className="absolute inset-0 m-0 h-full w-full p-0 opacity-0"
                >
                    <span className="sr-only">Upload</span>
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                </p>
            </div>
            {previewUrl ? (
                <div className="relative mx-auto my-4 aspect-square h-32 w-32 overflow-hidden rounded-md">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
export default ImageUpload;
