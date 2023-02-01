import { VideoItems, SearchVideoItems } from "./../models/models";
import axios from "axios";

export class Youtube {
  private youtube;

  constructor() {
    this.youtube = axios.create();
    console.log("make youtube api");
  }

  async getHotVideos(): Promise<VideoItems> {
    try {
      const { data, status } = await this.youtube.get<VideoItems>(
        "/mock_data/hotVideos.json"
      );

      if (status !== 200) {
        throw new Error(`fail to get hot videos. status code:${status}`);
      }
      return data;
    } catch (e) {
      throw new Error(`fail to get hot videos. err:${e}`);
    }
  }

  async getSearchVideos(keyword: string): Promise<VideoItems> {
    try {
      const { data, status } = await this.youtube.get<SearchVideoItems>(
        "/mock_data/search.json"
      );

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
}
