"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div>
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((src) => (
            <div
              className="relative min-w-0 flex-[0_0_100%] aspect-square"
              key={src}
            >
              <Image
                src={src}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          className="rounded border p-2"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="rounded border p-2"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
