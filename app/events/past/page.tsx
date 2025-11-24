"use client";

import { useEffect, useState, useCallback } from "react";
import PhotoGrid from "@/components/PhotoGrid";
import PhotoModal from "@/components/PhotoModal";

interface Photo {
  id: string;
  caption: string;
  created_time: string | null;
  imageUrl: string;
  width: number;
  height: number;
  link: string | null;
}

export default function PastEventsPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null);

  const fetchPhotos = useCallback(async (cursor?: string | null) => {
    try {
      setLoading(true);
      const url = cursor
        ? `/api/events/photos?cursor=${cursor}`
        : `/api/events/photos`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.success && Array.isArray(json.photos)) {
        setPhotos((prev) => [...prev, ...json.photos]);

        if (json.paging && json.paging.nextCursor) {
          setNextCursor(json.paging.nextCursor);
        } else {
          setNextCursor(null);
        }
      }
    } catch (err) {
      console.error("Failed to load photos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial batch
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Infinite scroll trigger
  useEffect(() => {
    const onScroll = () => {
      if (loading || !nextCursor) return;

      const buffer = 400; // px before bottom
      if (window.innerHeight + window.scrollY + buffer >= document.body.offsetHeight) {
        fetchPhotos(nextCursor);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, nextCursor, fetchPhotos]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-2">
          Trap Culture Archive
        </p>

        <h1 className="text-4xl font-semibold mb-4">
          Past Trap Culture Events
        </h1>

        <p className="text-zinc-300 mb-8 max-w-2xl leading-relaxed">
          A running archive of Trap Culture events — pool parties, night shoots,
          warehouse sessions, everything. Scroll through every shot from newest
          to oldest.
        </p>

        {photos.length === 0 && !loading && (
          <p className="text-zinc-500">
            No photos found yet. Check back soon for new Trap Culture events.
          </p>
        )}

        <PhotoGrid photos={photos} onPhotoClick={setModalPhoto} />

        {loading && (
          <p className="text-center text-zinc-400 mt-6">Loading more…</p>
        )}

        {!nextCursor && photos.length > 0 && (
          <p className="text-center text-zinc-500 mt-8">
            End of archive — more updates soon.
          </p>
        )}
      </div>

      {modalPhoto && (
        <PhotoModal
          photo={modalPhoto}
          onClose={() => setModalPhoto(null)}
        />
      )}
    </div>
  );
}
