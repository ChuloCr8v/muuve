import { MenuFoldOutlined } from '@ant-design/icons';
import Account from './Account';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Prop{
  setCollapse: any
  collapse: boolean
  open: any
}

export default function Header(props: Prop) {
  const {setCollapse, collapse, open} = props
  const [selectedMenu, setSelectedMenu] = useState<any | null>(null)

  const handleChange =(record: any) => {
    setSelectedMenu(record)
  }

  const menuList =[
    {
      label: 'Configuration',
      url: "/admin/config"
    }
  ]


  return (
    <header className="flex justify-between items-center w-full px-2 ">
      <div className="flex gap-x-4 items-center  ">
         <MenuFoldOutlined onClick={() => setCollapse(!collapse)} className='hidden md:flex text-xl hover:text-[#0A96CC]'/>
         <MenuFoldOutlined onClick={() => open(true)} className='md:hidden flex text-xl hover:text-[#0A96CC]'/>
      </div>
      <div className='flex items-center justify-end w-fit space-x-4'>
        
        {menuList. map((list, index) => {
          const CurrentPage = list.url
          return(
            (
              <Link to={list.url}>
    
                <span onClick={()=> handleChange(CurrentPage)} className={twMerge(selectedMenu === CurrentPage ? 'text-primary font-semibold ' : 'text-[#595959]', 'text-[13px] ')}>{list.label}</span>
    
                </Link>
    
            )
          )
        })}
            
       

      <Account user={"Modesta Ekeh"} role={"UI/UX"} />
      </div>
    </header>
  );
}
