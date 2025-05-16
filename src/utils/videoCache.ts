const signedUrlCache = new Map<string, string>();

export function getSignedUrl(id: string): string | undefined {
  return signedUrlCache.get(id);
}

export function setSignedUrl(id: string, url: string): void {
  signedUrlCache.set(id, url);
}
