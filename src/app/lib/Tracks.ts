import type { Track } from "../types/Track";
import type {
  LastFmImage,
  LastFmRecentTracksResponse,
  LastFmText,
  LastFmTrack,
} from "../types/LastFm";

const LAST_FM_API_URL = "https://ws.audioscrobbler.com/2.0/";
const LAST_FM_USERNAME = "andrewxymusic";
const RECENT_TRACKS_REVALIDATE_SECONDS = 30;

type GetRecentTracksOptions = {
  realtime?: boolean;
};

function createRecentTracksUrl(apiKey: string) {
  const params = new URLSearchParams({
    method: "user.getRecentTracks",
    user: LAST_FM_USERNAME,
    api_key: apiKey,
    format: "json",
    limit: "2",
  });

  return `${LAST_FM_API_URL}?${params.toString()}`;
}

function getTrackText(
  value: LastFmText | string | undefined,
  fallback: string,
) {
  if (typeof value === "string") {
    return value;
  }

  return value?.["#text"] ?? fallback;
}

function getAlbumArt(images: LastFmImage[] = []) {
  return (
    images.find((image) => image.size === "large")?.["#text"] ??
    images[0]?.["#text"] ??
    ""
  );
}

function isNowPlayingTrack(track: LastFmTrack) {
  return Boolean(track["@attr"]?.nowplaying);
}

function selectRecentTrack(tracks: LastFmTrack[]) {
  return tracks.find(isNowPlayingTrack) ?? tracks[0];
}

function mapLastFmTrack(track: LastFmTrack | undefined): Track | null {
  if (!track?.name) {
    return null;
  }

  return {
    title: track.name,
    artist: getTrackText(track.artist, "Unknown artist"),
    album: getTrackText(track.album, "Unknown album"),
    albumArt: getAlbumArt(track.image),
    url: track.url ?? "",
    nowPlaying: isNowPlayingTrack(track),
  };
}

export async function getRecentTracks(
  options: GetRecentTracksOptions = {},
): Promise<Track[]> {
  const apiKey = process.env.LAST_FM_API;

  if (!apiKey) {
    return [];
  }

  const response = await fetch(createRecentTracksUrl(apiKey), {
    ...(options.realtime
      ? { cache: "no-store" as const }
      : { next: { revalidate: RECENT_TRACKS_REVALIDATE_SECONDS } }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recent tracks");
  }

  const data = (await response.json()) as LastFmRecentTracksResponse;
  const selectedTrack = selectRecentTrack(data.recenttracks?.track ?? []);
  const mappedTrack = mapLastFmTrack(selectedTrack);

  if (!mappedTrack) {
    return [];
  }

  return [mappedTrack];
}
