export default function Loading() {
  return (
    <main className="min-h-screen bg-charcoal text-ivory px-4 sm:px-6 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 smoky-loader-bg" />
      <div className="relative z-10 w-full max-w-4xl text-center space-y-8 animate-smoke-reveal">
        <div className="space-y-3">
          <p className="font-serif text-4xl sm:text-6xl tracking-[0.12em]">The Royal Dreams</p>
          <p className="text-[10px] uppercase tracking-[0.32em] text-ivory/70">Preparing fragrance</p>
        </div>
        <div className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse" />
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-16 border border-ivory/10 bg-ivory/5 backdrop-blur-sm animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
