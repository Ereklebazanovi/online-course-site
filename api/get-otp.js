export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Manually parse body (Vercel sometimes doesn't do it for us)
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const bodyString = Buffer.concat(buffers).toString();
    const body = JSON.parse(bodyString);

    const videoId = body.videoId;

    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const response = await fetch(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      {
        method: "POST",
        headers: {
          Authorization: `Apisecret ${process.env.VDOCIPHER_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ttl: 300 }),
      }
    );

    const data = await response.json();

    if (data.otp && data.playbackInfo) {
      return res.status(200).json({
        otp: data.otp,
        playbackInfo: data.playbackInfo,
      });
    } else {
      console.error("Unexpected VdoCipher response:", data);
      return res
        .status(500)
        .json({ error: "OTP fetch failed", details: data });
    }
  } catch (err) {
    console.error("OTP Fetch Error:", err);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
}
