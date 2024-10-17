import { Button, Drawer, Form, Input, message, Select } from "antd";
import CustomLabel from "../../../components/onboarding/CustomLabel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../api/data";
import { closeDrawer, DrawerState } from "../../../redux/popupSlice";
import useGetSingleStaff from "../../../hooks/useGetSingleStaff";
import { useUpdateStaffMutation } from "../../../api/staff.api";

const UpdateUserDrawer = () => {
  const [formData, setFormData] = useState<{
    name?: string;
    workEmail?: string;
    role?: string;
  }>({ name: "", workEmail: "", role: "" });

  const { currentDrawer } = useAppSelector((state) => state.popups);
  const { isOpen, id } = currentDrawer;
  const [updateStaff, { isLoading }] = useUpdateStaffMutation();

  const { staff } = useGetSingleStaff({ staffId: id });

  useEffect(() => {
    const staffFormFields = {
      name: staff?.staff.name,
      workEmail: staff?.email,
      role: staff?.isAdmin ? "Admin" : "User",
    };

    setFormData(staffFormFields);
  }, [id, staff]);

  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    const formattedFormData = {
      name: formData.name,
      email: formData.workEmail,
      //    role: formData.role,
    };

    try {
      await updateStaff({
        id: staff?.id,
        body: formattedFormData,
      }).unwrap();
      message.success("Staff update successful");
      dispatch(closeDrawer());
    } catch (error) {
      message.error("Staff update failed, try again");
      console.log(error);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          onClick={handleUpdate}
        >
          Submit
        </Button>
      </div>
    );
  };

  return (
    <Drawer
      title={"Edit" + " " + staff?.staff?.name}
      footer={<Footer />}
      open={isOpen === DrawerState.EDIT_STAFF_DRAWER}
      onClose={() => dispatch(closeDrawer())}
    >
      <Form layout="vertical" colon={false}>
        <Form.Item label={<CustomLabel required label="Name" />}>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Item>
        <Form.Item label={<CustomLabel required label="Name" />}>
          <Input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Form.Item>
        <Form.Item label={<CustomLabel required label="Name" />}>
          <Select
            value={formData.role}
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
            onChange={(value) => handleChange("role", value)}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UpdateUserDrawer;
