import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useYoutubeContext } from "../context/youtubeContext";
import { VideoItems } from "../models/models";

export default function Videos() {
  const { keyword } = useParams();
  const [videoItems, setVideoItems] = useState<VideoItems | undefined>();
  const youtube = useYoutubeContext();

  useEffect(() => {
    console.log(`rendering!!!. keyword:${keyword}`);

    if (keyword) {
      youtube
        .getSearchVideos(keyword)
        .then((videoItems) => {
          setVideoItems(videoItems);
        })
        .catch((e) => console.log(e));
    } else {
      youtube
        .getHotVideos()
        .then((videoItems) => {
          setVideoItems(videoItems);
        })
        .catch((e) => console.log(e));
    }
  }, [keyword, youtube]);

  if (!videoItems) {
    return <p>no items...</p>;
  }

  return (
    <ul>
      {videoItems.items.map((item) => (
        <li key={item.id}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <p>Video Id: {item.id}</p>
          <p>Title: {item.snippet.title}</p>
        </li>
      ))}
    </ul>
  );
}
