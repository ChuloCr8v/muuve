import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, message } from "antd";
import { format } from "date-fns";
import moment from "moment";
import { useCreateModelNoteMutation } from "../../../api/model.api";
import { Model } from "../../../api/types";
import { toastApiError } from "../../../utils/error.util";

const { TextArea } = Input;

interface Props {
  model: Model;
}

export default function ModelNotes({ model }: Props) {
  const [form] = Form.useForm();
  const [createNote, { isLoading }] = useCreateModelNoteMutation();

  const submit = async () => {
    const values = await form.validateFields();
    console.log(values);
    createNote({ modelId: model.id, ...values })
      .unwrap()
      .then(() => message.success("Note Added"))
      .catch(toastApiError);
  };

  const UserAvatar = ({ name }: { name: string }) => {
    const getInitials = (name: string) => {
      if (!name) return "N/A";
      const words = name.split(" ");
      return words.map((word) => word[0]).join("");
    };
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
          All Notes{" "}
          <span className="text-[#0A95CC]">({model.notes?.length || 0})</span>
        </p>

        {/* {isFetching ? (
          <Spin /> // Show a loading spinner while fetching
        ) : ( */}
        {model.notes?.map((note) => (
          <div className="flex space-x-[8px]" key={note.id}>
            <div>
              <UserAvatar name={note.user.staff.name} />
            </div>
            <div className="space-y-[4px]">
              <p className="font-semibold">{note.user.staff.name}</p>
              <p className="p-[12px] text-[14px] bg-[#FBFBFB] border-[#E9EAEB] border-[1px] rounded-md">
                {note.comment}
              </p>
              <p className="text-[#9A999E] text-[12px]">
                {format(new Date(note.createdAt), "d MMM yyy")},{" "}
                {moment(note.createdAt).format("HH:mm")}
              </p>
            </div>
          </div>
        ))}
        {/* )} */}
      </section>
    </section>
  );
}
