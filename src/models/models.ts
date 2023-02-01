type VideoItemThumbnail = {
  url: string;
  width: number;
  height: number;
};

type VideoItem = {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: VideoItemThumbnail;
      medium: VideoItemThumbnail;
      high: VideoItemThumbnail;
    };
    channelTitle: string;
    publishTime: string;
  };
};

type SearchVideoItem = Omit<VideoItem, "id"> & {
  id: { kind: string; videoId: string };
};

export type SearchVideoItems = {
  nextPageToken: string;
  items: SearchVideoItem[];
};

export type VideoItems = {
  nextPageToken: string;
  items: VideoItem[];
};
