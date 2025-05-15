import { FC, useEffect, useState } from "react";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

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

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!bunnyVideoId || isLocked) return;

      try {
        let signedUrl: string | null = null;

        // 👇 In local dev mode, return a dummy signed URL
        if (import.meta.env.DEV) {
          const expires = Math.floor(Date.now() / 1000) + 60;
          signedUrl = `https://iframe.mediadelivery.net/embed/425843/${bunnyVideoId}?token=dev-debug-token&expires=${expires}`;
        } else {
          const res = await fetch("/api/get-bunny-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId: bunnyVideoId }),
          });

          const text = await res.text();
          console.log("🔁 Raw response text:", text);

          let data;
          try {
            data = JSON.parse(text);
          } catch (err) {
            console.error("❌ Failed to parse JSON:", err);
            setError("Invalid response from server");
            return;
          }

          if (data?.signedUrl) {
            signedUrl = data.signedUrl;
          } else {
            setError("Failed to load secure video.");
            return;
          }
        }

        setSignedUrl(signedUrl);
      } catch (err) {
        console.error("Signed URL error", err);
        setError("Something went wrong loading the video.");
      }
    };

    fetchSignedUrl();
  }, [bunnyVideoId, isLocked]);

  if (switching) {
    return (
      <div className="aspect-video bg-gray-100 animate-pulse rounded-xl" />
    );
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
