import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className=" w-screen flex flex-col items-center justify-center overflow-x-hidden ">
      <Header />
      <Navigation />

      <div className="h-full max-w-7xl body_wrapper">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
