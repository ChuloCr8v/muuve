import { Tag } from "antd";
import { BsCheckCircle } from "react-icons/bs";
import { MdOutlinePending } from "react-icons/md";

type Props = {
  status?: string;
};

const StatusTag = ({ status }: Props) => {
  const icon =
    status?.toLowerCase() === "completed" ? (
      <BsCheckCircle />
    ) : (
      <MdOutlinePending />
    );
  const color = status?.toLowerCase() === "completed" ? "green" : "orange";

  return (
    <Tag
      color={color}
      className="rounded-full uppercase font-semibold text-[10px] flex items-center w-fit gap-1"
    >
      <span className="text-[13px]"> {icon}</span>
      {status}
    </Tag>
  );
};

export default StatusTag;
