"use client";
import { useState } from "react";
export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const upload = async (_file: File) => { setUploading(true); setUploading(false); };
  return { upload, uploading };
}
