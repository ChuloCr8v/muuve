import { MenuFoldOutlined } from '@ant-design/icons';
import Account from './Account';
import { Collapse } from 'antd';

interface Prop{
  setCollapse: any
  collapse: boolean
  open: any
}

export default function Header(props: Prop) {
  const {setCollapse, collapse, open} = props


  return (
    <header className="flex justify-between items-center w-full px-2 ">
      <div className="flex gap-x-4 items-center  ">
         <MenuFoldOutlined onClick={() => setCollapse(!collapse)} className='hidden md:flex text-xl hover:text-[#0A96CC]'/>
         <MenuFoldOutlined onClick={() => open(true)} className='md:hidden flex text-xl hover:text-[#0A96CC]'/>
      </div>
      <Account user={"Modesta Ekeh"} role={"UI/UX"} />
    </header>
  );
}
