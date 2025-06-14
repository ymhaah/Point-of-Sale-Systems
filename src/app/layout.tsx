import type { Metadata } from "next";

import Header from "@comp/Header.tsx";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@ui/sidebar.tsx";
import ThemeProvider from "@ui/SiteThemeProvider.tsx";
import { Toaster } from "@ui/sonner";

import { RoutesProvider } from "@context/routesContext.tsx";
import { UserProvider } from "@context/userContext.tsx";

import { Inter, Geist_Mono, Geist } from "next/font/google";

import "./index.scss";
import "./tailwind.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--ff-inter",
});

const geist_Mono = Geist_Mono({
    subsets: ["latin"],
    variable: "--ff-geist-mono",
});

const geist = Geist({
    subsets: ["latin"],
    variable: "--ff-geist",
});

export const metadata: Metadata = {
    title: "Point of Sale System",
    // colorScheme: "dark light",
    description:
        "Modern POS and inventory management system for small to medium businesses",
    // icons: {
    //     icon: [{ rel: "icon", type: "image/png", url: "/favicon.png" }],
    //     apple: "/apple-touch-icon.png",
    // },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`theme-default ${inter.variable} ${geist_Mono.variable} ${geist.variable}`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <RoutesProvider>
                        <UserProvider>
                            <SidebarProvider>
                                <AppSidebar />
                                <SidebarInset>
                                    <Header />
                                    {children}
                                </SidebarInset>
                            </SidebarProvider>
                        </UserProvider>
                    </RoutesProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
