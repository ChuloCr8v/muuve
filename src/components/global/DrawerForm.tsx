import { useState } from "react";
import { Form, Input, Button, Select, Modal, Table, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MultiUpload from "./MultipleUpload";
import CustomSelect from "./CustomeSelect";

const { TextArea } = Input;
const { Option } = Select;

const DynamicFormTable = (props: { survey: any[] }) => {
  const survey = props.survey;
  const initialItems = ["Customer Request"];
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [fieldName, setFieldName] = useState("");

  const handleAddField = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setDynamicFields([...dynamicFields, { type: fieldType, name: fieldName }]);
    setIsModalVisible(false);
    setFieldName("");
    setFieldType("");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFieldName("");
    setFieldType("");
  };

  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const columns = [
    {
      title: "Field Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Field Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        switch (type) {
          case "input":
            return <Input />;
          case "select":
            return (
              <Select>
                <Option value="1">Option 1</Option>
              </Select>
            );
          case "custom":
            return <CustomSelect items={initialItems} />;
          case "upload":
            return <MultiUpload files={[]} setFiles={undefined} />;
          case "textarea":
            return <TextArea />;
          default:
            return null;
        }
      },
    },
  ];

  const dataSource = survey
    .filter(
      (item) =>
        item.type === "input" ||
        item.type === "custom" ||
        item.type === "select" ||
        item.type === "upload" ||
        item.type === "textarea"
    )
    .concat(dynamicFields)
    .map((item, index) => ({
      key: index.toString(),
      name: item.label || item.name,
      type: item.type,
    }));

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />

      <Button
        type="default"
        onClick={openDrawer}
        icon={<PlusOutlined />}
        className="mt-4"
      >
        Open Form Drawer
      </Button>

      <Drawer
        title="Dynamic Form"
        width={480}
        onClose={closeDrawer}
        open={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical">
          {survey
            .filter((item) => item.type === "input" || item.type === "custom")
            .map((item, index) => (
              <Form.Item key={index} label={item.label}>
                {item.type === "input" ? (
                  <Input />
                ) : (
                  <CustomSelect items={initialItems} />
                )}
              </Form.Item>
            ))}

          <div className="grid grid-cols-2 gap-x-4">
            {survey
              .filter(
                (item) => item.type === "select" || item.type === "cordinate"
              )
              .map((item, index) => (
                <Form.Item key={index} label={item.label}>
                  {item.type === "select" ? (
                    <Select>
                      <Option value="1">Option 1</Option>
                    </Select>
                  ) : (
                    <Input />
                  )}
                </Form.Item>
              ))}
          </div>

          {dynamicFields.map((field, index) => (
            <Form.Item key={index} label={field.name}>
              {field.type === "input" ? (
                <Input />
              ) : (
                <Select>
                  <Option value="1">Option 1</Option>
                </Select>
              )}
            </Form.Item>
          ))}

          {survey
            .filter(
              (item) => item.type === "upload" || item.type === "textarea"
            )
            .map((item, index) => (
              <Form.Item key={index} label={item.label}>
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
            >
              Add Field
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title="Add Field"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
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
                <Option value="user">User</Option>
                <Option value="custom">Custom</Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default DynamicFormTable;
