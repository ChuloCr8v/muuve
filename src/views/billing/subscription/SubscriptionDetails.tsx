import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Table } from "antd";

export default function SubscriptionDetails() {
  const column = [
    {
      title: "",
      width: 50,
      render: () => <p>1</p>,
    },
    {
      title: "Service Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "plan",
      dataIndex: "age",
    },
    {
      title: "QTY",
      dataIndex: "address",
    },

    {
      title: "Unit Price",
      dataIndex: "unitPrice",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
  ];

  const totalCal = [
    { label: "SUBTOTAL", value: "NGN 200000" },
    { label: "VAT", value: "2%" },
    // {label: "TOTAL", value: "NGN 5,000"}
  ];

  return (
    <div className="space-y-[24px] px-[24px] py-[32px] bg-white">
      <section className="flex items-center justify-between">
        <p className="header">Sub ID</p>
        <Button type="primary" className="flex items-center">
          <span>Edit</span>
          <EditOutlined />
        </Button>
      </section>

      <section className="w-[60%] space-y-[16px]">
        <p className="SubTitle">CUSTOMER DETAILS</p>
        <div className="space-y-[16px]">
          <div className="flex w-full space-x-[16px]">
            <div className="w-[50%]">
              <p className="subdetailTag1">Customer Name</p>
              <p className="subdetailTag2">Customer Name Value</p>
            </div>
            <div className="w-[50%]">
              <p className="subdetailTag1">Customer Email</p>
              <p className="subdetailTag2">Customer Email Value</p>
            </div>
          </div>
          <div>
            <p className="subdetailTag1">Address</p>
            <p className="subdetailTag2">Customer Address Value</p>
          </div>
        </div>
      </section>

      <section className="space-y-[16px]">
        <p className="SubTitle">SERVICES</p>

        <div className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
          {" "}
          <Table bordered pagination={false} columns={column} />
        </div>
      </section>

      <section className="w-[60%] space-y-[16px]">
        <p className="SubTitle">SUBSCRIPTION DETAILS</p>
        <div>
          <p className="subdetailTag1">Address</p>
          <p className="subdetailTag2">Customer Address Value</p>
        </div>
        <div className="space-y-[16px]">
          <div className="flex w-full space-x-[16px]">
            <div className="w-[50%]">
              <p className="subdetailTag1">Customer Name</p>
              <p className="subdetailTag2">Customer Name Value</p>
            </div>
            <div className="w-[50%]">
              <p className="subdetailTag1">Customer Email</p>
              <p className="subdetailTag2">Customer Email Value</p>
            </div>
          </div>
        </div>
      </section>
      <Form layout="vertical">
        <div className="flex justify-between">
          <div className="w-[40%]">
            <p className="subdetailTag1">Note</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              minima itaque saepe commodi nam assumenda veritatis temporibus
              atque amet ipsam.
            </p>
          </div>

          <div className="border-[1px] w-[40%] py-[15px] px-[12px] border-[#E9EAEB] bg-[#F8F8F8] rounded-lg">
            <div className="space-y-[12px]">
              {totalCal.map((list) => (
                <div className="flex justify-between ">
                  <p className="SubTitle">{list.label}</p>
                  <p className="totalvalue">{list.value}</p>
                </div>
              ))}
              <div className="flex justify-between ">
                <p className="SubTitle">TOTAL</p>
                <p className="font-bold text-[16px]">NGN 2,000</p>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
