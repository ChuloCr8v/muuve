import { Tag } from "antd";

type Props = {
  status: string;
};

const StatusTag = ({ status }: Props) => {
  return (
    <Tag
      color="#0A95CC1A"
      className="rounded-full uppercase font-semibold text-xs flex items-center w-fit gap-1 py-0.5"
    >
      <span className="text-[#0A95CC]">{status}</span>
    </Tag>
  );
};

export default StatusTag;
