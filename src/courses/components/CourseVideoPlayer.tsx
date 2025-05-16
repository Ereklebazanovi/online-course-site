import { FC, useEffect, useRef, useState } from "react";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getSignedUrl, setSignedUrl } from "../../utils/videoCache";

interface Props {
  title: string;
  isLocked: boolean;
  switching: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  bunnyVideoId?: string;
}

const CourseVideoPlayer: FC<Props> = ({
  title,
  isLocked,
  switching,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  bunnyVideoId,
}) => {
  const [signedUrl, setSignedUrlState] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef<Set<string>>(new Set());
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    if (!bunnyVideoId || isLocked) return;

    const cached = getSignedUrl(bunnyVideoId);
    if (cached) {
      setSignedUrlState(cached);
      return;
    }

    if (isFetchingRef.current.has(bunnyVideoId)) return;
    isFetchingRef.current.add(bunnyVideoId);

    const fetchSignedUrl = async () => {
      try {
        const res = await fetch("/api/get-bunny-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: bunnyVideoId }),
        });

        const data = await res.json();

        if (isMounted.current && data?.signedUrl) {
          setSignedUrl(bunnyVideoId, data.signedUrl);
          setSignedUrlState(data.signedUrl);
        } else if (isMounted.current) {
          setError("Secure video could not be loaded.");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        if (isMounted.current)
          setError("Something went wrong loading the video.");
      }
    };

    fetchSignedUrl();

    return () => {
      isMounted.current = false;
    };
  }, [bunnyVideoId, isLocked]);

  if (switching) {
    return <div className="aspect-video bg-gray-100 animate-pulse rounded-xl" />;
  }

  if (isLocked) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-sm flex items-center gap-2 shadow-sm">
        <LockOutlined /> This lesson is locked. Please enroll to unlock.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-xl overflow-hidden shadow relative">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
            {error}
          </div>
        ) : signedUrl ? (
          <iframe
            src={signedUrl}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
            title={title}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
            Loading video...
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button icon={<LeftOutlined />} onClick={onPrev} disabled={!hasPrev}>
          Previous
        </Button>
        <Button icon={<RightOutlined />} onClick={onNext} disabled={!hasNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseVideoPlayer;
