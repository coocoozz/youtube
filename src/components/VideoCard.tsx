import { useNavigate } from "react-router-dom";
import { VideoItem } from "../models/models";

type VideoCardProps = {
  video: VideoItem;
  titleRight?: boolean;
};

export default function VideoCard({ video, titleRight }: VideoCardProps) {
  const navigate = useNavigate();

  return (
    <li
      key={video.id}
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, {
          state: { video },
        });
      }}
      className={`w-full flex cursor-pointer text-white ${
        titleRight ? "flex-row space-x-2" : "flex-col space-y-2"
      }`}
    >
      <img
        className={`rounded-xl ${titleRight ? "w-48" : "w-full"}`}
        src={video.snippet.thumbnails.medium.url}
        alt=""
      />
      <div className="w-full flex flex-col justify-start space-y-1">
        <p className="line-clamp-2 text-sm font-bold">{video.snippet.title}</p>
        <p className="text-xs">{video.snippet.channelTitle}</p>
      </div>
    </li>
  );
}
