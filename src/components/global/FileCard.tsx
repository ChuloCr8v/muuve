import { DownloadOutlined } from "@ant-design/icons";
import useFileIcon from "../../hooks/useFileIcon";

type Props = {
  fileType: string;
  name: string;
  size: number;
};

const FileCard = ({ fileType, name, size }: Props) => {
  const { fileIcon } = useFileIcon();

  return (
    <div className="flex items-center justify-between w-full border rounded px-3 py-1">
      <div className="flex items-center gap-2">
        <img src={fileIcon(fileType)} alt={name} className=" w-7" />
        <div className="flex flex-col items-start">
          <span className="">{name}</span>
          <span className="text-[11px] text-grey">{size}mb</span>
        </div>
      </div>
      <DownloadOutlined />
    </div>
  );
};

export default FileCard;
