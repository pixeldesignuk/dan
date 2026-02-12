import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 text-6xl font-bold text-brand-blue">404</h1>
          <h2 className="heading-2 mb-4">Page Not Found</h2>
          <p className="mb-8 text-ink-light">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
            been moved or doesn&apos;t exist.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-primary">
              Go Home
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
