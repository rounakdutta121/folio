/** Convert and lightly compress an image File to a data-URL string (browser). */
export async function fileToDataUrl(
  file: File,
  opts: { maxSide?: number; mime?: "image/jpeg" | "image/png"; quality?: number } = {},
): Promise<string> {
  const maxSide = opts.maxSide ?? 720;
  const mime = opts.mime ?? "image/jpeg";
  const quality = opts.quality ?? 0.82;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image.");
  }
  if (mime === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const dataUrl = canvas.toDataURL(mime, quality);
  // Cap ~700KB of base64 text to stay under action limits + MongoDB comfort
  if (dataUrl.length > 900_000) {
    throw new Error("Image is still too large after compression. Try a smaller file.");
  }
  return dataUrl;
}

export function isDataUrl(value: string | null | undefined): boolean {
  return !!value && value.startsWith("data:image/");
}
