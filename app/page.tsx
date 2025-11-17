"use client";

import { useEffect, useState } from "react";

interface Photo {
  id: string;
  images?: { source: string }[];
  link?: string;
  name?: string;
}

export default function HomePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();

        if (data.error) {
          setError(JSON.stringify(data.details, null, 2));
          setLoading(false);
          return;
        }

        setPhotos(data.data || []);
      } catch (err) {
        setError(String(err));
      }

      setLoading(false);
    }

    loadPhotos();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Trap Culture Feed</h1>

      {loading && <p className="text-gray-500">Loading photos…</p>}

      {error && (
        <pre className="bg-red-900 text-red-200 p-4 rounded-lg text-sm overflow-auto">
          {error}
        </pre>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {photos.map((photo) => {
          const bestImage = photo.images?.[0]?.source;
          if (!bestImage) return null;

          return (
            <a
              key={photo.id}
              href={photo.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border border-neutral-800 bg-black"
            >
              <img
                src={bestImage}
                alt={photo.name || "Trap Culture Photo"}
                className="w-full h-auto object-cover"
              />
            </a>
          );
        })}
      </div>
    </main>
  );
}
