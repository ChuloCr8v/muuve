import { Avatar, Button, Form, message, Input, Spin } from 'antd';
import { useCreateModelNoteMutation, useLazyListModelNotesQuery } from '../../../api/model';
import { toastApiError } from '../../../utils/error.util';
import React from 'react';
import moment from 'moment'
import {format} from 'date-fns'
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function ModelNotes(props: { data: any }) {
  const { data } = props;
  const modelId = data?.id;
  const [createModelNote, { isLoading }] = useCreateModelNoteMutation();
  const [fetchNotes, { data: noteList, isFetching }] = useLazyListModelNotesQuery(); // Destructure fetchNotes function
  const [form] = Form.useForm();

  // Trigger fetchNotes on component mount or when modelId changes
  React.useEffect(() => {
    if (modelId) {
      fetchNotes(modelId); // Pass modelId to the query
    }
  }, [modelId, fetchNotes]);

  console.log(noteList); // This should log the fetched notes
  console.log(data);

  const Submit = async () => {
    try {
      const values = await form.validateFields();
      const payload = { comment: values.comment };
      await createModelNote({ modelId, ...payload }).unwrap();
      message.success('Comment sent');
      form.resetFields();
      fetchNotes(modelId); 
    } catch (error) {
      toastApiError(error);
    }
  };

  const UserAvatar = ({ name }: { name: string }) => {
    const getInitials = (name: string) => {
      if (!name) return 'N/A';
      const words = name.split(' ');
      return words.map((word) => word[0]).join('');
    };
    return (
      <Avatar size={32} className="bg-[#0A95CC33] text-[#0A95CC]" style={{ fontSize: '12px' }}>
        {getInitials(name)}
      </Avatar>
    );
  };

  return (
    <section className="space-y-[24px]">
      <section>
        <Form form={form} layout="vertical">
          <Form.Item label="Add a note" name="comment" rules={[{ required: true, message: 'Please add a comment!' }]}>
            <TextArea placeholder="type your comment here" autoSize={{ maxRows: 5, minRows: 3 }} />
          </Form.Item>
          <Button loading={isLoading} onClick={Submit} type="primary" className='flex -items-center '>
            <span> Send</span>
            <SendOutlined />
          </Button>
        </Form>
      </section>

      <section className="space-y-[16px]">
        <p className="text-[16px] font-semibold">
          All Notes <span className="text-[#0A95CC]">({noteList?.length || 0})</span>
        </p>

        {isFetching ? (
          <Spin /> // Show a loading spinner while fetching
        ) : (
          noteList?.map((list: any) => (
            <div className="flex space-x-[8px]" key={list.id}>
              <div>
                <UserAvatar name={list.user.staff.name} />
              </div>
              <div className="space-y-[4px]">
                <p className="font-semibold">{list.user.staff.name}</p>
                <p className="p-[12px] text-[14px] bg-[#FBFBFB] border-[#E9EAEB] border-[1px] rounded-md">{list.comment}</p>
                <p className="text-[#9A999E] text-[12px]">{format(new Date(list.createdAt), "d MMM yyy")}, {moment(list.createdAt).format('HH:mm')}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </section>
  );
}
