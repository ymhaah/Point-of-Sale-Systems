"use client";

import type { routeT } from "@types/routeT.ts";

import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ routes }: { routes: routeT[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {routes.map((route) => (
                    <Collapsible
                        key={route.title}
                        asChild
                        defaultOpen={route.isOpened}
                    >
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={route.title}>
                                <a href={route.url}>
                                    {route.icon && (
                                        <route.icon className="h-4 w-4" />
                                    )}
                                    <span>{route.title}</span>
                                </a>
                            </SidebarMenuButton>
                            {route.subRoutes?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">
                                                Toggle
                                            </span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {route.subRoutes?.map(
                                                (subRoute) => (
                                                    <SidebarMenuSubItem
                                                        key={subRoute.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <a
                                                                href={
                                                                    subRoute.url
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        subRoute.title
                                                                    }
                                                                </span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            )}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
