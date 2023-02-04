import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    <section className="flex flex-col lg:flex-row gap-3 ">
      <article className="basis-3/4">
        <iframe
          title="kwang"
          id="ytplayer"
          className="w-full"
          height="700"
          src={`https://www.youtube.com/embed/${video.id}?fs=1&autoplay=1`}
        ></iframe>
        <div>
          <p>{video.snippet.title}</p>
          <div>
            {channelItems ? (
              <img
                src={channelItems.items[0].snippet.thumbnails.default.url}
                alt="channel img"
              />
            ) : (
              <p>C</p>
            )}
            <p>{video.snippet.channelTitle}</p>
          </div>
          <pre className="whitespace-pre-wrap">{video.snippet.description}</pre>
        </div>
      </article>
      <article className="basis-1/4">
        {relVideoItems && (
          <ul>
            {relVideoItems.itmes.map((video) => (
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
        )}
      </article>
    </section>
  );
}
