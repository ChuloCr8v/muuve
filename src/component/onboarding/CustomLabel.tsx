import { StarFilled } from "@ant-design/icons";

const CustomLabel = (props: { label: string; required?: boolean }) => {
  return (
    <label
      htmlFor=""
      className="flex items-center font-semibold gap-1 text-[13px] text-label_black"
    >
      {props.label}
      {props.required && <StarFilled className="text-[7px] text-red-500" />}
    </label>
  );
};

export default CustomLabel;
