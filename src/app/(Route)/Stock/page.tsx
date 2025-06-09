import Link from "next/link";

async function Stock() {
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
export default Stock;
