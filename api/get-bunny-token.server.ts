export const config = {
  runtime: "edge",
};

const LIBRARY_ID = "425843";
const BUNNY_API_KEY = process.env.BUNNY_STREAM_API_KEY!;

export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Parse raw JSON from edge
    const rawText = await req.text();
    const body = JSON.parse(rawText || "{}");

    const { videoId } = body;

    if (!videoId) {
      return new Response(JSON.stringify({ error: "Missing videoId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Setup HMAC signing
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

    // ✅ Return quickly
    return new Response(JSON.stringify({ signedUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("🔥 FINAL ERROR in Edge Function:", err.message || err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
