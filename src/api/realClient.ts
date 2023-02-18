import { ChannelItems, SearchVideoItems, VideoItems } from "./../models/models";
import axios, { AxiosResponse } from "axios";

export class RealClient {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        key: process.env.REACT_APP_YOUTUBE_KEY,
      },
    });
  }

  mostPopularVideos(maxResults: number): Promise<AxiosResponse<VideoItems>> {
    return this.client.get<VideoItems>("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: maxResults,
      },
    });
  }

  searchVideos(
    keyword: string,
    maxResults: number
  ): Promise<AxiosResponse<SearchVideoItems>> {
    return this.client.get<SearchVideoItems>("search", {
      params: {
        part: "snippet",
        q: keyword,
        maxResults: maxResults,
      },
    });
  }

  channelInfo(channelId: string): Promise<AxiosResponse<ChannelItems>> {
    return this.client.get<ChannelItems>("channels", {
      params: {
        part: "snippet",
        id: channelId,
      },
    });
  }

  relativeVideos(
    videoId: string,
    maxResults: number
  ): Promise<AxiosResponse<SearchVideoItems>> {
    return this.client.get<SearchVideoItems>("search", {
      params: {
        part: "snippet",
        relatedToVideoId: videoId,
        type: "video",
        maxResults: maxResults,
      },
    });
  }
}
