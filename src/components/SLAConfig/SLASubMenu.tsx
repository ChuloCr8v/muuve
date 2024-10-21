import { twMerge } from "tailwind-merge";

type Props = {
  currentItem: string;
  setCurrentItem: (arg: string) => void;
};

const SLASubMenu = (props: Props) => {
  const subMenuItems = [
    {
      label: "survey request",
    },
    {
      label: "job order",
    },
  ];

  return (
    <div className="col-span-2 h-full border rounded-md space-y-2 p-4">
      <p className="text-base font-semibold capitalize">Flow Options</p>

      <ol className="text-[13px] space-y-1">
        {subMenuItems.map((item) => (
          <li
            className={twMerge(
              "text-grey cursor-pointer hover:text-primary capitalize",
              props.currentItem.toLowerCase() === item.label &&
                "text-primary font-semibold"
            )}
            onClick={() => props.setCurrentItem(item.label)}
          >
            {item.label}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SLASubMenu;
