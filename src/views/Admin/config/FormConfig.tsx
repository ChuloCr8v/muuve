import { Tabs, TabsProps } from "antd";
import Heading from "../../../components/global/Header";
import FormElement from "./FormElement";
import FormSettings from "./FormSetting";
import { useState } from "react";
import { projectForm } from "../../../components/tableItems/data/FormItem";
import { twMerge } from "tailwind-merge";

export default function FormConfig() {
  const [selectedForm, setSelectedForm] = useState(projectForm[0]);
  const [selectedElements, setSelectedElements] = useState<any | []>([]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Project Management",
      children: (
        <FormSettings
          selectedForm={selectedForm}
          setSelectedForm={setSelectedElements}
          selectedElements={selectedElements}
        />
      ),
    },
  ];

  const options: TabsProps["items"] = [
    {
      key: "1",
      label: "Element",
      children: <FormElement setSelectedElements={setSelectedElements} />,
    },
    {
      key: "2",
      label: "Form",
      children: (
        <div>
          {projectForm.map((formList, index) => (
            <p
              key={index}
              onClick={() => setSelectedForm(formList)}
              className={twMerge(
                "cursor-pointer px-2 py-3 text-[13px] hover:bg-[#EFF7FB] hover:text-primary hover:font-semibold",
                selectedForm.label === formList.label
                  ? "text-primary font-semibold"
                  : ""
              )}
            >
              {formList.label}
            </p>
          ))}
        </div>
      ),
    },
  ];

  return (
    <main className="flex w-full p-[24px] h-[100%] bg-[#f6f6f6] overflow-hidden">
      <section className="w-[70%] h-full rounded-md border-[1px] border-[#D9DADC] p-[16px] bg-white overflow-y-auto">
        <Heading heading="Form Configuration" />
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </section>
      <section className="w-[30%] h-full rounded-md border-[1px] border-[#D9DADC] p-[16px] bg-white overflow-hidden ml-4">
        <h3 className="font-semibold">Form Options</h3>
        <Tabs
          defaultActiveKey="1"
          className="w-full"
          items={options}
          onChange={onChange}
        />
      </section>
    </main>
  );
}
