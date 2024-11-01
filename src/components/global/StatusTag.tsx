import { Tag } from "antd";

type Props = {
  status: string;
  bgColor?: string;
  textColor?: string;
};

// TODO WORK ON THIS COMPONENT TO MAKE ALL COLORS DYNAMIC BASED ON WHATS PASSED

const StatusTag = ({ status, textColor, bgColor }: Props) => {
  return (
    <Tag
      color={bgColor ? bgColor : "#0A95CC1A"}
      className="rounded-full uppercase font-semibold text-xs flex items-center w-fit gap-1 py-0.5"
    >
      <span className={textColor ? `text-[${textColor}]` : "text-[#0A95CC]"}>
        {status}
      </span>
    </Tag>
  );
};

export default StatusTag;
