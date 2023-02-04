type ThumbnailInfo = {
  url: string;
  width: number;
  height: number;
};

export type VideoItem = {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: ThumbnailInfo;
      medium: ThumbnailInfo;
      high: ThumbnailInfo;
    };
    channelTitle: string;
    publishTime: string;
  };
};

type ChannelItem = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: ThumbnailInfo;
      medium: ThumbnailInfo;
      high: ThumbnailInfo;
    };
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

export type ChannelItems = {
  items: ChannelItem[];
};

export type RelativeVideoItems = {
  nextPageToken: string;
  itmes: VideoItem[];
};
