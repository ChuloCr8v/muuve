import { FontSizeOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

interface Prop {
  setSelectedElements: any;
}

export default function FormElement(props: Prop) {
  const { setSelectedElements } = props;
  const elementList = [
    {
      title: "Text Element",
      detail: [
        {
          name: "TextArea",
          Icon: <FontSizeOutlined />,
          type: "textarea",
        },
        {
          name: "Input",
          Icon: <FontSizeOutlined />,
          type: "input",
        },
        {
          name: "Number",
          Icon: <FontSizeOutlined />,
          type: "number",
        },
      ],
    },
  ];

  const handleElementClick = (element: any) => {
    setSelectedElements((prev: any) => [...prev, element]);
  };

  return (
    <section className="space-y-[16px]">
      <Input prefix={<SearchOutlined className="text-[#777777]" />} />
      <div className="space-y-[16px]">
        {elementList.map((list, index) => (
          <div className="text-[13px] space-y-1" key={index}>
            <p className="text-[#777777]">{list.title}</p>
            <div className="grid grid-cols-2 gap-[12px]">
              {list.detail.map((item, idx) => (
                <div
                  key={idx}
                  className="hover:shadow-sm flex space-x-1 items-center border-[1.5px] border-[#D9DADC] cursor-pointer hover:border-primary rounded-md px-[8px] py-[8px]"
                  onClick={() => handleElementClick(item)}
                >
                  {item.Icon}
                  <p className="text-[#262626]">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
