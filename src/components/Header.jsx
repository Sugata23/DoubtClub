import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <div className="flex flex-col">
            <header className="bg-background sticky top-0 z-50 border-b">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2" prefetch={false}>
                        <MountainIcon className="h-6 w-6" />
                        <span className="font-bold text-lg">Debate Club</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:underline" prefetch={false}>
                            Home
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                            Participants
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                            Judges
                        </Link>
                        <Link href="/leaderboard" className="text-sm font-medium hover:underline" prefetch={false}>
                            Leaderboard
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="outline">Sign In</Button>
                        <Button>Sign Up</Button>
                    </div>
                </div>
            </header>
        </div>
    )
}

function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}
