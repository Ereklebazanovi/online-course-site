// File: /api/get-bunny-token.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const BUNNY_API_KEY = process.env.BUNNY_STREAM_API_KEY!;
const LIBRARY_ID = "425843";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Fix: req.body might be undefined, so we handle manually
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers).toString();
    const body = JSON.parse(rawBody);

    const { videoId } = body;

    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const expires = Math.floor(Date.now() / 1000) + 60;
    const path = `/${LIBRARY_ID}/${videoId}`;
    const token = crypto
      .createHmac("sha256", BUNNY_API_KEY)
      .update(path + expires)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const signedUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}?token=${token}&expires=${expires}`;

    return res.status(200).json({ signedUrl });
  } catch (err) {
    console.error("Error in token handler:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
