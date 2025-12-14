// app/demo/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type FeedPhoto = {
  id: string;
  src: string;
  alt?: string;
  timestamp?: string;
};

export default function FeedDemoPage() {
  const [photos, setPhotos] = useState<FeedPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      try {
        // Reuse your existing feed endpoint
        const res = await fetch("/api/feed", { cache: "no-store" });
        const data = await res.json();

        // Adjust key if your API uses a different shape
        setPhotos(data.photos || []);
      } catch (err) {
        console.error("Failed to load feed demo", err);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
  <h1 className="text-xl font-medium tracking-tight">
    Trap Culture Feed — Demo View
  </h1>

  <p className="mt-2 max-w-2xl text-sm text-neutral-400">
    This is a demo view of the Trap Culture feed engine. To see the feed in its
    full, interactive context, visit the{" "}
    <a
      href="https://trapcultureaz.com/app"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white underline underline-offset-4 hover:text-neutral-300"
    >
      Trap Culture app
    </a>
    .
  </p>
</header>
        {loading ? (
          <p className="text-sm text-neutral-400">Loading feed…</p>
        ) : photos.length === 0 ? (
          <p className="text-sm text-neutral-400">
            No photos available for demo view.
          </p>
        ) : (
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-900"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt || "Trap Culture event photo"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {photo.timestamp && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <p className="text-xs text-neutral-200">
                      {photo.timestamp}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
