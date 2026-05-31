"use client";

import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  fallbackLabel?: string;
}

export default function SafeImage({
  src,
  alt,
  fill,
  sizes,
  className,
  fallbackLabel = "The Royal Dreams",
}: SafeImageProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-sandalwood/50 px-5 text-center">
        <div className="space-y-2">
          <span className="block font-serif text-2xl text-charcoal">The Royal Dreams</span>
          <span className="block text-[10px] font-semibold uppercase tracking-widest text-charcoal/55">
            {fallbackLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
