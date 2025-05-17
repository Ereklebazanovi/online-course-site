import { useQuery } from "@tanstack/react-query";
import { fetchBunnyVideoUrl } from "../../../api/fetchBunnyVideoUrl";

export const useBunnyVideoUrl = (videoId?: string) => {
  return useQuery({
    queryKey: ["bunny-video", videoId],
    queryFn: () => fetchBunnyVideoUrl(videoId!),
    enabled: !!videoId, // only run if videoId exists
    staleTime: 60 * 1000, // 1 minute caching
    retry: 1, // retry once on failure
  });
};
