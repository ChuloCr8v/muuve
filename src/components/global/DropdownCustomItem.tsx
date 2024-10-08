import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const DropdownCustomItem = (props: {
  label: string;
  icon: ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex items-center space-x-2", props.className)}>
      <div className="text-lg">{props.icon}</div>
      <span className="">{props.label}</span>
    </div>
  );
};

export default DropdownCustomItem;
