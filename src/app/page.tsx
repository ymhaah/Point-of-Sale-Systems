import Link from "next/link";

async function Home() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            home
            <Link href="/Dashboard">dashboard</Link>
            <Link href="/Products">products</Link>
            <Link href="/Stock">stock</Link>
            <Link href="/Sales">sales</Link>
        </div>
    );
}
export default Home;

// ? 9/6/2025
// // TODO: the sidebar main navigation
// // TODO: main loading
// // TODO: finish the sidebar

// ? 10/6/2025
// TODO: item component
// TODO:

// route
// main -> /
// dashboard (main dashboard) -> /dashboard
// products (item details) -> /products/[id]
// Stock Management (Stock details) -> /stock/[id]
// Sales (Sales details) -> /sales/[id]

// TODO: use better naming for the sidebar components
// TODO: logo and name
