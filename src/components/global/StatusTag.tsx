import { Tag } from "antd";
import { BsCheckCircle } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";

type Props = {
  status?: string;
};

const StatusTag = ({ status }: Props) => {
  const color = () => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "resolved":
      case "closed":
        return "green";
      case "open":
        return "red";
      default:
        return "orange";
    }
  };
  const icon = () => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "resolved":
      case "closed":
        return <BsCheckCircle />;
      case "open":
        return <FaBan />;
      default:
        return <MdOutlinePending />;
    }
  };

  return (
    <Tag
      color={color()}
      className="rounded-full uppercase font-semibold text-[10px] flex items-center w-fit gap-1"
    >
      <span> {icon()}</span>
      {status}
    </Tag>
  );
};

export default StatusTag;
