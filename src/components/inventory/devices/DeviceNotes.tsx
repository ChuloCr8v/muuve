import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, message, Spin } from "antd";
import { format } from "date-fns";
import {
  useCreateDeviceNoteMutation,
  useListDeviceNotesQuery,
} from "../../../api/devices.api";
import { Device } from "../../../api/types";
import { toastApiError } from "../../../utils/error.util";
import { getInitials } from "../../../utils/getInitials";

const { TextArea } = Input;

interface Props {
  device: Device;
}

export default function DeviceNotes({ device }: Props) {
  const [form] = Form.useForm();
  const [createNote, { isLoading }] = useCreateDeviceNoteMutation();

  const listNotes = useListDeviceNotesQuery({ id: device.id });

  const notes = listNotes.data ?? [];

  const submit = async () => {
    const values = await form.validateFields();
    createNote({ deviceId: device.id, ...values })
      .unwrap()
      .then(async () => {
        message.success("Note Submitted");
        form.resetFields();
        await listNotes.refetch();
      })
      .catch(toastApiError);
  };

  const UserAvatar = ({ name }: { name: string }) => {
    return (
      <Avatar
        size={32}
        className="bg-[#0A95CC33] text-[#0A95CC]"
        style={{ fontSize: "12px" }}
      >
        {getInitials(name)}
      </Avatar>
    );
  };

  return (
    <section className="space-y-[24px]">
      <section>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Add a note"
            name="comment"
            rules={[{ required: true, message: "Please add a comment!" }]}
          >
            <TextArea
              placeholder="type your comment here"
              autoSize={{ maxRows: 5, minRows: 3 }}
            />
          </Form.Item>
          <Button
            loading={isLoading}
            onClick={submit}
            type="primary"
            className="flex items-center "
          >
            <span>Send</span>
            <SendOutlined />
          </Button>
        </Form>
      </section>

      <section className="space-y-[16px]">
        <p className="text-[16px] font-semibold">
          All Notes <span className="text-[#0A95CC]">({notes.length})</span>
        </p>

        {listNotes.isFetching ? (
          <Spin />
        ) : (
          notes.map((n) => (
            <div className="flex space-x-3" key={n.id}>
              <div>
                <UserAvatar name={n.user.staff.name} />
              </div>
              <div className="space-y-[4px] w-full">
                <p className="font-semibold">{n.user.staff.name}</p>
                <p className="p-[12px] text-[14px] bg-[#FBFBFB]  border-[#E9EAEB] border-[1px] rounded-md">
                  {n.comment}
                </p>
                <p className="text-[#9A999E] text-[12px]">
                  {format(new Date(n.createdAt), "d MMM yyy")},{" "}
                  {format(n.createdAt, "HH:mm")}
                </p>
              </div>
            </div>
          ))
        )}
      </section>
    </section>
  );
}
