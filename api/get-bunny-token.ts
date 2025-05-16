// File: /api/get-bunny-token.ts

const LIBRARY_ID = "425843";
const BUNNY_API_KEY = process.env.BUNNY_STREAM_API_KEY!;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const expires = Math.floor(Date.now() / 1000) + 60;
    const path = `/${LIBRARY_ID}/${videoId}`;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(BUNNY_API_KEY),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(path + expires)
    );

    const base64 = Buffer.from(new Uint8Array(signature))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const signedUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}?token=${base64}&expires=${expires}`;

    return res.status(200).json({ signedUrl });
  } catch (err: any) {
    console.error("🔥 Error in Bunny Token API:", err.message || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
