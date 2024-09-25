import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import CustomerTab from '../../component/customer/CustomerTab';
import { DownOutlined } from '@ant-design/icons';


const companyData = {
    name: 'Blue Chip Networks',  
    createdAt: '8 Aug 2023', 
    logo: '/public/BCN_Logo.png', 
  };


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const CustomerPage = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/public/BCN_Logo.png" alt="Logo" />
          <div>
            <h5 className="text-lg font-semibold">{companyData.name}</h5>
            <p className="text-gray-500 text-xs">Created on {companyData.createdAt}</p>
          </div>
        </div>
        <Button type="primary">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              Take Action
              <DownOutlined className="ml-2" />
            </a>
          </Dropdown>
        </Button>
      </div>
      <CustomerTab />
    </section>
  );
};

export default CustomerPage;
