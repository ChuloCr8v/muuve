
import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MultiUpload from './MultipleUpload';
import CustomSelect from './CustomeSelect';

const { TextArea } = Input;
const { Option } = Select;

interface SurveyItem {
  type: 'input' | 'custom' | 'select' | 'cordinate' | 'upload' | 'textarea';
  label: string;
}

interface DynamicField {
  type: 'input' | 'select';
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
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [form] = Form.useForm();
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldType, setFieldType] = useState<DynamicField['type']>('input');
  const [fieldName, setFieldName] = useState('');

  const onFinish = (values: FormData) => {
    const newData = { ...values, key: Date.now() };
    setTableData([...tableData, newData]);
    form.resetFields();
    message.success('Form submitted successfully!');
  };

  const handleAddField = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (fieldName && fieldType) {
      setDynamicFields([...dynamicFields, { type: fieldType, name: fieldName }]);
    }
    setIsModalVisible(false);
    setFieldName('');
    setFieldType('input');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFieldName('');
    setFieldType('input');
  };

  return (
    <Form 
      layout="vertical" 
      form={form}
      onFinish={onFinish}
    >
      {survey
        .filter(item => item.type === 'input' || item.type === 'custom')
        .map((item, index) => (
          <Form.Item key={index} label={item.label}>
            {item.type === 'input' ? <Input /> : <CustomSelect items={['Customer Request']} />}
          </Form.Item>
        ))}

      <div className="grid grid-cols-2 gap-x-4">
        {survey
          .filter(item => item.type === 'select' || item.type === 'cordinate')
          .map((item, index) => (
            <Form.Item key={index} label={item.label}>
              {item.type === 'select' ? (
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
          {field.type === 'input' ? <Input /> : <Select><Option value="1">Option 1</Option></Select>}
        </Form.Item>
      ))}

      {survey
        .filter(item => item.type === 'upload' || item.type === 'textarea')
        .map((item, index) => (
          <Form.Item key={index} label={item.label}>
            {item.type === 'upload' ? <MultiUpload /> : <TextArea />}
          </Form.Item>
        ))}

      <Form.Item className="w-full flex mt-5">
        <Button type="default" onClick={handleAddField} icon={<PlusOutlined />}>
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
            <Input value={fieldName} onChange={e => setFieldName(e.target.value)} />
          </Form.Item>
          <Form.Item required label="Field Type">
            <Select value={fieldType} onChange={value => setFieldType(value)}>
              <Option value="input">Input</Option>
              <Option value="select">Select</Option>
            </Select>
          </Form.Item>
          {fieldType === 'select' && (
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
