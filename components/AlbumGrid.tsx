// app/components/AlbumGrid.tsx
'use client';

import Link from 'next/link';

export type AlbumCardData = {
  id: string;
  name: string;
  coverUrl: string;
  count: number;
  created_time?: string | null;
};

interface AlbumGridProps {
  albums: AlbumCardData[];
}

function formatDate(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6">
      {albums.map((album) => {
        const dateLabel = formatDate(album.created_time);
        const photosLabel =
          album.count === 1 ? '1 PHOTO' : `${album.count} PHOTOS`;

        return (
          <Link
            key={album.id}
            href={`/events/albums/${album.id}?name=${encodeURIComponent(
              album.name,
            )}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-zinc-900/80 shadow-md ring-1 ring-zinc-800/80 transition hover:-translate-y-1 hover:bg-zinc-900 hover:shadow-2xl hover:ring-zinc-500/40"
          >
            <div className="relative w-full overflow-hidden">
              <div className="aspect-square">
                {album.coverUrl ? (
                  <img
                    src={album.coverUrl}
                    alt={album.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs text-zinc-500">
                    No cover image
                  </div>
                )}
              </div>

              {/* bottom gradient overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent px-4 pb-3 pt-10 text-left text-[11px] sm:text-xs">
                <div className="line-clamp-2 text-[13px] font-semibold tracking-tight text-white sm:text-sm">
                  {album.name}
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] font-medium text-gray-300/90 sm:text-[11px]">
                  <span>{dateLabel}</span>
                  <span>{photosLabel}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
