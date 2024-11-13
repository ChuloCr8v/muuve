import { Checkbox, Form, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useChangeProjectVendorMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { useListVendorQuery } from "../../api/vendor";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const JobChangeVendor = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckboxError, setIsCheckboxError] = useState(false);
  const [vendor, setVendor] = useState<string | undefined>();

  const { data: vendorUser } = useListVendorQuery();
  const [change, { isLoading }] = useChangeProjectVendorMutation();

  const submit = async () => {
    const values = await form.validateFields();

    // Check if the checkbox is selected
    if (!isChecked) {
      setIsCheckboxError(true);
      return;
    } else {
      setIsCheckboxError(false);
    }

    const data = { ...values, id: project.id };
    change(data)
      .unwrap()
      .then(() => {
        message.success("Vendor Assigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Change Vendor"
      onSubmit={submit}
      okText="Assign"
      loading={isLoading}
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
              onChange={(id) =>
                setVendor(
                  vendorUser?.find((v) => v.id === id)?.vendor.companyName
                )
              }
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
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item label="Upload File" name="attachments">
            <MultiUpload />
          </Form.Item>

          {vendor && (
            <Form.Item>
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              >
                I confirm that the vendor should be changed to{" "}
                <span className="font-semibold">{vendor}</span>
              </Checkbox>
              {isCheckboxError && (
                <div className="mt-1 text-xs text-red-500">
                  This field is required
                </div>
              )}
            </Form.Item>
          )}
        </Form>
      </div>
    </CustomModal>
  );
};
