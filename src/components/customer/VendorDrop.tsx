import { useState } from "react";
import { Button, Drawer, Dropdown, Form, Input, MenuProps, message } from "antd";
import { useForm } from "antd/es/form/Form";
// import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
// import { PlusOutlined } from "@ant-design/icons";



const VendorDrop = () => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
//   const navigate = useNavigate(); 

  const onClose = () => {
    setOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          // href="#"
          className="text-green-500 text-sm"
        //   onClick={() => navigate("import-customers")} 
        >
          Import Vendor List
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          className="text-green-500 text-sm"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Single Vendor
        </a>
      ),
    },
  ];

  const onSubmit = async () => {

    message.success("Customer onboarded successfully");
    onClose();
  };

  return (
    <div>
      <Dropdown menu={{ items }} placement="bottom">
        <Button
          type="primary"
          className=""
        >
          New Vendor
        </Button>
      </Dropdown>

      {/* Drawer for Single Customer Form */}
      <Drawer
        onClose={onClose}
        open={open}
        title="New Customer"
        closeIcon={false}
        footer={
          <div className="flex justify-end w-full gap-4">
            <Button className="w-[100px]" type="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="primary" className="w-[144px]" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        }
      >
        <div>
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
            className="w-full"
          >
            <Form.Item
              label="Vendor Name"
              name="name"
              rules={[{ required: true, message: "Please enter the customer name" }]}
            >
              <Input className="rounded-lg w-[320px] border-[#E9EAEB]" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, type: "email", message: "Please enter a valid email address" },
              ]}
            >
              <Input className="rounded-lg w-[320px] border-[#E9EAEB]" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter the phone number" }]}
            >
              <Input className="rounded-lg w-[320px] border-[#E9EAEB]" />
            </Form.Item>

          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default VendorDrop;
