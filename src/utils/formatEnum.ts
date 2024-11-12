export function formatStatusEnum(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => {
      if (word === "atp") {
        return "ATP";
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
