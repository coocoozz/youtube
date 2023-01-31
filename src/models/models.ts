type VideoItemThumbnail = {
  url: string;
  width: number;
  height: number;
};

type HotVideoItem = {
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

type SearchVideoItem = Omit<HotVideoItem, "id"> & {
  id: { kind: string; videoId: string };
};

export type HotVideoItems = {
  nextPageToken: string;
  items: HotVideoItem[];
};

export type SearchVideoItems = {
  nextPageToken: string;
  items: SearchVideoItem[];
};
