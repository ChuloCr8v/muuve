import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import CustomSelect from "../../../components/global/CustomeSelect";
import { CustomLabel } from "../../../components/global/Extras";
import MultiUpload from "../../../components/global/MultipleUpload";
import {
  projectForm,
  Survey,
} from "../../../components/tableItems/data/FormItem";

const { TextArea } = Input;

interface Prop {
  selectedElements: any[];
  selectedForm: any;
  setSelectedForm: any;
}

export default function FormSettings({
  selectedElements,
  selectedForm,
  setSelectedForm,
}: Prop) {
  const [showFormMenu, setShowFormMenu] = useState(false);

  const SectionTable = (props: {
    title: string;
    children: ReactNode;
    className?: string;
    desc?: string;
  }) => {
    return (
      <div>
        <p className="text-[14px] bg-transparent text-[#728075] border-b-[#E9EAEB] border-b-[1.5px] space-y-[12px]">
          {props.title}
          <span className="text-[14px] text-[#728075] font-normal">
            {props.desc}
          </span>
        </p>
        <div className={props.className}>{props.children}</div>
      </div>
    );
  };

  // Render form items
  const ItemCard = () => {
    return (
      <>
        <SectionTable className="space-y-[8px]" title={"Fixed Fields"}>
          {Survey.map((list: any) => (
            <section className="w-full flex space-x-3 p-[8px] bg-[#F9F9F9] border-[1px] border-[#E9EAEB] rounded-md">
              <img src="/dots.svg" alt="" />
              <Form.Item
                label={<CustomLabel main={list.label} subText={""} />}
                layout="vertical"
                className="w-[80%]"
              >
                {list.type === "input" ? (
                  <Input className="" />
                ) : list.type === "upload" ? (
                  <MultiUpload
                    className="w-full"
                    files={[]}
                    setFiles={undefined}
                  />
                ) : list.type === "textarea" ? (
                  <TextArea />
                ) : (
                  <CustomSelect items={["dcvbnm,."]} />
                )}
              </Form.Item>
            </section>
          ))}
        </SectionTable>
        <SectionTable title={""} className="space-y-[8px]">
          {selectedElements.map((element, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between p-[8px] bg-[#F9F9F9] border-[1px] border-[#E9EAEB] rounded-md"
            >
              <div className="flex space-x-3 w-[90%]">
                <img src="/dots.svg" alt="" />
                <Form.Item
                  label={
                    <Input
                      className="border-none bg-transparent px-2  shadow-none outline-none text-[#595959]"
                      defaultValue="Type here!"
                    />
                  }
                  layout="vertical"
                  className="w-[90%]"
                >
                  {element.type === "textarea" ? (
                    <TextArea />
                  ) : element.type === "number" ? (
                    <Input type="number" />
                  ) : (
                    <Input />
                  )}
                </Form.Item>
              </div>
              <div className="px-4">
                <DeleteOutlined className="text-red-600 shadow-sm text-[16px] cursor-pointer hover:shadow-xl" />
              </div>
            </div>
          ))}
        </SectionTable>
      </>
    );
  };

  return (
    <section className="p-[24px] border-[1.5px] border-[#D9DADC] rounded-md space-y-[12px]">
      <div className="flex justify-between">
        <div className="relative ">
          <div className="flex space-x-2">
            <h3 className="text-[18px] text-[#777777] font-semibold">
              {selectedForm.label}
            </h3>
            <DownOutlined
              onClick={() => setShowFormMenu(!showFormMenu)}
              className="p-[6px] border-[1.5px] border-[#D9DADC] rounded-full"
            />
            <div
              className={twMerge(
                "absolute left-[-10px] top-8 w-full z-10 bg-white border-[1.5px] rounded-sm shadow-md",
                showFormMenu ? "block" : "hidden"
              )}
            >
              {projectForm.map((formList, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedForm(formList);
                  }}
                  className={twMerge(
                    "px-2 py-3 text-[13px] hover:bg-[#EFF7FB] hover:text-primary hover:font-semibold",
                    selectedForm.label === formList.label ? "text-primary" : ""
                  )}
                >
                  {formList.label}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Button type="primary" className="px-[40px}">
          Add Field
        </Button>
      </div>
      <ItemCard />
    </section>
  );
}
