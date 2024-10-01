import {
    ArrowRightOutlined,
    DownOutlined,
    SearchOutlined,
  } from '@ant-design/icons';
  import type { CollapseProps } from 'antd';
  import { Badge, Collapse, Input } from 'antd';
import AttachmentCard from '../../Global/AttachmentCard';
//   import { Device } from '~/api/devices.api';
  
  interface Prop {
    data: any;
  }
  
  export default function ModelHistory({ data }: Prop) {
    const list = [
        { name: 'Document fghg', size: '15.2mb' },
        { name: 'Document 1', size: '15.2mb' },
      ];
    const items: CollapseProps['items'] = [
      {
        key: '1',
        label: (
          <section className=" relative border-[#F0F1F3] items-center flex justify-between">
            <div>
              <p className="text-[14px] font-semibold leading-3">
                Assigned Microwave({data.name})
              </p>
              <p className="space-x-1 text-[12px] leading-8 text-[#777777]">
                <span>by</span>
                <span className="text-[#0A96CC] font-semibold">Modesta Ekeh</span>
                <ArrowRightOutlined />
                <span className="text-[#0A96CC] font-semibold">Modesta Ekeh</span>
              </p>
            </div>
            <span className="text-[#777777] text-[12px]">12 min ago</span>
          </section>
        ),
        children: (
          <section className=" space-y-[8px]">
            {/* <Table columns={column} /> */}
            <p className="px-[8px] py-[6px] bg-[#FBFBFB] border-[#E9EAEB] border-[1px] rounded-md">
              {data.comment}
            </p>
            <div className='grid grid-cols-3 gap-2'>
            {list.map((data) =>(
                 <AttachmentCard name={data.name} size={data.size}  />
            ))}
            </div>
          </section>
        ),
      },
    ];
  
    return (
      <div className="space-y-[16px]">
        <Input
          placeholder="Search history, action, user"
          prefix={<SearchOutlined className="text-[#595959] mr-2 " />}
        />
  
        <section className="relative border-l-[1.5px]">
          <Collapse
            className=""
            defaultActiveKey={['1']}
            ghost
            items={items}
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <DownOutlined
                className="mt-5 collapeIcon"
                rotate={isActive ? 0 : 180}
              />
            )}
          />
          <Badge
            size="default"
            className="absolute top-[-1px] left-[-4.2px] bg-white pt-[5px]"
            color="#0A96CC"
          />
        </section>
      </div>
    );
  }
  