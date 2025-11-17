"use client";

import { useEffect, useState } from "react";

interface Photo {
  id: string;
  picture: string;
  permalink: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/photos");
        const json = await res.json();
        console.log("PHOTO FEED RESPONSE:", json);
        setPhotos(json.data || []);
      } catch (err) {
        console.error("PHOTO FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main
      className="
        min-h-screen 
        px-6 py-10
        text-white
        bg-black
      "
    >
      <h1 className="text-4xl font-bold mb-8">Trap Culture Feed</h1>

      {/* TEMP DEBUG */}
      <div className="mb-4 text-sm text-yellow-300">
        Debug: {loading ? "Loading…" : `${photos.length} photos loaded`}
      </div>

      {!loading && photos.length === 0 && (
        <p className="text-red-400 text-lg mb-6">
          No photos returned from API.  
          (This is normal if the token is invalid or the API isn't ready yet.)
        </p>
      )}

      {/* SUNS GRADIENT BACKGROUND WRAPPER */}
      <div
        className="
          grid 
          grid-cols-3 
          md:grid-cols-4 
          gap-3 
          p-4
          rounded-xl
        "
        style={{
          background: "linear-gradient(135deg, #5A2A82 0%, #E56000 100%)",
        }}
      >
        {(photos.length === 0 ? Array.from({ length: 6 }) : photos).map(
          (photo: any, i: number) => (
            <div
              key={i}
              className="
                aspect-square 
                rounded-md
                bg-black/40
                border-2
                border-white/30
                flex items-center justify-center
                text-xs
                overflow-hidden
              "
            >
              {photo?.picture ? (
                <img
                  src={photo.picture}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                "Placeholder"
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
}
