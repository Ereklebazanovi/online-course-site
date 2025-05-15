export const config = {
  runtime: 'edge',
};

const BUNNY_API_KEY = process.env.BUNNY_STREAM_API_KEY!;
const LIBRARY_ID = "425843";

export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json(); // <-- This line can fail if body is empty
    const { videoId } = body;

    if (!videoId) {
      return new Response(JSON.stringify({ error: "Missing videoId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

    const base64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const signedUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}?token=${base64}&expires=${expires}`;

    return new Response(JSON.stringify({ signedUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
