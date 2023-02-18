import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useYoutube } from "../context/youtubeContext";
import { VideoItems } from "../models/models";

export default function Videos() {
  const { keyword } = useParams();
  const youtube = useYoutube();
  const {
    data: videoItems,
    isError,
    error,
    isLoading,
  } = useQuery<VideoItems, Error>({
    queryKey: ["videos", keyword],
    queryFn: () => {
      if (keyword) {
        return youtube.searchVideos(keyword);
      } else {
        return youtube.mostPopularVideos();
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>{`errors occured... ${error}`}</p>;
  }
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
