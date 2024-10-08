import { ReactNode } from "react";

const MenuList = (props: { title: string; icon: ReactNode }) => {
  return (
    <div key={props.title} className="w-full space-x-[10px] flex items-center">
      {props.icon}
      <span>{props.title}</span>
    </div>
  );
};

export default MenuList;
