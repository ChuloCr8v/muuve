import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  StopOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Table, Tag } from "antd";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useListStaffQuery } from "../../api/staff.api";
import { User } from "../../api/types";
import Heading from "../../components/global/Header";
import SummaryCards from "../../components/global/SummaryCards";
import { usePopup } from "../../context/PopupContext";
import { AddStaffDrawer } from "../../drawers/staff/AddStaffDrawer";

export default function Staff() {
  const { openDrawer } = usePopup();

  const { data: users, isLoading } = useListStaffQuery();

  const staff = users?.map((u) => ({
    name: u.staff.name,
    email: u.email,
    roles: "Nil",
    status: u.staff.isActive,
  }));

  const [filteredData, setFilteredData] = useState(staff); // For filtered search results
  const [searchText, setSearchText] = useState(""); // To track search input
  // const [editingStaff, setEditingStaff] = useState<User | null>(null);
  // const [deactivatingStaff, setDeactivatingStaff] = useState<User | null>(null);
  // const [isDeactivating, setIsDeactivating] = useState(false);
  // const [drawerVisible, setDrawerVisible] = useState(false);

  // Activate editing mode with current row data
  // const handleEdit = (record: User) => {
  //   setEditingStaff({ ...record });
  //   setDrawerVisible(true); // Open drawer for editing
  // };

  // Save changes after editing
  // const saveEdit = () => {
  //   if (editingStaff) {
  //     setStaffData((prev) =>
  //       prev.map((staff) =>
  //         staff.id === editingStaff.id ? { ...editingStaff } : staff
  //       )
  //     );
  //     setFilteredData((prev) =>
  //       prev.map((staff) =>
  //         staff.id === editingStaff.id ? { ...editingStaff } : staff
  //       )
  //     );
  //     setDrawerVisible(false);
  //     message.success("Staff updated successfully");
  //   }
  // };

  // Deactivate a staff member
  // const handleDeactivate = (record: User) => {
  //   setDeactivatingStaff(record);
  //   setIsDeactivating(true);
  // };

  // Confirm deactivation
  // const confirmDeactivation = () => {
  //   if (deactivatingStaff) {
  //     setStaffData((prev) =>
  //       prev.map((staff) =>
  //         staff.id === deactivatingStaff.id
  //           ? { ...staff, status: "Inactive" }
  //           : staff
  //       )
  //     );
  //     setFilteredData((prev) =>
  //       prev.map((staff) =>
  //         staff.id === deactivatingStaff.id
  //           ? { ...staff, status: "Inactive" }
  //           : staff
  //       )
  //     );
  //     message.success(
  //       `${deactivatingStaff.staff.name} has been deactivated successfully.`
  //     );
  //     setIsDeactivating(false);
  //   }
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = staff?.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchValue) ||
        staff.email.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Roles",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: boolean) => (
        <Tag
          icon={status ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          className={twMerge(
            status
              ? "border-[#379D51] text-[#379D51] bg-[#E3FFE6]"
              : "border-[#777777] text-[#777777] bg-[#F0F1F3]",
            "rounded-2xl space-x-2 font-semibold"
          )}
        >
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_record: User) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                // onClick={() => handleEdit(record)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="deactivate"
                icon={<StopOutlined />}
                // onClick={() => handleDeactivate(record)}
              >
                Deactivate
              </Menu.Item>
            </Menu>
          }
        >
          <Button size="small" className="flex items-center space-x-2">
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
          <Button
            className="flex items-center"
            onClick={() => setFilteredData(staff)}
          >
            <span>Refresh</span>
            <SyncOutlined />
          </Button>
          <Button
            className="flex items-center"
            onClick={() => openDrawer(<AddStaffDrawer />)}
            type="primary"
          >
            <span>Add Staff</span>
            <PlusOutlined />
          </Button>
        </div>
      </section>

      <SummaryCards
        summaryData={[
          { label: "Total", value: staff?.length || 0 },
          {
            label: "Active",
            value: staff?.filter((s) => s.status).length || 0,
          },
          {
            label: "Inactive",
            value: staff?.filter((s) => !s.status).length || 0,
          },
        ]}
      />

      <section className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <Table
          scroll={{ x: 800 }}
          size="small"
          columns={columns}
          dataSource={filteredData}
          loading={isLoading}
        />
      </section>

      {/* Drawer for Editing */}
      {/* <Drawer
        title="Edit Staff"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
        footer={
          <div className="text-right">
            <Button
              onClick={() => setDrawerVisible(false)}
              style={{ marginRight: 8 }}
            >
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
          layout="vertical"
        >
          <Form.Item label="Staff Name" name="name">
            <Input
              value={editingStaff?.staff.name}
              onChange={(e) =>
                setEditingStaff({ ...editingStaff!, name: e.target.value })
              }
              placeholder="Name"
              className="mb-3"
            />
          </Form.Item>
          <Form.Item label="Email Address" name="email">
            <Input
              value={editingStaff?.email}
              onChange={(e) =>
                setEditingStaff({ ...editingStaff!, email: e.target.value })
              }
              placeholder="Email"
              className="mb-3"
            />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input
              value={editingStaff?.phone}
              onChange={(e) =>
                setEditingStaff({ ...editingStaff!, phone: e.target.value })
              }
              placeholder="Phone"
              className="mb-3"
            />
          </Form.Item>
        </Form>
      </Drawer> */}

      {/* Modal for Deactivating */}
      {/* <Modal
        title="Deactivate Staff"
        visible={isDeactivating}
        onOk={confirmDeactivation}
        onCancel={() => setIsDeactivating(false)}
        okText="Deactivate"
        okButtonProps={{ danger: true }}
        width={320}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-16 h-10 rounded-full bg-red-50">
            <ExclamationCircleOutlined className="text-xl text-red-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">
              Are you sure you want to deactivate{" "}
              <strong>{deactivatingStaff?.name}</strong>?
            </p>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
