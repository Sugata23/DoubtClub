import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="w-full h-screen flex items-center bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl text-primary-foreground">
              Elevate Your Debate Performance
            </h1>
          </div>
          <div className="flex flex-col items-start space-y-6">
            <p className="text-primary-foreground md:text-xl">
              Unlock your full potential with our comprehensive scoring and feedback platform for debate competitions.
            </p>
            <p className="text-primary-foreground md:text-xl">
                Experience an interactive scoreboard with drag-and-drop ranking, detailed platform and debate scores, and personalized feedback features.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/leaderboard"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get Started
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-transparent px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}