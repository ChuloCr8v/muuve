export function formatFileSize(size: number) {
  const kb = 1024;
  const mb = kb * 1024;
  if (size >= mb) {
    return (size / mb).toFixed(2) + " MB";
  } else {
    return (size / kb).toFixed(2) + " KB";
  }
}
