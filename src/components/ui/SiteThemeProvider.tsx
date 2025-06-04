"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function SiteThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
export default SiteThemeProvider;
