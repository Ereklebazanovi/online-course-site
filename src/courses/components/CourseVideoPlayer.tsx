import { FC, useEffect, useRef, useState } from "react";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Alert } from "antd";

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
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!bunnyVideoId || isLocked) return;

      // ✅ Use cached signed URL if available
      if (cacheRef.current.has(bunnyVideoId)) {
        setSignedUrl(cacheRef.current.get(bunnyVideoId)!);
        return;
      }

      try {
        const res = await fetch("/api/get-bunny-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: bunnyVideoId }),
        });

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("❌ Failed to parse JSON:", err);
          setError("Invalid response from server.");
          return;
        }

        if (data?.signedUrl) {
          cacheRef.current.set(bunnyVideoId, data.signedUrl);
          setSignedUrl(data.signedUrl);
        } else {
          setError("Failed to load secure video.");
        }
      } catch (err) {
        console.error("Signed URL error:", err);
        setError("Could not fetch video. Please try again later.");
      }
    };

    fetchSignedUrl();
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
          <Alert
            message="Error loading video"
            description={error}
            type="error"
            showIcon
            className="absolute inset-0 flex items-center justify-center text-center"
          />
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
