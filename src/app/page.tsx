"use client";

import Link from "next/link";

function Home() {
    return (
        <main className="Dashboard | flex min-h-screen flex-col space-y-4 p-4 md:p-8">
            <Link href="/">dashboard</Link>
            <Link href="/Products">products</Link>
            <Link href="/Stock">stock</Link>
            <Link href="/Sales">sales</Link>
        </main>
    );
}
export default Home;

// ? 9/6/2025
// // TODO: the sidebar main navigation
// // TODO: main loading
// // TODO: finish the sidebar

// ? 11/6/2025
// // TODO: next page route for the item details
// //  TODO: input types

// ? 12/6/2025
// TODO:

// route
// main -> /
// dashboard (main dashboard) -> /
// products (item details) -> /products/[id]
// Stock Management (Stock details) -> /stock/[id]
// Sales (Sales details) -> /sales/[id]

// TODO: use better naming for the sidebar components
// TODO: logo and name
