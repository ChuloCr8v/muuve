import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Trash from "/trash.svg";
import Dots from "/4dots.png";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
  unitPrice: string;
  amount: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const ServiceRow: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      name: "Add service name",
      age: "Basic",
      address: "1",
      unitPrice: "NGN 1,000,000",
      amount: "NGN 1,000,000",
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "",
      dataIndex: "",
      width: 40,
      render: () => <img className="border-" src={Dots} alt="" />,
    },
    {
      title: "Service Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
      render: (text) => (
        <div className="border-[1.5px] border-[#E9EAEB] p-[8px] rounded-md">
          {text}
        </div>
      ),
    },
    {
      title: "plan",
      dataIndex: "age",
      editable: true,
      render: (text) => (
        <div className="border-[1.5px] border-[#E9EAEB] p-[8px] rounded-md">
          {text}
        </div>
      ),
    },
    {
      title: "QTY",
      dataIndex: "address",
      editable: true,
      render: (text) => (
        <div className="border-[1.5px] border-[#E9EAEB] p-[8px] rounded-md">
          {text}
        </div>
      ),
    },

    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      editable: true,
      render: (text) => (
        <div className="border-[1.5px] border-[#E9EAEB] p-[8px] rounded-md">
          {text}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      editable: true,
      render: (text) => (
        <div className="border-[1.5px] border-[#E9EAEB] p-[8px] rounded-md">
          {text}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Are you sure you want to delete this service?"
            onConfirm={() => handleDelete(record.key)}
          >
            <img src={Trash} />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
      unitPrice: "NGN 500,000",
      amount: "NGN 20,000,000",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <div className="rounded-lg border-[1.5px]  border-[#5656561A]  shadow-[#5656561A]">
        {" "}
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          size="small"
          pagination={false}
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>

      <Button
        onClick={handleAdd}
        type="dashed"
        className="flex items-center text-[13px] my-4 font-semibold border-[#0A95CC66] text-[#0A95CC]"
      >
        <PlusCircleOutlined className="text-[13px]" />
        <span>Add Item</span>
      </Button>
    </div>
  );
};

export default ServiceRow;
