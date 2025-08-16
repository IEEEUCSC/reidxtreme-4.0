import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-background relative flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/img/logo.png"
            alt="ReidXtreme 4.0 Logo"
            width={200}
            height={200}
            className="h-auto w-48 md:w-56"
            priority
          />
        </div>

        {/* Logo/Title */}
        <h1 className="text-foreground mb-6 text-4xl font-bold md:text-6xl">
          ReidXtreme 4.0
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground mb-8 text-lg md:text-xl">
          Premier Competitive Programming Challenge
        </p>

        {/* Coming Soon Message */}
        <div className="bg-card border-border mb-8 rounded-2xl border p-6 md:p-8">
          <h2 className="text-foreground mb-4 text-2xl font-semibold md:text-3xl">
            We're Still Cooking!
          </h2>
          <p className="text-muted-foreground mb-6 text-base md:text-lg">
            Our official website is under construction, but the excitement is
            already building! Want to register for the{" "}
            <strong>ReidXtreme 4.0 Initial Round</strong> and our exclusive{" "}
            <strong>Workshop</strong>?
          </p>

          {/* Registration Button */}
          <Link
            href="/registrations"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200 md:text-lg"
          >
            Register Now
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-muted-foreground text-sm">
          <p className="mb-2">
            Organized by{" "}
            <span className="font-medium">IEEE Student Branch of UCSC</span> and{" "}
            <span className="font-medium">ACM Student Chapter</span>
          </p>
        </div>
      </div>
    </main>
  );
}
