// const HeroVideo = () => (
//     <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
//       <iframe
//         src="https://www.youtube.com/embed/Mg9yzpeICo4"
//         title="Welcome to the Alternative World"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         className="w-full h-full"
//       />
//     </div>
//   );

//   export default HeroVideo;

// HeroVideo.tsx
import { useEffect, useState } from "react";

const VIDEO_ID = "271da1d30e6662341409aa73fb9ac1e5"; 

const HeroVideo = () => {
  const [otp, setOtp] = useState("");
  const [playbackInfo, setPlaybackInfo] = useState("");

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const response = await fetch("http://localhost:4000/get-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: VIDEO_ID }),
        });
        const data = await response.json();
        setOtp(data.otp);
        setPlaybackInfo(data.playbackInfo);
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
    };

    fetchOtp();
  }, []);

  if (!otp || !playbackInfo) {
    return <p className="text-center p-4">Loading secure video...</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
        style={{ border: 0 }}
        allow="encrypted-media"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default HeroVideo;
