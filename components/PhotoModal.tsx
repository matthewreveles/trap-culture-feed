"use client";

import React, { useEffect } from "react";
import type { Photo } from "./PhotoGrid";

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-zinc-300 hover:text-white text-sm px-2 py-1 rounded bg-black/40 border border-zinc-700"
          onClick={onClose}
        >
          Close
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-black flex items-center justify-center p-3">
            <img
              src={photo.imageUrl}
              alt={photo.caption || "Trap Culture event photo"}
              className="max-h-[70vh] w-auto object-contain rounded"
            />
          </div>

          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-zinc-800 p-4 flex flex-col gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
                Trap Culture Archive
              </p>
              <h2 className="text-lg font-semibold">
                Trap Culture Event Photo
              </h2>
            </div>

            {photo.created_time && (
              <p className="text-xs text-zinc-400">
                Posted{" "}
                {new Date(photo.created_time).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}

            {photo.caption && (
              <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                {photo.caption}
              </p>
            )}

            {photo.link && (
              <a
                href={photo.link}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center text-xs text-sky-400 hover:text-sky-300 underline"
              >
                View on Facebook
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
