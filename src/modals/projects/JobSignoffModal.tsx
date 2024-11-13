import { useGetAuthUserQuery } from "@/api/auth.api";
import DateStringPicker from "@/components/common/DateStringPicker";
import SignatureInput from "@/components/signature";
import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSignoffMutation } from "../../api/project.api";
import { Project } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  project: Project;
}

export const JobSignoffModal = ({ project }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const [signoff, { isLoading }] = useSignoffMutation();
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
      title="Project Sign Off"
      onSubmit={submit}
      okText="Sign Off"
      loading={isLoading}
      width={500}
    >
      <div className="w-full">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            contactEmail: project.customer.email,
            signature: user?.signature ?? null,
          }}
        >
          <Form.Item label="Project Lead">
            <Input readOnly value={project.lead.staff.name} />
          </Form.Item>

          <Form.Item
            name="signature"
            label="Add signature"
            rules={[{ required: true, message: "Add Signature" }]}
          >
            <SignatureInput oldSignature={user?.signature} required />
          </Form.Item>

          <Form.Item name="contactEmail" label="Customer Contact Email">
            <Input />
          </Form.Item>

          <Form.Item name="billingDate" label="Billing Commencement Date">
            <DateStringPicker className="w-full" />
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
        </Form>
      </div>
    </CustomModal>
  );
};
