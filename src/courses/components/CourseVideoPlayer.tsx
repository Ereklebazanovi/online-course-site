import { FC, useEffect, useState, useRef } from "react";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import signedUrlCache from "../../utils/videoCache";

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

const ongoingFetches = new Set<string>(); // ✅ lock map

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
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (!bunnyVideoId || isLocked) return;

    if (signedUrlCache.has(bunnyVideoId)) {
      setSignedUrl(signedUrlCache.get(bunnyVideoId)!);
      return;
    }

    if (ongoingFetches.has(bunnyVideoId)) return;
    ongoingFetches.add(bunnyVideoId);

    const fetchSignedUrl = async () => {
      try {
        const res = await fetch("/api/get-bunny-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: bunnyVideoId }),
        });

        const { signedUrl } = await res.json();

        if (isMountedRef.current && signedUrl) {
          signedUrlCache.set(bunnyVideoId, signedUrl);
          setSignedUrl(signedUrl);
        } else if (isMountedRef.current) {
          setError("Could not load secure video.");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        if (isMountedRef.current) {
          setError("Something went wrong loading the video.");
        }
      } finally {
        ongoingFetches.delete(bunnyVideoId);
      }
    };

    fetchSignedUrl();

    return () => {
      isMountedRef.current = false;
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
