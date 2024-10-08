import { DownloadOutlined } from "@ant-design/icons";
import { CgAttachment } from "react-icons/cg";

type Props = {
  name: string;
  size: string;
};

const AttachmentCard = ({ name, size }: Props) => {
  return (
    <div className="bg-white flex items-center justify-between w-full border rounded px-3 py-1">
      <div className="flex items-center gap-2">
        <CgAttachment />
        <div className="flex flex-col items-start">
          <span className="text-sm ">{name}</span>
          <span className="text-[11px] text-grey ">{size}mb</span>
        </div>
      </div>
      <DownloadOutlined />
    </div>
  );
};

export default AttachmentCard;
