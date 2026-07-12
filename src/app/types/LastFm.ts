export type LastFmText = {
  "#text"?: string;
};

export type LastFmImage = {
  "#text"?: string;
  size?: string;
};

export type LastFmTrack = {
  name?: string;
  artist?: LastFmText | string;
  album?: LastFmText | string;
  image?: LastFmImage[];
  url?: string;
  "@attr"?: {
    nowplaying?: string;
  };
};

export type LastFmRecentTracksResponse = {
  recenttracks?: {
    track?: LastFmTrack[];
  };
};
