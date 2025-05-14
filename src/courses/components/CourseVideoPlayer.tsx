import { FC } from "react";
import { LockOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface Props {
  title: string;
  otp: string | null;
  playbackInfo: string | null;
  isLocked: boolean;
  switching: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const CourseVideoPlayer: FC<Props> = ({
  title,
  otp,
  playbackInfo,
  isLocked,
  switching,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
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
      <div className="aspect-video rounded-xl overflow-hidden shadow">
        {otp && playbackInfo ? (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${encodeURIComponent(
              otp
            )}&playbackInfo=${encodeURIComponent(playbackInfo)}`}
            allow="encrypted-media"
            allowFullScreen
            className="w-full h-full border-0"
            title={title}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm">
            Loading secure video...
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button
          icon={<LeftOutlined />}
          onClick={onPrev}
          disabled={!hasPrev}
          className="rounded-full"
        >
          Previous
        </Button>

        <Button
          icon={<RightOutlined />}
          onClick={onNext}
          disabled={!hasNext}
          className="rounded-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseVideoPlayer;
