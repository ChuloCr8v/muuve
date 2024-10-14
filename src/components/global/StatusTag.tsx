import { Tag } from "antd";
import { FaBan } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlinePending } from "react-icons/md";

type Props = {
  status?: string;
};

const StatusTag = ({ status }: Props) => {
  const color = () => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "resolved":
      case "active":
      case "closed":
        return "green";
      case "open":
      case "deactivated":
      case "inactive":
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
      case "active":
        return <FaRegCircleCheck />;
      case "open":
      case "deactivated":
        return <FaBan />;
      default:
        return <MdOutlinePending />;
    }
  };

  return (
    <Tag
      color={color()}
      className="rounded-full uppercase font-semibold text-xs flex items-center w-fit gap-1 py-0.5"
    >
      <span className=""> {icon()}</span>
      {status}
    </Tag>
  );
};

export default StatusTag;
