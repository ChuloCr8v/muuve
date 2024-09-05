import Logo from "../../../public/miro-color.png";
import Menu from "./Menu";

export default function SideNav() {
  return (
    <nav className="flex flex-col w-full min-h-screen ">
      <div className="w-full text-center mt-[24px] mb-[35px]">
        <img src={Logo} alt="" className="w-16 m-auto" />
        <span className="text-base">Service Management</span>
      </div>
      <Menu />
    </nav>
  );
}
