import React from 'react';
import { Link } from 'react-router-dom';

function SubMenu(props: any) {
  return (
    <div
      className={`${props.extraStyle} text-[#0A96CC] border-l-4 border-transparent hover:border-[#0A96CC] ${props.isSelected ? 'border-l-[#0A96CC]' : ''}`}
    >
      <div onClick={props.onSelect}>
        <Link to={props.href}>
          <div
            className={`flex hover:text-[#0A96CC] justify-between items-center py-[8px] pl-[24px] font-semibold text-[13px] ${
              props.isSelected ? 'text-[#0A96CC]' : 'text-[#262626]'
            }`}
          >
            <div className="flex gap-[16px]">
              {props.isSelected ? <img src={props.hoverImg} className="" alt="" /> : <img src={props.img} className="" alt="" /> }
              <span className={`text-[13px] ${props.isSelected ? " text-[#0A96CC] " : "text-[#777777] "}`}>{props.children}</span>
            </div>
            <div>
              <img src={props.drop} alt="" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SubMenu;
