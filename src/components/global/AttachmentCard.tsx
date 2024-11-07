import { DownloadOutlined } from "@ant-design/icons";
import { CgAttachment } from "react-icons/cg";
import { formatFileSize } from "../../utils/fileSize";
import { useDownloadAttachment } from "../../hooks/useDownloadAttachment";
import { Spin } from "antd";

type Props = {
  id: string;
  name: string;
  size: number;
};

const AttachmentCard = ({ id, name, size }: Props) => {
  const { download, isDownloading, downloadingId } = useDownloadAttachment();

  return (
    <div
      className="flex items-center justify-between w-full px-3 py-1 bg-white border rounded cursor-pointer"
      onClick={() => download(name, id)}
    >
      <div className="flex items-center gap-2">
        <CgAttachment />
        <div className="flex flex-col items-start">
          <span className="max-w-xs text-sm truncate">{name}</span>
          <span className="text-[11px] text-grey">{formatFileSize(size)}</span>
        </div>
      </div>
      {isDownloading && downloadingId === id ? (
        <Spin size="small" />
      ) : (
        <DownloadOutlined />
      )}
    </div>
  );
};

export default AttachmentCard;
