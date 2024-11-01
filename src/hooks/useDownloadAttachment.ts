import axios from "axios";
import { baseUrl } from "../api/base";
import { useAppSelector } from "../api/data";
import { useCallback, useMemo, useState } from "react";
import { toastApiError } from "../utils/error.util";

export function useDownloadAttachment() {
  const [downloadingId, setDownloadingId] = useState<string | undefined>();

  const token = useAppSelector((state) => state.auth.token);

  const download = useCallback(
    (name: string, id: string) => {
      if (!token || !id) return;

      setDownloadingId(id);

      axios
        .get(`/uploads/${id}`, {
          baseURL: baseUrl,
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        })
        .then((res) => {
          const fileBlob = new Blob([res.data], {
            type: res.headers["content-type"],
          });

          const downloadLink = document.createElement("a");
          const url = URL.createObjectURL(fileBlob);
          downloadLink.href = url;
          downloadLink.download = name;
          document.body.appendChild(downloadLink);

          downloadLink.click();

          URL.revokeObjectURL(url);
          document.body.removeChild(downloadLink);
        })
        .catch(toastApiError)
        .finally(() => setDownloadingId(undefined));
    },
    [token]
  );

  const isDownloading = useMemo(() => Boolean(downloadingId), [downloadingId]);

  return { download, isDownloading, downloadingId };
}
