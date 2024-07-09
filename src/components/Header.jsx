"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                        <Link href="/leaderboard" className="text-sm font-medium hover:underline" prefetch={false}>
                            Leaderboard
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="outline">Sign In</Button>
                        <Button>Sign Up</Button>
                    </div>
                    <button
                        className="md:hidden flex items-center focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? (
                            <CloseIcon className="h-6 w-6" />
                        ) : (
                            <HamburgerIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
                {menuOpen && (
                    <nav className="md:hidden flex flex-col items-center gap-4 py-4">
                        <Link href="/" className="text-sm font-medium hover:underline" prefetch={false}>
                            Home
                        </Link>
                        <Link href="/leaderboard" className="text-sm font-medium hover:underline" prefetch={false}>
                            Leaderboard
                        </Link>
                        <Button variant="outline" className="w-full">Sign In</Button>
                        <Button className="w-full">Sign Up</Button>
                    </nav>
                )}
            </header>
        </div>
    );
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
    );
}

function HamburgerIcon(props) {
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
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    );
}

function CloseIcon(props) {
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
