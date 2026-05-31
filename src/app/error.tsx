"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-ivory pt-32 pb-20 px-4 sm:px-6 flex items-center">
      <div className="max-w-xl mx-auto text-center space-y-5">
        <p className="text-[10px] uppercase tracking-widest text-saffron font-semibold">Something paused</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">The Royal Dreams is still here.</h1>
        <p className="text-sm text-charcoal/65 leading-relaxed">
          The page could not load cleanly, but you can try again without landing on a blank screen.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 bg-charcoal text-ivory text-[10px] font-semibold uppercase tracking-widest hover:bg-saffron transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
