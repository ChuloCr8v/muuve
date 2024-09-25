import { MenuFoldOutlined } from '@ant-design/icons';
import Account from './Account';

export default function Header() {

  return (
    <header className="flex justify-between items-center w-full px-2 ">
      <div className="flex gap-x-4 items-center  ">
         <MenuFoldOutlined className='md:hidde flex text-xl hover:text-[#0A96CC]'/>
      </div>
      <Account user={'Modesta Ekeh'} role={'UI/UX'}/>

     
    </header>
  );
}
