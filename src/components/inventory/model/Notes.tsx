import TextArea from 'antd/es/input/TextArea';
import { Avatar, Button, Form } from 'antd';


export default function Notes() {
  const commentData = [
    {
      name: 'Mary Lory',
      commnet:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ullam at dolores reprehenderit, quo amet, expedita incidunt possimus accusamus quibusdam facere fugiat, exercitationem deleniti harum. At nesciunt eum ad cum.',
      date: '10:50am',
    },
    {
      name: 'Mary Lory',
      commnet:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ullam at dolores reprehenderit, quo amet, expedita incidunt possimus accusamus quibusdam facere fugiat, exercitationem deleniti harum. At nesciunt eum ad cum.',
      date: '10:50am',
    },
    {
      name: 'Mary Lory',
      commnet:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ullam at dolores reprehenderit, quo amet, expedita incidunt possimus accusamus quibusdam facere fugiat, exercitationem deleniti harum. At nesciunt eum ad cum.',
      date: '10:50am',
    },
  ];

  const UserAvatar = ({ name }: { name: string }) => {
    const getInitials = (name: string) => {
      if (!name) return 'N/A';
      const words = name.split(' ');
      return words.map((word) => word[0]).join('');
    };
    return (
      <Avatar
        size={32}
        className="bg-[#0A95CC33] text-[#0A95CC]"
        style={{ fontSize: '12px' }}
      >
        {getInitials(name)}
      </Avatar>
    );
  };

  return (
    <section className="space-y-[24px]">
      <section>
        <Form layout="vertical">
          <Form.Item label="Add a note" name="comment">
            <TextArea
              placeholder="type your comment here"
              autoSize={{ maxRows: 5, minRows: 3 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Send</Button>
          </Form.Item>
        </Form>
      </section>

      <section className="space-y-[16px]">
        <p className="text-[16px] font-semibold">
          All Notes <span className="text-[#0A95CC]">(3)</span>
        </p>
        {commentData.map((list) => (
          <div className="flex space-x-[8px]">
            <div>
              <UserAvatar name={list.name} />
            </div>
            <div className="space-y-[8px] ">
              <p className="font-semibold">{list.name}</p>
              <p className="p-[12px] text-[14px] bg-[#FBFBFB] border-[#E9EAEB] border-[1px] rounded-md">
                {list.commnet}
              </p>
              <p className=" text-[#9A999E] text-[12px]">{`Today ${list.date}`}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
