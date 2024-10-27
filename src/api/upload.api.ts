import axios, { RawAxiosRequestHeaders as Headers } from "axios";
import { baseUrl } from "./base";
import { store } from "./data/store";
import { debug } from "../utils";
import { getApiError } from "../utils/error.util";

const uploadsUrl = `${baseUrl}/uploads`;

type UploadArgs = {
  file: File;
  id: string;
  order: number;
  signal?: AbortSignal;
  onProgress?: (percent: number) => void;
};

function bearerAuth() {
  const token = store.getState().auth?.token;
  return token ? `Bearer ${token}` : undefined;
}

function withAuth(hs?: Headers): Headers {
  return { ...hs, Authorization: bearerAuth() };
}

export function formBody(file: File, name = "file") {
  const body = new FormData();
  body.append(name, file);
  return body;
}

export async function uploadFile({
  file,
  id,
  order,
  signal,
  onProgress,
}: UploadArgs) {
  const body = formBody(file);

  const result = await axios.post(`${uploadsUrl}/${id}`, body, {
    headers: withAuth({ "Content-Type": "multipart/form-data" }),
    params: { order },
    signal,
    onUploadProgress(event) {
      if (onProgress && event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    },
  });
  onProgress?.(100);
  return result;
}

export async function cleanupUploads(ids: string | string[]) {
  try {
    const res = await axios.delete(uploadsUrl, {
      data: { ids },
      headers: withAuth(),
    });
    debug("Cleanup result:", res.data?.count);
  } catch (e: unknown) {
    debug("Cleanup error:", getApiError(e));
  }
}
