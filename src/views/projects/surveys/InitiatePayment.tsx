import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import Column from "antd/es/table/Column";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import Heading from "../../../component/Global/Header";
import TableRowData from "../../../component/Global/TableRowData";
import CustomLabel from "../../../component/onboarding/CustomLabel";

interface DetailsRowInterface {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

const detailRows = [
  {
    id: 0,
    name: "",
    description: "",
    quantity: 0,
    unitPrice: 1000,
    amount: 0,
  },
];

const InitiatePayment = () => {
  const [detailsData, setDetailsData] =
    useState<DetailsRowInterface[]>(detailRows);

  const vat = 2;

  const Subheading = ({ subheading }: { subheading: string }) => {
    return <p className="text-grey uppercase text-xs">{subheading}</p>;
  };

  const addItem = () => {
    const lastId =
      detailsData.length > 0
        ? Math.max(...detailsData.map((item) => item.id))
        : 0;

    const newItem = {
      id: lastId + 1,
      name: "",
      description: "",
      quantity: 0,
      unitPrice: 1000,
      amount: 0,
    };

    setDetailsData((prev) => [...prev, newItem]);
  };

  const deleteItem = (id: number) => {
    console.log(id);
    setDetailsData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (
    id: number,
    name: string,
    value: string | number
  ) => {
    setDetailsData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [name]: value,
              ...(name === "quantity" && {
                amount: (value as number) * item.unitPrice,
              }),
            }
          : item
      )
    );

    console.log(detailsData);
  };

  const getAmount = (id: number) => {
    const detail = detailsData.find((item) => item.id === id);
    const amount = detail ? detail.unitPrice * detail.quantity : 0;
    return amount;
  };

  const subtotal = detailsData.reduce((acc, curr) => acc + curr.amount, 0);

  // console.log(detailsData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading heading="Initiate Payment" />
        <Button type="primary">Submit</Button>
      </div>

      <div className="">
        <Subheading subheading="Bill To" />
        <div className="max-w-[600px] w-full">
          <Form layout="vertical" className="grid grid-cols-2 gap-x-3">
            <Form.Item label={<CustomLabel label="Customer Name" />}>
              <Input name="customerName" type="text" />
            </Form.Item>
            <Form.Item label={<CustomLabel label="Email" />}>
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label={<CustomLabel label="Address" />}
              className="col-span-2"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label={<CustomLabel label="Service Name" />}
              className="col-span-2"
            >
              <Input type="text" />
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="space-y-3">
        <Subheading subheading="Details" />
        <div className="editable-table space-y-3">
          <Table
            pagination={false}
            bordered
            size="small"
            dataSource={detailsData}
            className="rounded-lg border bg-white"
            scroll={{ x: 800 }}
          >
            <Column<DetailsRowInterface>
              title="Name"
              dataIndex="name"
              key="name"
              render={(_: string, record) => {
                return (
                  <div className="pl-6">
                    <Input
                      value={record.name}
                      name="name"
                      type="text"
                      className=""
                      onChange={(e) =>
                        handleUpdateItem(
                          record.id,
                          e.target.name,
                          e.target.value
                        )
                      }
                    />
                  </div>
                );
              }}
            />

            <Column<DetailsRowInterface>
              title="Description"
              dataIndex="description"
              key="description"
              render={(_: string, record) => {
                return (
                  <TextArea
                    name="description"
                    onChange={(e) =>
                      handleUpdateItem(record.id, e.target.name, e.target.value)
                    }
                    value={record.description}
                  />
                );
              }}
            />

            <Column<DetailsRowInterface>
              title="QTY"
              dataIndex="quantity"
              key="qty"
              width="100px"
              render={(_: string, record) => {
                return (
                  <Input
                    type="number"
                    className="h-9"
                    name="quantity"
                    min={0}
                    onChange={(e) =>
                      handleUpdateItem(record.id, e.target.name, e.target.value)
                    }
                    value={record.quantity}
                  />
                );
              }}
            />

            <Column<DetailsRowInterface>
              title="Unit Price"
              dataIndex="unitPrice"
              key="price"
              width={150}
              render={(_: string, record) => {
                return (
                  <p className="text-black font-semibold">
                    <span className="text-grey font-normal">NGN </span>
                    {record.unitPrice.toLocaleString()}
                  </p>
                );
              }}
            />

            <Column<DetailsRowInterface>
              title="Amount"
              dataIndex="amount"
              key="price"
              width={150}
              render={(_: string, record) => {
                return (
                  <p className="text-black font-semibold">
                    <span className="text-grey font-normal">NGN </span>
                    {getAmount(record.id).toLocaleString()}
                  </p>
                );
              }}
            />

            <Column<DetailsRowInterface>
              key="action"
              align="center"
              width={50}
              render={(_: string, record) => {
                return (
                  <BiTrash
                    className="text-red-600 text-2xl cursor-pointer hover:text-red-800"
                    onClick={() => {
                      deleteItem(record.id);
                    }}
                  />
                );
              }}
            />
          </Table>

          <Button
            className="h-9 border-dashed border-primary text-primary"
            icon={<PlusCircleOutlined />}
            iconPosition="end"
            onClick={addItem}
          >
            Add Item
          </Button>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <Form.Item
          layout="vertical"
          label={<CustomLabel label="Note" extra="(Optional)" />}
          className="max-w-[400px] w-full"
        >
          <TextArea />
        </Form.Item>

        <div className="max-w-[400px] w-full p-3 border border-[#E9EAEB] space-y-3 rounded bg-[#F8F8F8]">
          <TableRowData
            mainText={"Subtotal"}
            tagText={`NGN ${subtotal}`}
            wrapperClassName="w-full flex items-center justify-between"
            mainTextStyle="font-normal"
            tagTextStyle="font-semibold !text-black"
          />
          <TableRowData
            mainText={"vat"}
            tagText={vat}
            wrapperClassName="w-full flex items-center justify-between"
            mainTextStyle="font-normal"
            tagTextStyle="font-semibold !text-black"
          />

          <Button
            className="h-9 border-dashed border-primary text-primary"
            icon={<PlusCircleOutlined />}
            iconPosition="end"
          >
            Add Discount
          </Button>

          <div className="">
            <TableRowData
              mainText="total"
              tagText={`NGN ${(subtotal * vat) / 100 + subtotal}`}
              wrapperClassName="w-full flex items-center justify-between"
              mainTextStyle="font-normal"
              tagTextStyle="font-semibold !text-black !text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiatePayment;
