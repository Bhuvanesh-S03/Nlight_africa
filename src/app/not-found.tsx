import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ivory pt-32 pb-20 px-4 sm:px-6 flex items-center">
      <div className="max-w-xl mx-auto text-center space-y-5">
        <p className="text-[10px] uppercase tracking-widest text-saffron font-semibold">Page not found</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">This fragrance trail ended.</h1>
        <p className="text-sm text-charcoal/65 leading-relaxed">
          The product or guide you opened is unavailable, so we kept the page useful instead of blank.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-charcoal text-ivory text-[10px] font-semibold uppercase tracking-widest hover:bg-saffron transition-colors"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
