import { Button, Checkbox, Drawer, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableRowData from "../../component/Global/TableRowData";
import CustomLabel from "../../component/onboarding/CustomLabel";
import { closeNewRoleModal } from "../../redux/popupSlice";
import { NewRoleFormDataTypes } from "../../types";
import { newRoleFormFields } from "../../dummy/newRoleFormFields";

interface NewRoleModalInterface {
  popups: {
    newRoleModalIsOpen: {
      isOpen: boolean;
      module: string;
      data: [];
      action: string;
    };
  };
}

const NewRoleModal = () => {
  const { newRoleModalIsOpen } = useSelector(
    (state: NewRoleModalInterface) => state.popups
  );

  const { isOpen, module, action } = newRoleModalIsOpen;
  const [formData, setFormData] =
    useState<NewRoleFormDataTypes[]>(newRoleFormFields);

  const dispatch = useDispatch();

  // console.log(data);
  // console.log(formData);

  // useEffect(() => {
  //   const assignValues = {
  //     label: data.roleName,
  //     description: data.description,
  //     users: data.users,
  //     permissions: data.permissions,
  //   };
  //   // console.log(assignValues);

  //   const updateToEdit = formData.find((d) => d.name === data.roleName);
  //   console.log(updateToEdit);

  //   // setFormData(action === "editRole" ? assignValues : newRoleFormFields);
  // }, [action]);

  // Handle change for all types of input
  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prevFormData) =>
      prevFormData.map((field) =>
        field.name === name ? { ...field, value } : field
      )
    );

    console.log(formData);
  };

  // Select all permissions
  const handleSelectAll = (e: { target: { checked: boolean } }) => {
    const checked = e.target.checked;
    setFormData((prevFormData) =>
      prevFormData.map((field) =>
        field.type === "checkbox" ? { ...field, value: checked } : field
      )
    );
  };

  const handleSubmit = () => {
    const formFields = formData.reduce(
      (acc: { [key: string]: string | boolean }, field) => {
        acc[field.name] = field.value;
        return acc;
      },
      {}
    );

    console.log(formFields);
  };

  return (
    <Drawer
      width={500}
      title={
        <p className="text-xl">
          {action === "editRole" ? "Edit" : "New"} Role{" "}
          <span className="capitalize text-grey font-normal"> | {module}</span>
        </p>
      }
      open={isOpen}
      onClose={() => dispatch(closeNewRoleModal())}
      footer={
        <div className="flex items-center justify-end w-full gap-4">
          <Button
            className="w-[144px]"
            onClick={() => dispatch(closeNewRoleModal())}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-[144px]" type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form colon={false} layout="vertical">
        {/* Render text inputs, textareas, and selects */}
        {formData
          .filter((field) => field.type !== "checkbox")
          .map((formItem) => (
            <Form.Item
              label={
                <CustomLabel
                  required={formItem.required}
                  label={formItem.label}
                />
              }
              key={formItem.name}
            >
              {formItem.type === "text-input" && (
                <Input
                  className="h-7"
                  value={formItem.value as string}
                  onChange={(e) => handleChange(formItem.name, e.target.value)}
                />
              )}
              {formItem.type === "textarea" && (
                <TextArea
                  value={formItem.value as string}
                  onChange={(e) => handleChange(formItem.name, e.target.value)}
                />
              )}
              {formItem.type === "select" && (
                <Select
                  value={formItem.value as string}
                  options={formItem.options}
                  onChange={(value) => handleChange(formItem.name, value)}
                />
              )}
            </Form.Item>
          ))}

        <div className="space-y-2">
          <div className="flex items-center justify-between bg-[#379D511F] py-2 px-4 rounded w-full mt-6">
            <TableRowData
              mainText="Set Permissions"
              mainTextStyle="font-semibold"
            />
            <div className="flex gap-2">
              <Checkbox onChange={handleSelectAll} />
              <span>Select all</span>
            </div>
          </div>

          {/* Permission checkboxes */}
          {formData
            .filter((field) => field.type === "checkbox")
            .map((formItem) => (
              <Form.Item key={formItem.name}>
                <div className="space-x-2">
                  <Checkbox
                    checked={formItem.value as boolean}
                    onChange={(e) =>
                      handleChange(formItem.name, e.target.checked)
                    }
                  />
                  <span>{formItem.label}</span>
                </div>
              </Form.Item>
            ))}
        </div>
      </Form>
    </Drawer>
  );
};

export default NewRoleModal;
