import { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="layout h-screen w-screen overflow-y-auto">
      <Header />
      <div className="min-h-100vh h-full">{props.children}</div>
    </div>
  );
};

export default Layout;
