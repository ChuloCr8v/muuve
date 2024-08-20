import Logo from "../../../public/miro-color.png";
import Menu from "./Menu";

export default function SideNav() {
  return (
    <nav className="flex flex-col w-full min-h-screen ">
      <div className="w-full text-center mt-[24px] mb-[35px]">
        <img src={Logo} alt="" className="w-[70px] m-auto h-[32px]" />
        <span>Service Management</span>
      </div>
      <Menu />
    </nav>
  );
}
