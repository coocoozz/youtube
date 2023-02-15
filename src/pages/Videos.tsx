import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useYoutube } from "../context/youtubeContext";
import { VideoItems } from "../models/models";

export default function Videos() {
  const { keyword } = useParams();
  const [videoItems, setVideoItems] = useState<VideoItems | undefined>();
  const youtube = useYoutube();

  useEffect(() => {
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
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 gap-y-4">
      {videoItems.items.map((video) => (
        <VideoCard video={video} />
      ))}
    </ul>
  );
}
