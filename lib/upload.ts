import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

export async function saveUpload(file: File, folder: string) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const safeExt = ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)
    ? ext
    : "png";
  const key = `${folder}/${nanoid()}.${safeExt}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, bytes, {
      access: "public",
      contentType: file.type || `image/${safeExt}`,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  const filename = `${nanoid()}.${safeExt}`;
  await writeFile(path.join(dir, filename), bytes);
  return `/uploads/${folder}/${filename}`;
}
