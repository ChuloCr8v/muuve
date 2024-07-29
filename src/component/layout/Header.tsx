import { MenuOutlined } from '@ant-design/icons';

export default function Header() {

  return (
    <header className="flex justify-between items-center w-full px-2 ">
      <div className="flex gap-x-4 items-center  ">
         <MenuOutlined className='md:hidden flex text-xl hover:text-[#0A96CC]'/>
      </div>

     
    </header>
  );
}
