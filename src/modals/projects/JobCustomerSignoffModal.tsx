import { useGetAuthUserQuery } from "@/api/auth.api";
import SignatureInput from "@/components/signature";
import { Checkbox, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import { useCustomerSignoffMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { useState } from "react";

interface Props {
  project: Project;
}

export const JobCustomerSignoffModal = ({ project }: Props) => {
  const [confirm, setConfirm] = useState(false);

  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [signoff, { isLoading }] = useCustomerSignoffMutation();
  const { data: user } = useGetAuthUserQuery();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: project.id };
    signoff(data)
      .unwrap()
      .then(() => {
        message.success("Signed Off");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Customer Sign Off"
      onSubmit={submit}
      okText="Sign Off"
      loading={isLoading}
      width={500}
      disabled={!confirm}
    >
      <div className="w-full">
        <div className="p-2 my-2 border rounded-md">
          <p className="font-medium text-primary">{project.description}</p>
          <p className="flex justify-between">
            <span className="text-[#777]">Coordinator:</span>{" "}
            <span className="font-medium text-black">
              {project.lead.staff.name}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-[#777]">Completion Date:</span>{" "}
            <span className="font-medium text-black">
              {format(project.projectCompletedDate, "dd MMMM, yyyy")}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-[#777]"> Billing Date:</span>{" "}
            <span className="font-medium text-black">
              {format(project.billingDate, "dd MMM, yyyy")}
            </span>
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ signature: user?.signature ?? null }}
        >
          <Form.Item
            name="signature"
            label="Add signature"
            rules={[{ required: true, message: "Add Signature" }]}
          >
            <SignatureInput oldSignature={user?.signature} required />
          </Form.Item>

          <Form.Item label="Comment" name="comment">
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Checkbox onChange={(e) => setConfirm(e.target.checked)}>
              I confirm that these projects have been delivered.
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
