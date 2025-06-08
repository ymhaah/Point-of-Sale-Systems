import Link from "next/link";

function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            home
            <Link href="/dashboard">dashboard</Link>
        </div>
    );
}
export default Home;
