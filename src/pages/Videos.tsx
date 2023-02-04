import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useYoutube } from "../context/youtubeContext";
import { VideoItems } from "../models/models";

export default function Videos() {
  const { keyword } = useParams();
  const [videoItems, setVideoItems] = useState<VideoItems | undefined>();
  const youtube = useYoutube();
  const navigate = useNavigate();

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
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
      {videoItems.items.map((video) => (
        <li
          key={video.id}
          onClick={() => {
            navigate(`/videos/watch/${video.id}`, {
              state: { video },
            });
          }}
        >
          <img src={video.snippet.thumbnails.medium.url} alt="" />
          <p>Video Id: {video.id}</p>
          <p>Title: {video.snippet.title}</p>
        </li>
      ))}
    </ul>
  );
}
