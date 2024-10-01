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
import Heading from "../../component/Global/Header";
import NewStaff from "../../component/onboarding/admin/NewStaff";
import SummaryCards from "../../component/Global/SummaryCards";
import { FaBan } from "react-icons/fa";
import CustomerDropButton from "../../component/customer/CustomerDropDown";

// Define type for customer data
interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

// Define props for Table's columns
export interface ActionProps {
  customer: CustomerData;
  onEdit: (customer: CustomerData) => void;
  onDeactivate: (customer: CustomerData) => void;
}

export default function Customer() {
  const [newStaff, setNewStaff] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    null
  );
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deactivateModalVisible, setDeactivateModalVisible] =
    useState<boolean>(false);
  const [form] = Form.useForm();

  const showEditModal = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    form.setFieldsValue(customer);
    setEditModalVisible(true);
  };

  const showDeactivateModal = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    setDeactivateModalVisible(true);
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      message.success("Customer updated successfully");
      setEditModalVisible(false);
      console.log(values);
    });
  };

  const handleDeactivate = () => {
    if (selectedCustomer) {
      message.success(
        `Customer ${selectedCustomer.name} deactivated successfully`
      );
      setDeactivateModalVisible(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
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
      render: () => <p>Victoria Island, Lagos</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: "Active" | "Inactive") => (
        <Tag
          icon={
            text === "Active" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
          className={twMerge(
            text === "Active"
              ? "border-[#379D51] text-[#379D51] bg-[#E3FFE6]"
              : "border-[#777777] text-[#777777] bg-[#F0F1F3]",
            "rounded-2xl space-x-2 font-semibold"
          )}
        >
          {text}
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
                onClick: () => showEditModal(record),
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
          <Button className="flex space-x-2 items-center">
            <span>Action</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const data: CustomerData[] = [
    {
      id: "CUS1200",
      name: "Modesta Ekeh",
      email: "modesta@xyz.com",
      phone: "08165785436",
      status: "Active",
    },
    {
      id: "CUS1201",
      name: "John Doe",
      email: "john@xyz.com",
      phone: "08165785437",
      status: "Inactive",
    },
    {
      id: "CUS1202",
      name: "Jane Doe",
      email: "jane@xyz.com",
      phone: "08165785438",
      status: "Active",
    },
    {
      id: "CUS1203",
      name: "Alice Doe",
      email: "alice@xyz.com",
      phone: "08165785439",
      status: "Inactive",
    },
    {
      id: "CUS1204",
      name: "Bob Doe",
      email: "bob@xyz.com",
      phone: "08165785440",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-[16px] body-pad p-8">
      <section className="flex items-center justify-between">
        <Heading heading={"Customer "} />
        <div className="flex space-x-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Button className="flex items-center">
            <span className="mt-1">Refresh</span>
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
          dataSource={data}
        />
      </section>

      <Modal
        title="Edit Customer"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save"
        width={420}
      >
        <Form form={form} layout="vertical" className="text-sm">
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the customer's name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter the customer's phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        // title="Deactivate Customer"
        visible={deactivateModalVisible}
        onCancel={() => setDeactivateModalVisible(false)}
        onOk={handleDeactivate}
        okText="Deactivate"
        cancelText="Cancel"
        // className="w-[400px]"
        width={420}
        okButtonProps={{ danger: true }}
      >
        <div>
          <div className="flex items-center gap-2 mt-2">
            <Tag className="h-10 w-10 rounded-full flex items-center justify-center border-none text-red-600 bg-red-100">
              <FaBan />
            </Tag>
            <h4 className="text-2xl font-semibold ">Deactivate Customer</h4>
          </div>
          <p className="mt-2">
            Are you sure you want to deactivate{" "}
            <p className="font-semibold">{selectedCustomer?.name}?</p>{" "}
          </p>
        </div>
      </Modal>

      <NewStaff newStaff={newStaff} setNewStaff={setNewStaff} />
    </div>
  );
}
