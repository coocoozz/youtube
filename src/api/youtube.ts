import { SearchVideoItems } from "./../models/models";
import axios from "axios";
import { HotVideoItems } from "../models/models";

export class YoutubeAPI {
  private youbueInstant;

  constructor() {
    this.youbueInstant = axios.create();
  }

  async getHotVideos(): Promise<HotVideoItems> {
    try {
      const { data, status } = await this.youbueInstant.get<HotVideoItems>(
        "mock_data/hotVideos.json"
      );

      if (status !== 200) {
        throw Error(`fail to get hot videos. status code:${status}`);
      }
      return data;
    } catch (e) {
      throw Error(`fail to get hot videos. err:${e}`);
    }
  }

  async getSearchVideos(keyword: string): Promise<SearchVideoItems> {
    try {
      const { data, status } = await this.youbueInstant.get<SearchVideoItems>(
        "mock_data/search.json"
      );

      if (status !== 200) {
        throw Error(`fail to get search videos. status code:${status}`);
      }
      return data;
    } catch (e) {
      throw Error(`fail to get search videos. err:${e}`);
    }
  }
}
