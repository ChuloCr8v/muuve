import  { useState } from 'react';
import { Form, Input, Button, Select, Upload, Table, Drawer, Modal, Checkbox } from 'antd';
import {  UploadOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Option } = Select;

interface FormData {
  key: number;
  customerName: string;
  serviceAddress: string;
  serviceType: string;
  requestType: string;
  manager: string;
  bandwidth: string;
  state: string;
  region: string;
  longitude: string;
  latitude: string;
  fileList: UploadFile[];
}

const initialColumns = [
  { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
  { title: 'Service Address', dataIndex: 'serviceAddress', key: 'serviceAddress' },
  { title: 'Service Type', dataIndex: 'serviceType', key: 'serviceType' },
  { title: 'Request Type', dataIndex: 'requestType', key: 'requestType' },
  { title: 'Manager', dataIndex: 'manager', key: 'manager' },
  { title: 'Bandwidth', dataIndex: 'bandwidth', key: 'bandwidth' },
  { title: 'Region', dataIndex: 'region', key: 'region' },
  { title: 'State', dataIndex: 'state', key: 'state' },
  { title: 'Longitude', dataIndex: 'longitude', key: 'longitude' },
  { title: 'Latitude', dataIndex: 'latitude', key: 'latitude' },
  { title: 'Files', dataIndex: 'fileList', key: 'fileList', render: (fileList: UploadFile[]) => (
    <ul>
      {fileList.map(file => (
        <li key={file.uid}>{file.name}</li>
      ))}
    </ul>
  )},
];

const Programs = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [columns, setColumns] = useState(initialColumns);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(initialColumns.map(() => true));

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const onFinish = (values: FormData) => {
    const newData = { ...values, key: Date.now() };
    setTableData([...tableData, newData]);
    form.resetFields();
    closeDrawer();
  };

  const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    const newColumns = initialColumns.filter((_, i) => newCheckedItems[i]);
    setColumns(newColumns);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const modalTableData = initialColumns.map((col, index) => ({
    key: col.key,
    checkbox: (
      <Checkbox
        checked={checkedItems[index]}
        onChange={() => handleCheckboxChange(index)}
      />
    ),
    title: col.title
  }));

  const modalColumns = [
    { title: '', dataIndex: 'checkbox', key: 'checkbox', width: 50 },
    { title: 'Column Title', dataIndex: 'title', key: 'title' }
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">Survey</p>
        <Button type="primary" onClick={showDrawer} style={{ marginBottom: 16 }}>
          <span>Add Survey</span> <PlusOutlined />
        </Button>
      </div>

      <Table columns={columns} dataSource={tableData} pagination={false} />

      <Drawer
        title="Submit New Entry"
        width={480}
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Button type="default" icon={<SettingOutlined />} onClick={openModal}>
            Edit Table Columns
          </Button>
        }
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Please enter your name" />
          </Form.Item>

          <Form.Item
            name="manager"
            label="Manager"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Please enter your name" />
          </Form.Item>

          <Form.Item
            name="serviceAddress"
            label="Service Address"
            rules={[{ required: true, message: 'Please enter a service address' }]}
          >
            <Input placeholder="Please enter a service address" />
          </Form.Item>

          <Form.Item
            name="serviceType"
            label="Service Type"
            // rules={[{ required: true, message: 'Please select a service type' }]}
          >
            <Select placeholder="Please select a service type">
              <Option value="Internet">Internet</Option>
              <Option value="Cable">Cable</Option>
              <Option value="Phone">Phone</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="requestType"
            label="Request Type"
            // rules={[{ required: true, message: 'Please select a request type' }]}
          >
            <Select placeholder="Please select a request type">
              <Option value="New Connection">New Connection</Option>
              <Option value="Upgrade">Upgrade</Option>
              <Option value="Repair">Repair</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="bandwidth"
            label="Bandwidth"
            // rules={[{ required: true, message: 'Please select a bandwidth' }]}
          >
            <Select placeholder="Please select a bandwidth">
              <Option value="100 Mbps">100 Mbps</Option>
              <Option value="200 Mbps">200 Mbps</Option>
              <Option value="500 Mbps">500 Mbps</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            // rules={[{ required: true, message: 'Please select a state' }]}
          >
            <Select placeholder="Please select a state">
              <Option value="California">California</Option>
              <Option value="Texas">Texas</Option>
              <Option value="Florida">Florida</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="region"
            label="Region"
            // rules={[{ required: true, message: 'Please select a region' }]}
          >
            <Select placeholder="Please select a region">
              <Option value="West Coast">West Coast</Option>
              <Option value="South">South</Option>
              <Option value="Northeast">Northeast</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="longitude"
            label="Longitude"
            // rules={[{ required: true, message: 'Please enter longitude' }]}
          >
            <Input placeholder="Please enter longitude" />
          </Form.Item>

          <Form.Item
            name="latitude"
            label="Latitude"
            // rules={[{ required: true, message: 'Please enter latitude' }]}
          >
            <Input placeholder="Please enter latitude" />
          </Form.Item>

          <Form.Item
            name="fileList"
            label="Upload Files"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" listType="picture" multiple>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <div className="flex justify-center items-center mt-4">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>

      <Modal
        title="Edit Table Columns"
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
         <Table
          columns={modalColumns}
          dataSource={modalTableData}
          pagination={false}
          showHeader={false}
          size='small'
        />
      </Modal>
    </>
  );
};

export default Programs;
