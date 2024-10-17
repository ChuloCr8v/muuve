import { Button, Drawer, Form, Input, message, Spin } from "antd";
import { closeDrawer, DrawerState } from "../../../redux/popupSlice";
import { useAppDispatch, useAppSelector } from "../../../api/data";
import { useEffect } from "react";
import useGetSingleVendor from "../../../hooks/useGetSingleVendor";
import { useUpdateVendorMutation } from "../../../api/vendor";

const UpdateVendorDrawer = () => {
  const { currentDrawer } = useAppSelector((state) => state.popups);
  const [updateVendor, { isLoading }] = useUpdateVendorMutation();

  const [form] = Form.useForm();

  const { isOpen, id } = currentDrawer;

  const {
    vendor,
    isLoading: loadingVendor,
    isFetching,
  } = useGetSingleVendor({
    vendorId: id,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vendor) {
      const formValues = {
        companyName: vendor.vendor?.companyName,
        spocName: vendor.vendor?.spocName,
        email: vendor.email,
      };

      form.setFieldsValue(formValues);
    }
  }, [id, isOpen, vendor]);

  const handleUpdate = async () => {
    console.log(form.getFieldsValue());
    try {
      await updateVendor({
        id: vendor?.id,
        body: form.getFieldsValue(),
      }).unwrap();
      message.success("Vendor update successful");
      dispatch(closeDrawer());
    } catch (error) {
      message.error("Vendor update failed, try again");
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

  if (loadingVendor || isFetching) {
    return <Spin />;
  }

  return (
    <Drawer
      open={isOpen === DrawerState.EDIT_VENDOR_DRAWER}
      title="Edit Vendor"
      onClose={() => dispatch(closeDrawer())}
      footer={<Footer />}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate} colon={false}>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Please enter the company name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="SPOC Name"
          name="spocName"
          rules={[{ required: true, message: "Please enter the spoc name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter the email address",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UpdateVendorDrawer;
