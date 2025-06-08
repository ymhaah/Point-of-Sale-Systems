"use client";
import { ReactNode, Fragment } from "react";

import usePathSegments from "@hooks/usePathSegments.tsx";

import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@ui/breadcrumb";
import { Separator } from "@ui/separator.tsx";
import { SidebarTrigger } from "@ui/sidebar.tsx";

import ThemeToggle from "@ui/ThemeToggle.tsx";

/**
 * Header component.
 * Renders the header with a Breadcrumb & site theme-toggle.
 * @returns {ReactNode} Rendered header component.
 */
function Header(): ReactNode {
    const urlPathSegments = usePathSegments();

    return (
        <header className="Header | w-full" aria-label="Main Site Header">
            <div className="Container | flex flex-row items-center justify-between py-5">
                <div className="Header_nav | flex flex-row items-center gap-3">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {urlPathSegments.map((segment, index) => (
                                <Fragment key={index}>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    {index === urlPathSegments.length - 1 ? (
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                {segment}
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    ) : (
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink asChild>
                                                <Link
                                                    href={`/${urlPathSegments
                                                        .slice(0, index + 1)
                                                        .join("/")}`}
                                                >
                                                    {segment}
                                                </Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    )}
                                </Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="Header_controllers | flex flex-row items-center gap-3">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;
