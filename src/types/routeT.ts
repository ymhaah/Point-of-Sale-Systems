import { type LucideIcon } from "lucide-react";

export type routeT = {
    title: string;
    url?: string;
    icon?: LucideIcon;
    type?: "link" | "group";
    level?: number;
    subRoutes?: routeT[];
    isOpened?: boolean;
};
