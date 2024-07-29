import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Survey from '../../../public/subHover.png';
import { twMerge } from 'tailwind-merge';
import Logo from '../../../public/miro-color.png'


type MenuItemProps = {
  img: string;
  hoverImg: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

function MenuItem(props: MenuItemProps) {
  const selected = useLocation().pathname === props.href;
  return (
    <div className={props.className}>
      <Link to={props.href}>
        <div
          className={`group border-l-4 border-transparent hover:border-[#0A96CC] flex items-center hover:text-[#0A96CC] gap-[16px] font-semibold text-[14px] px-[20px] duration-300
          ${selected ? 'text-[#0A96CC] border-l-[#0A96CC]' : 'text-[rgba(38, 38, 38, 0.80)]'}`}
        >
          <img
            src={props.img}
            className={twMerge(
              'w-[24px] active:text-[#0A96CC] group-hover:hidden',
              selected && 'hidden'
            )}
          />
          <img
            src={props.hoverImg}
            className={twMerge(
              'w-[24px] active:text-[#0A96CC] hidden group-hover:flex',
              selected && 'flex'
            )}
          />
          <span>{props.children}</span>
        </div>
      </Link>
    </div>
  );
}

export default function SideNav() {


  return (
    <nav className="flex flex-col w-full min-h-screen ">
      <div className="w-full text-center mt-[24px] mb-[35px]">
        <img src={Logo} alt="" className="w-[70px] m-auto h-[32px]" />
        <span>Service Management</span>
      </div>

      <MenuItem img={Survey} href="/survey" hoverImg={Survey}>
       Survery Request
      </MenuItem>
     

    </nav>
  );
}
