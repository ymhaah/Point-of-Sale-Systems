import type routeT from "@ts/routeT";

import { LayoutDashboard, Package, Boxes, BarChart3 } from "lucide-react";

const routes: routeT[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        type: "link",
        level: 0,
        isOpened: false,
    },
    {
        title: "Products",
        url: "/Products",
        icon: Package,
        type: "link",
        level: 0,
        isOpened: false,
    },
    {
        title: "Stock Management",
        url: "/Stock",
        icon: Boxes,
        type: "link",
        level: 0,
        isOpened: false,
    },
    {
        title: "Sales",
        url: "/Sales",
        icon: BarChart3,
        type: "link",
        level: 0,
        isOpened: false,
    },
];

export default routes;
