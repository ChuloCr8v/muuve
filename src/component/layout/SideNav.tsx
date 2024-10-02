import Logo from "../../../public/miro-color.png";
import Menu from "./Menu";
import MILogo from '/Mi-Color.png'

interface Prop {
  collapse: boolean;
}

export default function SideNav(props: Prop) {
  const {collapse, } = props
  return (
    <nav className="flex flex-col w-full min-h-screen space-y-[24px] items-center">
      {collapse ? <img src={MILogo} alt="" className="w-8 " /> :
      <div className="w-full text-center ">
        <img src={Logo} alt="" className="w-16 m-auto" />
        <span className="text-base">Service Management</span>
    </div>
      }
      
      <Menu collapse={collapse}/>
    </nav>
  );
}
