import { Tooltip } from "antd";
import { twJoin } from "tailwind-merge";

export function SignModeButton(props: {
  text?: string;
  icon?: React.ReactElement;
  onlyIf?: boolean;
  tooltip?: string;
  onClick?: () => void;
  highlighted?: boolean;
}) {
  if (props.onlyIf === false) {
    return null;
  }
  return (
    <Tooltip placement="top" title={props.tooltip}>
      <button
        type="button"
        onClick={props.onClick}
        className={twJoin(
          "border-l w-full first:border-none p-1.5 hover:bg-primary hover:text-white",
          "flex flex-col items-center justify-center gap-0.5",
          props.highlighted ? "bg-primary text-white" : ""
        )}
      >
        {props.icon && props.icon}
        {props.text && (
          <div className="text-xs leading-tight max-w-[7em] flex-grow">
            {props.text}
          </div>
        )}
      </button>
    </Tooltip>
  );
}
