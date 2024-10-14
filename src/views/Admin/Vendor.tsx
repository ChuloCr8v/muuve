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
import { FaBan } from "react-icons/fa";
import SummaryCards from "../../components/global/SummaryCards";
import VendorDrop from "../../components/customer/VendorDrop";
import Heading from "../../components/global/Header";
import ActionPopup from "../../components/global/ActionPopup";
import { useListVendorQuery } from "../../api/vendor";
import { User } from "../../api/types";

interface VendorData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export interface ActionProps {
  vendor: VendorData;
  onEdit: (vendor: VendorData) => void;
  onDeactivate: (vendor: VendorData) => void;
}

export default function Vendor() {
  const data: VendorData[] = [
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

  // const [newStaff, setNewStaff] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<VendorData | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {data: listVendor, isLoading} = useListVendorQuery()
  console.log(listVendor)

  const [searchText, setSearchText] = useState<string>(""); 
  const [filteredData, setFilteredData] = useState([]); 

  const openEditDrawer = (vendor: VendorData) => {
    setSelectedCustomer(vendor);
    form.setFieldsValue(vendor);
    setDrawerVisible(true);
  };

  const showDeactivateModal = (customer: VendorData) => {
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

  // const handleSearch = (value: string) => {
  //   setSearchText(value);
  //   const filtered = listVendor.filter((vendor) =>
  //     vendor.vendor?.companyName.toLowerCase().includes(value.toLowerCase()) ||
  //     vendor.email.toLowerCase().includes(value.toLowerCase()) ||
  //     vendor.phone.includes(value)
  //   );
  //   setFilteredData(filtered);
  // };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: ["vendor", "companyName"],  // Correct dataIndex for nested structure
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
      render: () => <p>+234 5475 5505</p>,
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
              ? "border-[#777777] text-[#777777] bg-[#F0F1F3]"
              : "border-[#379D51] text-[#379D51] bg-[#E3FFE6] ",
            "rounded-2xl space-x-2 font-semibold"
          )}
        >
          Active
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: VendorData) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "Edit",
                icon: <EditOutlined />,
                onClick: () => selectedCustomer && openEditDrawer(selectedCustomer),
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

  return (
    <div className="space-y-[16px] body-pad p-8">
      <section className="flex items-center justify-between">
        <Heading heading={"Vendor "} />
        <div className="flex space-x-[16px]">
          <Input
            className="w-[400px]"
            prefix={<SearchOutlined />}
            value={searchText}
            // onChange={(e) => handleSearch(e.target.value)} // Search handler added
            placeholder="Search by name, email, or phone"
          />
          <Button className="flex items-center" onClick={() => setFilteredData(listVendor)}>
            {/* Reset search to full data */}
            <span className="mt-1">Refresh</span>
            <SyncOutlined />
          </Button>
          <VendorDrop />
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
          dataSource={listVendor}
          
        />
      </section>

      <Drawer
        title="Edit Customer"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        <Form form={form} layout="vertical" className="relative">
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[{ required: true, message: "Please enter the customer name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter the phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
        <div className="flex justify-end gap-2 bottom-3 right-5 absolute">
          <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
          <Button type="primary" onClick={() => setDrawerVisible(false)}>
            Save
          </Button>
        </div>
      </Drawer>

      <ActionPopup open={deactivateModalVisible} icon={  <Tag className="h-[50px] w-[50px] rounded-full flex items-center justify-center border-none text-red-600 bg-red-100">
              <FaBan className="text-[20px]"/>
            </Tag>

      } onCancel={() => setDeactivateModalVisible(false)} title={`Deactivate ${selectedCustomer?.name}`} sendButtonText={"Deactivate"} sendButtonStyle="bg-red-600 hover:bg-red-500">
      <p className="mt-2 text-sm">
            Are you sure you want to deactivate vendor{" "}
            <strong>{selectedCustomer?.name}</strong>?
      </p>

        </ActionPopup>

      {/* <Modal
        open={deactivateModalVisible}
        onCancel={}
        onOk={handleDeactivate}
        okText="Deactivate"
        cancelText="Cancel"
       
        okButtonProps={{ danger: true }}
      >
        <div>
          <div className="flex items-center gap-2 mt-2">
            <Tag className="h-10 w-10 rounded-full flex items-center justify-center border-none text-red-600 bg-red-100">
              <FaBan />
            </Tag>
            <h4 className="text-xl font-semibold "></h4>
          </div>
         
    </div>
  </Modal> */}
</div>
);}