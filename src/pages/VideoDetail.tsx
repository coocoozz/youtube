import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useYoutube } from "../context/youtubeContext";
import { ChannelItems, RelativeVideoItems, VideoItem } from "../models/models";

type LocationState = VideoItem;

export default function VideoDetail() {
  const video = useLocation().state.video as LocationState;
  const [relVideoItems, setRelVideoItems] = useState<
    RelativeVideoItems | undefined
  >();
  const [channelItems, setChannelItems] = useState<ChannelItems | undefined>();
  const youtube = useYoutube();

  useEffect(() => {
    youtube
      .getRelativeVideos(video.id)
      .then((v) => setRelVideoItems(v))
      .catch((e) => console.log);

    youtube
      .getChannelItems(video.snippet.channelId)
      .then((v) => setChannelItems(v))
      .catch((e) => console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.scrollTo(0, 0);

  return (
    <section className="flex flex-col space-y-10 items-start lg:flex-row lg:space-x-3">
      <article className="basis-4/6">
        <iframe
          title="kwang"
          id="ytplayer"
          className="w-full mb-5"
          height="700"
          src={`https://www.youtube.com/embed/${video.id}?fs=1&autoplay=1`}
        ></iframe>
        <div className="text-white">
          <p className="font-bold text-2xl mb-5">{video.snippet.title}</p>
          <div className="flex justify-start items-center space-x-2 mb-5">
            {channelItems ? (
              <img
                src={channelItems.items[0].snippet.thumbnails.default.url}
                alt="channel img"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <p>C</p>
            )}
            <p className="font-bold text-xl">{video.snippet.channelTitle}</p>
          </div>
          <pre className="whitespace-pre-wrap">{video.snippet.description}</pre>
        </div>
      </article>
      <article className="basis-2/6">
        {relVideoItems && (
          <ul className="space-y-5">
            {relVideoItems.itmes.map((video) => (
              <VideoCard video={video} titleRight={true} />
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
