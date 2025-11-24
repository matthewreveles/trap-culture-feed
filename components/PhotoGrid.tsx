// components/PhotoGrid.tsx
"use client";

import Image from "next/image";

export type Photo = {
  id: string;
  caption: string;
  created_time: string | null;
  imageUrl: string;
  width: number;
  height: number;
  link: string | null;
};

type Props = {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
};

export default function PhotoGrid({ photos, onPhotoClick }: Props) {
  if (!photos.length) {
    return null;
  }

  return (
    <div className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-4">
      {photos.map((photo) => (
        <button
          key={photo.id}
          type="button"
          onClick={() => onPhotoClick(photo)}
          className="group overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 hover:ring-zinc-500 transition"
        >
          <div className="relative aspect-square">
            <Image
              src={photo.imageUrl}
              alt={photo.caption || "Trap Culture event photo"}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
