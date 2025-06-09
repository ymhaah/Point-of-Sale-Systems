import type { Metadata } from "next";

import Header from "@comp/Header.tsx";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@ui/sidebar.tsx";

export const metadata: Metadata = {
    // title: "Point of Sale System",
    // colorScheme: "dark light",
    // description: "",
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
            <body>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <Header />
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}
