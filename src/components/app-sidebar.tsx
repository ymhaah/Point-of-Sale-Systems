"use client";

import { useContext } from "react";
import { routesContext } from "@context/routesContext.tsx";
import { usersContext } from "@context/userContext.tsx";

import externalLinks from "@data/externalLinks.ts";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Command } from "lucide-react";

// const data = {
//     user: {
//         name: "shadcn",
//         email: "m@example.com",
//         avatar: "/avatars/shadcn.jpg",
//     },
//     navMain: [
//         {
//             title: "Playground",
//             url: "#",
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: "History",
//                     url: "#",
//                 },
//                 {
//                     title: "Starred",
//                     url: "#",
//                 },
//                 {
//                     title: "Settings",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Models",
//             url: "#",
//             icon: Bot,
//             items: [
//                 {
//                     title: "Genesis",
//                     url: "#",
//                 },
//                 {
//                     title: "Explorer",
//                     url: "#",
//                 },
//                 {
//                     title: "Quantum",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Documentation",
//             url: "#",
//             icon: BookOpen,
//             items: [
//                 {
//                     title: "Introduction",
//                     url: "#",
//                 },
//                 {
//                     title: "Get Started",
//                     url: "#",
//                 },
//                 {
//                     title: "Tutorials",
//                     url: "#",
//                 },
//                 {
//                     title: "Changelog",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Settings",
//             url: "#",
//             icon: Settings2,
//             items: [
//                 {
//                     title: "General",
//                     url: "#",
//                 },
//                 {
//                     title: "Team",
//                     url: "#",
//                 },
//                 {
//                     title: "Billing",
//                     url: "#",
//                 },
//                 {
//                     title: "Limits",
//                     url: "#",
//                 },
//             ],
//         },
//     ],
//     navSecondary: [
//         {
//             title: "Support",
//             url: "#",
//             icon: LifeBuoy,
//         },
//         {
//             title: "Feedback",
//             url: "#",
//             icon: Send,
//         },
//     ],
//     projects: [
//         {
//             name: "Design Engineering",
//             url: "#",
//             icon: Frame,
//         },
//         {
//             name: "Sales & Marketing",
//             url: "#",
//             icon: PieChart,
//         },
//         {
//             name: "Travel",
//             url: "#",
//             icon: Map,
//         },
//     ],
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const routes = useContext(routesContext);
    const user = useContext(usersContext);

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Acme Inc
                                    </span>
                                    <span className="truncate text-xs">
                                        Enterprise
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain routes={routes} />
                {/* <NavProjects projects={data.projects} /> */}
                <NavSecondary
                    items={externalLinks.developerLinks}
                    className="mt-auto"
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
