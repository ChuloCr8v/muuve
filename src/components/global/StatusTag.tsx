import { Tag } from "antd";
import { twMerge } from "tailwind-merge";

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
      className={twMerge(
        "rounded-full font-semibold text-xs flex items-center w-fit gap-1 py-0.5"
      )}
    >
      <span
        className={twMerge(
          textColor ? `text-[${textColor}]` : "text-[#0A95CC]"
        )}
      >
        {status}
      </span>
    </Tag>
  );
};

export default StatusTag;
