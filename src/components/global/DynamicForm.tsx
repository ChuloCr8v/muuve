import React, { useState } from "react";
import { Form, Input, Button, Select, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MultiUpload from "./MultipleUpload";
import CustomSelect from "./CustomeSelect";
import CustomLabel from "../onboarding/CustomLabel";

const { TextArea } = Input;
const { Option } = Select;

interface SurveyItem {
  type: "input" | "custom" | "select" | "cordinate" | "upload" | "textarea";
  label: string;
  options?: string[];
}

interface DynamicField {
  type: "input" | "select";
  name: string;
}

interface FormData {
  name: string;
  category: string;
  description: string;
}

interface DynamicFormProps {
  survey: SurveyItem[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ survey }) => {
  console.log(survey);
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [form] = Form.useForm();
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldType, setFieldType] = useState<DynamicField["type"]>("input");
  const [fieldName, setFieldName] = useState("");

  const onFinish = (values: FormData) => {
    const newData = { ...values, key: Date.now() };
    setTableData([...tableData, newData]);
    form.resetFields();
    message.success("Form submitted successfully!");
  };

  const handleAddField = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (fieldName && fieldType) {
      setDynamicFields([
        ...dynamicFields,
        { type: fieldType, name: fieldName },
      ]);
    }
    setIsModalVisible(false);
    setFieldName("");
    setFieldType("input");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFieldName("");
    setFieldType("input");
  };

  console.log(survey);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} className="">
      {survey
        .filter((item) => item.type === "input" || item.type === "custom")
        .map((item, index) => (
          <Form.Item
            key={index}
            label={<CustomLabel label={item.label} required />}
          >
            {item.type === "input" ? (
              <Input className="" />
            ) : (
              <CustomSelect items={["xcvbnm"]} />
            )}
          </Form.Item>
        ))}

      <div className="grid grid-cols-2 gap-x-3">
        {survey
          .filter((item) => item.type === "select" || item.type === "cordinate")
          .map((item, index) => (
            <Form.Item
              key={index}
              label={<CustomLabel label={item.label} required />}
            >
              {item.type === "select" ? (
                <Select className="">
                  <Option value="1">Option 1</Option>
                </Select>
              ) : (
                <Input className="" />
              )}
            </Form.Item>
          ))}
      </div>

      {dynamicFields.map((field, index) => (
        <Form.Item
          key={index}
          label={<CustomLabel label={field.name} required />}
        >
          {field.type === "input" ? (
            <Input className="" />
          ) : (
            <Select className="">
              <Option value="1">Option 1</Option>
            </Select>
          )}
        </Form.Item>
      ))}

      {survey
        .filter((item) => item.type === "upload" || item.type === "textarea")
        .map((item, index) => (
          <Form.Item
            key={index}
            label={<CustomLabel label={item.label} required />}
          >
            {item.type === "upload" ? (
              <MultiUpload files={[]} setFiles={undefined} />
            ) : (
              <TextArea />
            )}
          </Form.Item>
        ))}

      <Form.Item className="flex w-full mt-5">
        <Button
          type="default"
          onClick={handleAddField}
          icon={<PlusOutlined />}
          className=" text-[13px]"
        >
          Add Field
        </Button>
      </Form.Item>

      <Modal
        title="Add Field"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical" className="mt-5">
          <Form.Item required label="Field Name">
            <Input
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </Form.Item>
          <Form.Item required label="Field Type">
            <Select value={fieldType} onChange={(value) => setFieldType(value)}>
              <Option value="input">Input</Option>
              <Option value="select">Select</Option>
            </Select>
          </Form.Item>
          {fieldType === "select" && (
            <Form.Item required label="Options">
              <Select>
                <Option value="input">User</Option>
                <Option value="select">Custom</Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Form>
  );
};

export default DynamicForm;
