// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post("/get-otp", async (req, res) => {
    console.log("Received request for OTP:", req.body.videoId); // ✅ Add this

  try {
    const videoId = req.body.videoId;
    const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
      method: "POST",
      headers: {
        Authorization: `Apisecret ${process.env.VDOCIPHER_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ttl: 300 }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("OTP Fetch Error:", err);
    res.status(500).json({ error: "OTP fetch failed" });
  }
});

app.listen(PORT, () => console.log(`OTP proxy server running on http://localhost:${PORT}`));
