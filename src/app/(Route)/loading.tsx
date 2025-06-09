"use client";

import Skeleton from "@ui/skeleton";
import { Loader2 } from "lucide-react";

function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="flex flex-col items-center gap-6 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
}
export default Loading;
