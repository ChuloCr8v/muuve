import { Button, Drawer, Form, Input, message, Select, Spin } from "antd";
import { closeDrawer, DrawerState } from "../../../redux/popupSlice";
import { useAppDispatch, useAppSelector } from "../../../api/data";
import { useEffect, useState } from "react";
import { useUpdateCustomerMutation } from "../../../api/customer.api";
import useGetSingleCustomer from "../../../hooks/useGetSingleCustomer";

interface FormDataType {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}

const UpdateCustomerDrawer = () => {
  const { currentDrawer } = useAppSelector((state) => state.popups);
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

  const [form] = Form.useForm();

  const { isOpen, id } = currentDrawer;

  const {
    customer,
    isLoading: loadingCustomer,
    isFetching,
  } = useGetSingleCustomer({
    customerId: id,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (customer) {
      const formValues = {
        name: customer.customer?.name,
        email: customer.email,
        phone: customer.customer?.phone,
        address: customer.customer?.address,
        // status: customer.isActive ? "Active" : "Deactivated",
      };

      console.log(formValues);
      console.log(customer);

      form.setFieldsValue(formValues);
    }
  }, [id, isOpen, customer]);

  const handleUpdate = async () => {
    console.log(form.getFieldsValue());
    try {
      await updateCustomer({
        id: customer?.id,
        body: form.getFieldsValue(),
      }).unwrap();
      message.success("Staff update successful");
      dispatch(closeDrawer());
    } catch (error) {
      message.error("Customer update failed, try again");
      console.log(error);
    }
  };

  const Footer = () => {
    return (
      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={() => dispatch(closeDrawer())}
          className="w-[100px] h-7"
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          type="primary"
          className="w-[100px] h-7"
          onClick={() => form.submit()}
        >
          Submit
        </Button>
      </div>
    );
  };

  if (loadingCustomer || isFetching) {
    return <Spin />;
  }

  return (
    <Drawer
      open={isOpen === DrawerState.EDIT_CUSTOMER_DRAWER}
      title="Edit Customer"
      onClose={() => dispatch(closeDrawer())}
      footer={<Footer />}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate} colon={false}>
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
          rules={[{ required: true, message: "Please enter the phone number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item label="Status" name="isActive">
          <Select
            options={[
              { label: "Active", value: true },
              { label: "Deactivated", value: false },
            ]}
          />
        </Form.Item> */}
      </Form>
    </Drawer>
  );
};

export default UpdateCustomerDrawer;
