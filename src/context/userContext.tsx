"use client";
import { createContext } from "react";
import type userT from "@ts/userT.ts";
import user from "@data/user.ts";

const usersContext = createContext<userT>({
    name: "",
    email: "",
    avatar: "",
});

function UserProvider({ children }: { children: React.ReactNode }) {
    return (
        <usersContext.Provider value={user}>{children}</usersContext.Provider>
    );
}

export { usersContext, UserProvider };
