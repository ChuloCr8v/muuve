import React, { useState } from 'react';
import { Button, Dropdown, Input, Menu, Modal, Table, Tag, message, Drawer, Form } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  EditOutlined,
  StopOutlined,
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';
import Heading from '../../component/Global/Header';
import NewStaff from '../../component/onboarding/admin/NewStaff';
import SummaryCards from '../../component/Global/SummaryCards';

interface StaffData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

export default function Staff() {
  const [newStaff, setNewStaff] = useState(false);
  const [staffData, setStaffData] = useState<StaffData[]>([
    { id: 'STA1200', name: 'Modesta Ekeh', email: 'modesta@xyz.com', phone: '08165785436', status: 'Active' },
    { id: 'STA1201', name: 'John Doe', email: 'john@xyz.com', phone: '08165785437', status: 'Active' },
    { id: 'STA1202', name: 'Jane Smith', email: 'jane@xyz.com', phone: '08165785438', status: 'Inactive' },
    { id: 'STA1203', name: 'Michael Roe', email: 'michael@xyz.com', phone: '08165785439', status: 'Inactive' },
    { id: 'STA1204', name: 'Emily Davis', email: 'emily@xyz.com', phone: '08165785440', status: 'Active' },
  ]);
  const [filteredData, setFilteredData] = useState<StaffData[]>(staffData); // For filtered search results
  const [searchText, setSearchText] = useState(''); // To track search input
  const [editingStaff, setEditingStaff] = useState<StaffData | null>(null);
  const [deactivatingStaff, setDeactivatingStaff] = useState<StaffData | null>(null);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Activate editing mode with current row data
  const handleEdit = (record: StaffData) => {
    setEditingStaff({ ...record });
    setDrawerVisible(true); // Open drawer for editing
  };

  // Save changes after editing
  const saveEdit = () => {
    if (editingStaff) {
      setStaffData(prev =>
        prev.map(staff => (staff.id === editingStaff.id ? { ...editingStaff } : staff))
      );
      setFilteredData(prev =>
        prev.map(staff => (staff.id === editingStaff.id ? { ...editingStaff } : staff))
      );
      setDrawerVisible(false);
      message.success('Staff updated successfully');
    }
  };

  // Deactivate a staff member
  const handleDeactivate = (record: StaffData) => {
    setDeactivatingStaff(record);
    setIsDeactivating(true);
  };

  // Confirm deactivation
  const confirmDeactivation = () => {
    if (deactivatingStaff) {
      setStaffData(prev =>
        prev.map(staff => (staff.id === deactivatingStaff.id ? { ...staff, status: 'Inactive' } : staff))
      );
      setFilteredData(prev =>
        prev.map(staff => (staff.id === deactivatingStaff.id ? { ...staff, status: 'Inactive' } : staff))
      );
      message.success(`${deactivatingStaff.name} has been deactivated successfully.`);
      setIsDeactivating(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = staffData.filter(
      staff =>
        staff.name.toLowerCase().includes(searchValue) ||
        staff.email.toLowerCase().includes(searchValue) ||
        staff.phone.includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
    },
    {
      title: 'Phone No',
      dataIndex: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => (
        <Tag
          icon={text === 'Active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          className={twMerge(
            text === 'Active'
              ? 'border-[#379D51] text-[#379D51] bg-[#E3FFE6]'
              : 'border-[#777777] text-[#777777] bg-[#F0F1F3]',
            'rounded-2xl space-x-2 font-semibold'
          )}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: 'Action',
      render: (record: StaffData) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                Edit
              </Menu.Item>
              <Menu.Item
                key="deactivate"
                icon={<StopOutlined />}
                onClick={() => handleDeactivate(record)}
              >
                Deactivate
              </Menu.Item>
            </Menu>
          }
        >
          <Button className="flex space-x-2 items-center">
            <span>Action</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-[16px] body-pad p-8">
      <section className="flex items-center justify-between">
        <Heading heading="Staff" />
        <div className="flex space-x-[16px]">
          <Input
            className="w-[400px]"
            prefix={<SearchOutlined />}
            placeholder="Search by name, email or phone"
            value={searchText}
            onChange={handleSearch}
          />
          <Button className="flex items-center" onClick={() => setFilteredData(staffData)}>
            <span className="mt-1">Refresh</span>
            <SyncOutlined />
          </Button>
          <Button className="flex items-center" onClick={() => setNewStaff(true)} type="primary">
            <span className="mt-1">New Staff</span>
            <PlusOutlined />
          </Button>
        </div>
      </section>

      <SummaryCards
        summaryData={[
          { label: 'Total', value: 22 },
          { label: 'Active', value: 19 },
          { label: 'Deactivated', value: 2 },
        ]}
      />

      <section className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <Table scroll={{ x: 800 }} size="small" columns={columns} dataSource={filteredData} />
      </section>

      <NewStaff newStaff={newStaff} setNewStaff={setNewStaff} />

      {/* Drawer for Editing */}
      <Drawer
        title="Edit Staff"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
        footer={
          <div className="text-right">
            <Button onClick={() => setDrawerVisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={saveEdit} type="primary">
              Save
            </Button>
          </div>
        }
      >
         <Form 
        //  form={form} 
         layout="vertical">
        <Form.Item
         label="Staff Name"
            name="name"
        >
        <Input
          value={editingStaff?.name}
          onChange={e => setEditingStaff({ ...editingStaff!, name: e.target.value })}
          placeholder="Name"
          className="mb-3"
        />
        </Form.Item>
        <Form.Item
         label="Email Address"
         name="email">
          <Input
          value={editingStaff?.email}
          onChange={e => setEditingStaff({ ...editingStaff!, email: e.target.value })}
          placeholder="Email"
          className="mb-3"
        />
          </Form.Item>
       <Form.Item
        label="Phone Number"
            name="phone"
       >
          <Input
          value={editingStaff?.phone}
          onChange={e => setEditingStaff({ ...editingStaff!, phone: e.target.value })}
          placeholder="Phone"
          className="mb-3"
        />
          </Form.Item>
          {/* <Form.Item
        label="Role"
            name="role"
       >
          <Input
          value={editingStaff?.phone}
          onChange={e => setEditingStaff({ ...editingStaff!, role: e.target.value })}
          placeholder="Role"
          className="mb-3"
        />
          </Form.Item> */}
          </Form>
      </Drawer>

      {/* Modal for Deactivating */}
      <Modal
        title="Deactivate Staff"
        visible={isDeactivating}
        onOk={confirmDeactivation}
        onCancel={() => setIsDeactivating(false)}
        okText="Deactivate"
        okButtonProps={{ danger: true }}
        width={320}
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-10 bg-red-50 flex items-center justify-center rounded-full">
            <ExclamationCircleOutlined className="text-red-500 text-xl" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Are you sure you want to deactivate <strong>{deactivatingStaff?.name}</strong>?</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
