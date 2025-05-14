import { useEffect, useState } from "react";

const VIDEO_ID = "271da1d30e6662341409aa73fb9ac1e5"; // Replace with your real video ID

const HeroVideo = () => {
  const [otp, setOtp] = useState("");
  const [playbackInfo, setPlaybackInfo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isLocal = window.location.hostname === "localhost";

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const response = await fetch(
          isLocal
            ? "https://online-course-site-eizz.vercel.app/api/get-otp"
            : "/api/get-otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId: VIDEO_ID }),
          }
        );

        const data = await response.json();
        console.log("OTP API response:", data);

        if (data.otp && data.playbackInfo) {
          setOtp(data.otp);
          setPlaybackInfo(data.playbackInfo);
        } else {
          setError("Invalid OTP response from server.");
        }
      } catch (err) {
        console.error("Failed to fetch OTP:", err);
        setError("Could not load secure video. Please try again.");
      }
    };

    fetchOtp();
  }, []);

  if (error) {
    return <p className="text-center p-4 text-red-500">{error}</p>;
  }

  if (!otp || !playbackInfo) {
    return <p className="text-center p-4">Loading secure video...</p>;
  }

  const videoUrl = `https://player.vdocipher.com/v2/?otp=${encodeURIComponent(
    otp
  )}&playbackInfo=${encodeURIComponent(playbackInfo)}`;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
      <iframe
        src={videoUrl}
        allow="encrypted-media"
        allowFullScreen
        className="w-full h-full border-0"
        title="Hero Video"
      />
    </div>
  );
};

export default HeroVideo;

// import { useEffect, useState } from "react";

// const VIDEO_ID = "271da1d30e6662341409aa73fb9ac1e5";

// const HeroVideo = () => {
//   const [otp, setOtp] = useState("");
//   const [playbackInfo, setPlaybackInfo] = useState("");

//   useEffect(() => {
//     const fetchOtp = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/get-otp", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ videoId: VIDEO_ID }),
//         });
//         const data = await response.json();
//         setOtp(data.otp);
//         setPlaybackInfo(data.playbackInfo);
//       } catch (error) {
//         console.error("Failed to fetch OTP:", error);
//       }
//     };

//     fetchOtp();
//   }, []);

//   if (!otp || !playbackInfo) {
//     return <p className="text-center p-4">Loading secure video...</p>;
//   }

//   return (
//     <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
//       <iframe
//         src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
//         style={{ border: 0 }}
//         allow="encrypted-media"
//         allowFullScreen
//         className="w-full h-full"
//       />
//     </div>
//   );
// };

// export default HeroVideo;
