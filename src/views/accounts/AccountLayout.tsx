import { ReactNode } from "react";
import AccountSidebar from "./AccountSidebar";

type Props = {
  children: ReactNode;
};

const AccountLayout = (props: Props) => {
  return (
    <div className=" relative flex items-start gap-4 w-full h-[calc(100vh-122px)] overflow-y-hidden">
      <AccountSidebar />
      <div className="w-full h-full pb-24 pt-4 overflow-y-scroll">
        {props.children}
      </div>
    </div>
  );
};

export default AccountLayout;
