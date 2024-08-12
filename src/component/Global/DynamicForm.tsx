import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MultiUpload from './MultipleUpload';
import CustomSelect from './CustomeSelect';

const { TextArea } = Input;
const { Option } = Select;

const DynamicForm = (props: {survey: []}) => {
  const survey = props.survey
  const initialItems = ['Customer Request'];
  const [dynamicFields, setDynamicFields] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldType, setFieldType] = useState('');
  const [fieldName, setFieldName] = useState('');

  const handleAddField = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setDynamicFields([
      ...dynamicFields,
      { type: fieldType, name: fieldName },
    ]);
    setIsModalVisible(false);
    setFieldName('');
    setFieldType('');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFieldName('');
    setFieldType('');
  };

  return (
    <Form layout='vertical' className="">
      {survey.filter(item => item.type === 'input' || item.type === 'custom').map((item, index) => (
        <Form.Item key={index} label={item.label}>
          {item.type === 'input' ? <Input /> : <CustomSelect items={initialItems} />}
        </Form.Item>
      ))}

      <div className='grid grid-cols-2 gap-x-4'>
        {survey.filter(item => item.type === 'select' || item.type === 'cordinate').map((item, index) => (
          <Form.Item key={index} label={item.label}>
            {item.type === 'select' ? <Select><Option value="1">Option 1</Option></Select> : <Input />}
          </Form.Item>
        ))}
      </div>

      {dynamicFields.map((field, index) => (
        <Form.Item key={index} label={field.name}>
          {field.type === 'input' ? <Input /> : <Select><Option value="1">Option 1</Option></Select>}
        </Form.Item>
      ))}

      {survey.filter(item => item.type === 'upload' || item.type === 'textarea').map((item, index) => (
        <Form.Item key={index} label={item.label}>
          {item.type === 'upload' ? <MultiUpload /> : <TextArea />}
        </Form.Item>
      ))}

      <Form.Item className='w-full flex mt-5'>
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
        <Form layout='vertical' className='mt-5'>
          <Form.Item required label="Field Name">
            <Input value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
          </Form.Item>
          <Form.Item required label="Field Type">
            <Select value={fieldType} onChange={(value) => setFieldType(value)}>
              <Option value="input">Input</Option>
              <Option value="select">Select</Option>
            </Select>
          </Form.Item>
          {fieldType === 'select' &&
           <Form.Item required label='Options'>
           <Select>
               <Option value="input">User</Option>
               <Option value="select">Custom</Option>
           </Select>
         </Form.Item>
          
          }
          
         
          
        </Form>
      </Modal>
    </Form>
  );
};

export default DynamicForm;
