import { useEffect, useState } from "react";
import { YoutubeAPI } from "../api/youtube";
import { SearchVideoItems } from "../models/models";

export default function Videos() {
  const [videoItems, setVideoItems] = useState<SearchVideoItems | undefined>();

  useEffect(() => {
    const api = new YoutubeAPI();

    api
      .getSearchVideos("aa")
      .then((videoItems) => {
        setVideoItems(videoItems);
      })
      .catch((e) => console.log(e));
  }, []);

  if (!videoItems) {
    return <p>no items...</p>;
  }

  return (
    <ul>
      {videoItems.items.map((item) => (
        <li key={item.id.videoId}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <p>Video Id: {item.id.videoId}</p>
          <p>PublishedAt: {item.snippet.publishedAt}</p>
          <p>Channel Title: {item.snippet.channelTitle}</p>
          <p>Title: {item.snippet.title}</p>
        </li>
      ))}
    </ul>
  );
}
