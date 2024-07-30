import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import ServiceRow from "../../components/EditableContext";
import Heading from "../../components/Heading";

export default function NewSubscription() {
  const totalCal = [
    { label: "SUBTOTAL", value: "NGN 200000" },
    { label: "VAT", value: "2%" },
    // {label: "TOTAL", value: "NGN 5,000"}
  ];
  return (
    <div className="space-y-[24px] px-[24px] py-[32px] bg-white">
      <section className="flex items-center justify-between">
        <Heading heading="New Subscription" />
        <Button type="primary" className="flex items-center">
          <span>Submit</span>
          <PlusOutlined />
        </Button>
      </section>

      <section className="w-[60%] space-y-[16px]">
        <p className="SubTitle">CUSTOMER DETAILS</p>
        <Form layout="vertical" className="">
          <div className="flex w-full space-x-[16px]">
            <Form.Item label="Customer Name" className="w-[50%]">
              <Select />
            </Form.Item>
            <Form.Item label="Email" className="w-[50%]">
              <Input disabled />
            </Form.Item>
          </div>
          <Form.Item label="Address">
            <Input disabled />
          </Form.Item>
        </Form>
      </section>

      <section className="space-y-[16px]">
        <p className="SubTitle">SERVICES</p>

        <ServiceRow />
      </section>

      <section className="w-[60%] space-y-[16px]">
        <p className="SubTitle">SUBSCRIPTION DETAILS</p>
        <Form layout="vertical" className="">
          <Form.Item label="Subscription ID" className="">
            <Input disabled />
          </Form.Item>

          <div className="flex w-full space-x-[16px]">
            <Form.Item label="Starts On" className="w-[50%]">
              <Select />
            </Form.Item>

            <Form.Item label="Expires After" className="w-[50%]">
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      </section>
      <Form layout="vertical">
        <div className="flex justify-between">
          <Form.Item label="Note (Optional)" className="w-[40%]">
            <TextArea />
          </Form.Item>

          <div className="border-[1px] w-[40%] py-[15px] px-[12px] border-[#E9EAEB] bg-[#F8F8F8] rounded-lg">
            <div className="space-y-[12px]">
              {totalCal.map((list) => (
                <div className="flex justify-between ">
                  <p className="SubTitle">{list.label}</p>
                  <p className="totalvalue">{list.value}</p>
                </div>
              ))}
              <Button
                type="dashed"
                className="flex items-center text-[13px] my-4 font-semibold border-[#0A95CC66] text-[#0A95CC]"
              >
                <PlusCircleOutlined className="text-[13px]" />
                <span>Add Discount </span>
              </Button>
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
