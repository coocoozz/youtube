import {
  VideoItems,
  SearchVideoItems,
  ChannelItems,
  RelativeVideoItems,
} from "./../models/models";
import { AxiosResponse } from "axios";

interface Client {
  mostPopularVideos(maxResults: number): Promise<AxiosResponse<VideoItems>>;

  searchVideos(
    keyword: string,
    maxResults: number
  ): Promise<AxiosResponse<SearchVideoItems>>;

  channelInfo(channelId: string): Promise<AxiosResponse<ChannelItems>>;

  relativeVideos(
    videoId: string,
    maxResults: number
  ): Promise<AxiosResponse<SearchVideoItems>>;
}

export class Youtube {
  private client;

  constructor(client: Client) {
    this.client = client;
  }

  async mostPopularVideos(): Promise<VideoItems> {
    try {
      const { data, status } = await this.client.mostPopularVideos(25);

      if (status !== 200) {
        throw new Error(`fail to get hot videos. status code:${status}`);
      }
      return data;
    } catch (e) {
      throw new Error(`fail to get hot videos. err:${e}`);
    }
  }

  async searchVideos(keyword: string): Promise<VideoItems> {
    try {
      const { data, status } = await this.client.searchVideos(keyword, 25);

      if (status !== 200) {
        throw new Error(`fail to get search videos. status code:${status}`);
      }

      return {
        ...data,
        items: data.items.map((i) => ({ ...i, id: i.id.videoId })),
      };
    } catch (e) {
      throw new Error(`fail to get search videos. err:${e}`);
    }
  }

  async channelInfo(channelId: string): Promise<ChannelItems> {
    try {
      const { data, status } = await this.client.channelInfo(channelId);

      if (status !== 200) {
        throw new Error(`fail to get channel items. status code:${status}`);
      }
      return data;
    } catch (e) {
      throw new Error(`fail to get channel items. err:${e}`);
    }
  }

  async relativeVideos(videoId: string): Promise<RelativeVideoItems> {
    try {
      const { data, status } = await this.client.relativeVideos(videoId, 25);

      if (status !== 200) {
        throw new Error(`fail to get relative videos. status code:${status}`);
      }

      return {
        ...data,
        itmes: data.items.map((i) => ({ ...i, id: i.id.videoId })),
      };
    } catch (e) {
      throw new Error(`fail to get relative videos. err:${e}`);
    }
  }
}
