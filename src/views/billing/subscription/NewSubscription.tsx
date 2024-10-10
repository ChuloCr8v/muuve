import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import ServicesRow from "../../../components/billing/ServicesRow";
import { customerData } from "../../../dummy/customerData";
import { NewSubscriptionFormDataType } from "../../../types";
import Heading from "../../../components/global/Header";
import { useParams } from "react-router-dom";
import dataList from "./data";
import SubscriptionSummaryCard from "../../../components/global/SubscriptionSummaryCard";

const formDataFields = {
  customerName: "",
  customerEmail: "",
  customerAddress: "",
  services: [
    {
      serviceName: "",
      plan: "",
      quantity: 0,
      amount: 0,
    },
  ],
  subscriptionId: "",
  startDate: dayjs(new Date().getFullYear()),
  endDate: dayjs(new Date().getFullYear()).add(1, "year"),
  notes: "",
};

export const vat = 2;

export default function NewSubscription() {
  const [formData, setFormData] =
    useState<NewSubscriptionFormDataType>(formDataFields);

  const { id } = useParams();

  useEffect(() => {
    const currentSubscription = dataList.find(
      (subscription) => subscription.subscriptionId === id
    );
    setFormData(currentSubscription!);
  }, [id]);

  useEffect(() => {
    const generateID = "SUB" + Math.floor(100000 + Math.random() * 900000);
    if (!id) {
      setFormData((prev) => ({ ...prev, subscriptionId: generateID }));
    }
  }, []);

  const handleGetCustomer = (id: string) => {
    const customer = customerData.find((customer) => customer.id === id);

    if (customer) {
      setFormData((prev) => ({
        ...prev,
        customerName: customer.customerName,
        customerEmail: customer.customerEmail,
        customerAddress: customer.customerAddress,
      }));
    } else {
      console.error(`Customer with ID ${id} not found.`);
      setFormData((prev) => ({
        ...prev,
        customerName: "",
        customerEmail: "",
        customerAddress: "",
      }));
    }
  };

  const handleSetStartDate = (date: Dayjs) => {
    if (date) {
      const endDate = date.add(1, "year");
      setFormData((prev) => ({
        ...prev,
        startsOn: date,
        expiresOn: endDate,
      }));
    }
  };

  return (
    <div className="space-y-4 p-8 bg-white">
      <Breadcrumb
        className=""
        items={[
          {
            title: "Billing",
          },
          {
            title: "Subscription",
            href: `/billing/subscription/`,
          },
          {
            title: id ? "Edit Subscription" : "New Subscription",
            href: `/billing/new-sub/`,
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Heading heading="New Subscription" />
        <Button type="primary" className="flex items-center">
          <span>Submit</span>
          <PlusOutlined />
        </Button>
      </section>

      <section className="w-[60%] space-y-[16px]">
        <p className="text">CUSTOMER DETAILS</p>
        <Form layout="vertical" className="">
          <div className="flex w-full space-x-[16px]">
            <Form.Item label="Customer Name" className="w-[50%]">
              <Select
                value={formData.customerName}
                onChange={(value: string) => handleGetCustomer(value)}
                options={customerData.map((item) => ({
                  label: item.customerName,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item label="Email" className="w-[50%]">
              <Input
                disabled
                value={formData?.customerEmail}
                className="!text-black"
              />
            </Form.Item>
          </div>
          <Form.Item label="Address">
            <Input
              disabled
              value={formData?.customerAddress}
              className="!text-black"
            />
          </Form.Item>
        </Form>
      </section>

      <section className="space-y-[16px]">
        <p className="text">SERVICES</p>
        <ServicesRow
          setFormData={setFormData}
          currentServicesToEdit={formData?.services}
        />
      </section>

      <section className="w-[60%] space-y-2">
        <p className="text">SUBSCRIPTION DETAILS</p>

        <Form layout="vertical" className="space-y-4">
          <Form.Item label="Subscription ID" className="">
            <Input
              disabled
              value={formData.subscriptionId}
              className="!text-customBlack"
            />
          </Form.Item>

          <div className="flex w-full space-x-4">
            <Form.Item label="Starts On" className="w-[50%]">
              <DatePicker
                value={formData.startDate}
                onChange={(date) => handleSetStartDate(date)}
                className="w-full"
              />
            </Form.Item>

            <Form.Item label="Expires After" className="w-[50%]">
              <Input
                disabled
                className="!text-customBlack"
                value={dayjs(formData.endDate).format("YYYY-MM-DD")}
              />
            </Form.Item>
          </div>
        </Form>
      </section>

      <Form layout="vertical">
        <div className="flex justify-between">
          <Form.Item label="Note (Optional)" className="w-[40%]">
            <TextArea
              cols={20}
              rows={4}
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value }))
              }
            />
          </Form.Item>

          {/* cost summary card */}
          <SubscriptionSummaryCard formData={formData} />
        </div>
      </Form>
    </div>
  );
}
