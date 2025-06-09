import Link from "next/link";

function Products() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            home
            <Link href="/dashboard">dashboard</Link>
            <Link href="/products">products</Link>
            <Link href="/stock">stock</Link>
            <Link href="/sales">sales</Link>
        </div>
    );
}
export default Products;
