import { useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  Table,
  Tag,
  Modal,
  Form,
  message,
  Drawer,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  EditOutlined,
  StopOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import Heading from "../../components/global/Header";
import SummaryCards from "../../components/global/SummaryCards";
import { FaBan } from "react-icons/fa";
import CustomerDropButton from "../../components/customer/CustomerDropDown";
import { useListCustomersQuery } from "../../api/customer.api";

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export interface ActionProps {
  customer: CustomerData;
  onEdit: (customer: CustomerData) => void;
  onDeactivate: (customer: CustomerData) => void;
}

export default function Customer() {
  const { data: users, isLoading } = useListCustomersQuery();

  const customers = users?.map((u) => ({
    email: u.email,
    name: u.customer.name,
    phone: u.customer.phone,
    address: u.customer.address,
    status: u.customer.isActive,
    customerId: u.customer.customerId,
  }));

  // const [newStaff, setNewStaff] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    null
  );
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] =
    useState<boolean>(false);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState<string>(""); // Added state for search input
  const [filteredData, setFilteredData] = useState(customers); // State for filtered data

  const openEditDrawer = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    form.setFieldsValue(customer);
    setDrawerVisible(true);
  };

  const showDeactivateModal = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    setDeactivateModalVisible(true);
  };

  const handleDeactivate = () => {
    if (selectedCustomer) {
      message.success(
        `Customer ${selectedCustomer.name} deactivated successfully`
      );
      setDeactivateModalVisible(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = customers?.filter(
      (c) =>
        c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.email.toLowerCase().includes(value.toLowerCase()) ||
        c.phone.includes(value)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "customerId",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
          {status ? "Active" : "inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CustomerData) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "Edit",
                icon: <EditOutlined />,
                onClick: () =>
                  selectedCustomer && openEditDrawer(selectedCustomer),
              },
              {
                key: "2",
                label: "Deactivate",
                icon: <StopOutlined />,
                onClick: () => showDeactivateModal(record),
              },
            ],
          }}
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
        <Heading heading={"Customer "} />
        <div className="flex space-x-[16px]">
          <Input
            className="w-[400px]"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)} // Search handler added
            placeholder="Search by name, email, or phone"
          />
          <Button
            className="flex items-center"
            onClick={() => setFilteredData(customers)}
          >
            <span>Refresh</span>
            <SyncOutlined />
          </Button>
          <CustomerDropButton />
        </div>
      </section>

      <SummaryCards
        summaryData={[
          { label: "Total", value: 22 },
          { label: "Active", value: 19 },
          { label: "Deactivated", value: 2 },
        ]}
      />

      <section className="rounded-lg border-[1.5px] border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <Table
          scroll={{ x: 800 }}
          size="small"
          columns={columns as any}
          dataSource={filteredData}
          loading={isLoading}
        />
      </section>

      <Drawer
        title="Edit Customer"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the customer name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
          <Button type="primary" onClick={() => setDrawerVisible(false)}>
            Save
          </Button>
        </div>
      </Drawer>

      <Modal
        visible={deactivateModalVisible}
        onCancel={() => setDeactivateModalVisible(false)}
        onOk={handleDeactivate}
        okText="Deactivate"
        cancelText="Cancel"
        width={320}
        okButtonProps={{ danger: true }}
      >
        <div>
          <div className="flex items-center gap-2 mt-2">
            <Tag className="flex items-center justify-center w-10 h-10 text-red-600 bg-red-100 border-none rounded-full">
              <FaBan />
            </Tag>
            <h4 className="text-xl font-semibold ">Deactivate Customer</h4>
          </div>
          <p className="mt-2 text-sm">
            Are you sure you want to deactivate{" "}
            <strong>{selectedCustomer?.name}</strong>?
          </p>
        </div>
      </Modal>
    </div>
  );
}
