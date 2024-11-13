import { Checkbox, Form, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAssignProjectVendorMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { useListVendorQuery } from "../../api/vendor";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useState } from "react";

interface Props {
  project: Project;
}

export const AssignJobVendorModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();
  const [confirm, setConfirm] = useState(false);
  const [slaType, setSlaType] = useState("Working Days");

  const { data: vendorUser } = useListVendorQuery();
  const [assign, { isLoading }] = useAssignProjectVendorMutation();

  const submit = async () => {
    const values = await form.validateFields();

    const isWorkingDays = slaType === "Working Days" ? true : false;
    const data = { ...values, id: project.id, isWorkingDays };

    assign(data)
      .unwrap()
      .then(() => {
        message.success("Vendor Assigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Assign Vendor for Implementation"
      onSubmit={submit}
      okText="Assign"
      loading={isLoading}
      disabled={!confirm}
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Vendor"
            required
            name="vendorId"
            rules={[{ required: true, message: "Vendor is required" }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={vendorUser?.map((v) => ({
                label: (
                  <div className="flex items-center space-x-1">
                    <span>{v.vendor.companyName}</span>
                    <span className="text-gray-400">|</span>
                    <span>{v.vendor.spocName}</span>
                  </div>
                ),
                value: v.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Design Due Date"
            required
            name="slaDays"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              addonAfter={
                <Select
                  onChange={(v) => setSlaType(v)}
                  defaultValue={"Working Days"}
                  options={[
                    { label: "Working Days", value: "Working Days" },
                    { label: "All Days", value: "All Days" },
                  ]}
                />
              }
            />
          </Form.Item>
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item label="Upload File" name="attachments">
            <MultiUpload />
          </Form.Item>

          <Form.Item>
            <Checkbox onChange={(e) => setConfirm(e.target.checked)}>
              I confirm that project implementation has started
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
