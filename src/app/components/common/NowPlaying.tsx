"use client";

import Link from "next/link";
import Image from "next/image";
import type { Track } from "@/src/app/types/Track";
import { useEffect, useState } from "react";

function TrackContent({ track }: { track: Track | null }) {
  if (!track?.nowPlaying) {
    return (
      <div className="flex items-center gap-4 justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-800 text-xs text-gray-400">
          ♪
        </div>
        <div className="min-w-0 flex flex-col">
          <p className="text-xs text-gray-500">
            I&apos;m Currently Listening To:{" "}
          </p>
          <p className="block truncate text-sm font-medium text-white">
            Nothing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 justify-center">
      <Image
        src={track.albumArt}
        alt={`${track.album} cover`}
        className="h-12 w-12 rounded-md object-cover"
        width={48}
        height={48}
      />
      <div className="min-w-0 flex flex-col">
        <p className="text-xs text-gray-500">
          I&apos;m Currently Listening To:
        </p>
        <Link
          href={track.url || "#"}
          target="_blank"
          rel="noreferrer"
          className="block truncate text-sm font-medium text-white hover:text-gray-300"
        >
          {track.title}
        </Link>
        <p className="truncate text-sm text-gray-400">{track.artist}</p>
      </div>
    </div>
  );
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function updateTrack() {
      try {
        const response = await fetch("/api/now-playing", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Track | null;

        if (isMounted) {
          setTrack(data);
        }
      } catch {
        // Keeps the current UI state if polling fails.
      }
    }

    updateTrack();

    const interval = setInterval(updateTrack, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <aside className="fixed bottom-8 right-8 z-20 rounded-xl border0 bg-black/80 px-8 py-4 shadow-lg">
      <TrackContent track={track} />
    </aside>
  );
}
