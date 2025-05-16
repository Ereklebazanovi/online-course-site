// // File: /api/fetch-bunny-video.ts

// const LIBRARY_ID = "425843"; // ✅ Your Bunny Library ID
// const BUNNY_API_KEY = process.env.BUNNY_STREAM_API_KEY!;

// export default async function handler(req: any, res: any) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { videoUrl } = req.body;

//   if (!videoUrl) {
//     return res.status(400).json({ error: "Missing videoUrl" });
//   }

//   try {
//     const response = await fetch(
//       `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/fetch`,
//       {
//         method: "POST",
//         headers: {
//           AccessKey: BUNNY_API_KEY,
//           "Content-Type": "application/json",
//           accept: "application/json",
//         },
//         body: JSON.stringify({ url: videoUrl }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("❌ Bunny Fetch Error:", errorText);
//       return res
//         .status(response.status)
//         .json({ error: "Failed to fetch video", details: errorText });
//     }

//     const data = await response.json();

//     // ✅ Returns the Bunny videoId
//     return res.status(200).json({
//       message: "Video fetch request submitted successfully",
//       videoId: data.guid,
//     });
//   } catch (err: any) {
//     console.error("🔥 Server error:", err.message || err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
