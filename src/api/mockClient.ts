import axios, { AxiosResponse } from "axios";
import { ChannelItems, SearchVideoItems, VideoItems } from "../models/models";

export class MockClient {
  private client;

  constructor() {
    this.client = axios.create();
  }

  mostPopularVideos(maxResults: number): Promise<AxiosResponse<VideoItems>> {
    return this.client.get<VideoItems>("/mock_data/hotVideos.json");
  }

  searchVideos(
    keyword: string,
    maxResults: number
  ): Promise<AxiosResponse<SearchVideoItems>> {
    return this.client.get<SearchVideoItems>("/mock_data/search.json");
  }

  channelInfo(channelId: string): Promise<AxiosResponse<ChannelItems>> {
    return this.client.get<ChannelItems>("/mock_data/channel.json");
  }

  relativeVideos(
    videoId: string,
    maxResults: number
  ): Promise<AxiosResponse<SearchVideoItems>> {
    return this.client.get<SearchVideoItems>("/mock_data/relativeVideos.json");
  }
}
