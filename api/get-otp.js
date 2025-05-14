// api/get-otp.js
export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: "Missing videoId" });
  }

  const secretKey = process.env.VDOCIPHER_SECRET;
  const axios = require("axios");

  try {
    const response = await axios.post(
      "https://dev.vdocipher.com/api/videos/otp",
      {
        videoId: videoId,
      },
      {
        headers: {
          Authorization: `Apisecret ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { otp, playbackInfo } = response.data;
    return res.status(200).json({ otp, playbackInfo });
  } catch (error) {
    console.error("OTP error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to get OTP" });
  }
}
