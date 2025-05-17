export async function fetchBunnyVideoUrl(videoId: string): Promise<string> {
  try {
    const res = await fetch("/api/get-bunny-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Bunny API error:", errorData);
      throw new Error(errorData.error || "Failed to fetch Bunny video URL");
    }

    const { signedUrl } = await res.json();

    if (!signedUrl) {
      throw new Error("Signed URL not found in response.");
    }

    return signedUrl;
  } catch (err: any) {
    console.error("🔥 Failed to fetch Bunny signed URL:", err.message || err);
    throw err;
  }
}
