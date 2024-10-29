import { Form, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAssignDeviceMutation } from "../../api/devices.api";
import { useListStaffQuery } from "../../api/staff.api";
import { Device } from "../../api/types";
import { CustomModal } from "../../components/common/CustomModal";
import TableComponent from "../../components/global/TableComponent";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  devices: Device[];
}

export const AssignDeviceModal = ({ devices }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const { data: staff } = useListStaffQuery();

  const [assign, { isLoading }] = useAssignDeviceMutation();

  const submit = async () => {
    const values = await form.validateFields();

    const deviceIds = devices.map((d) => d.id);

    assign({ deviceIds, ...values })
      .unwrap()
      .then(() => {
        message.success("Device Assigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  const columns = [
    { title: "Serial No", dataIndex: "serialNumber" },
    { title: "Name", width: 200, dataIndex: "name" },
    { title: "Part No", dataIndex: "partNumber" },
  ];

  return (
    <CustomModal
      title="Assign Device(s)"
      onSubmit={submit}
      okText="Assign"
      loading={isLoading}
    >
      <div className="w-full">
        <Form form={form} layout="vertical" className="space-y-[12px]">
          <Form.Item
            label={
              <span className="pb-2">
                You are about to assign this device to a user!
              </span>
            }
          >
            <TableComponent<Device> columns={columns} dataSource={devices} />
          </Form.Item>
          <Form.Item
            label="Staff"
            required
            name="assigneeId"
            rules={[{ required: true, message: "Staff is required" }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={staff?.map((s) => ({
                label: s.staff.name,
                value: s.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Comment"
            name="comment"
            required
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};
