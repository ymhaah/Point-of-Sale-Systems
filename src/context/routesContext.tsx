"use client";
import { createContext } from "react";
import type routeT from "@ts/routeT";
import routes from "@data/routes.ts";

const routesContext = createContext<routeT[]>([]);

function RoutesProvider({ children }: { children: React.ReactNode }) {
    return (
        <routesContext.Provider value={routes}>
            {children}
        </routesContext.Provider>
    );
}

export { routesContext, RoutesProvider };
