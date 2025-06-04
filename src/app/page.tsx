"use client";
import React, { useEffect, useState } from "react";

import ThemeToggle from "@ui/ThemeToggle.tsx";
import { Button } from "@/components/ui/Button";

function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1>Hello World</h1>
            <ThemeToggle />
            <Button variant="outline" size="default">
                button
            </Button>
        </div>
    );
}
export default Home;
