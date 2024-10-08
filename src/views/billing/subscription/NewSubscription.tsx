import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa";
import ServicesRow from "../../../components/billing/ServicesRow";

import { customerData } from "../../../dummy/customerData";
import { NewSubscriptionFormDataType } from "../../../types";
import DiscountModal, {
  DiscountFieldsDataType,
} from "../../../components/global/DiscountModal";
import Heading from "../../../components/global/Header";
import TableRowData from "../../../components/global/TableRowData";

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
  startsOn: null,
  expiresOn: null,
  note: "",
};

const vat = 2;

export default function NewSubscription() {
  const [formData, setFormData] =
    useState<NewSubscriptionFormDataType>(formDataFields);
  const [openDiscountModal, setOpenDiscountModal] = useState(false);
  const [discounts, setDiscounts] = useState<Array<DiscountFieldsDataType>>([]);

  console.log(discounts);

  useEffect(() => {
    const generateID = "SUB" + Math.floor(100000 + Math.random() * 900000);
    setFormData((prev) => ({ ...prev, subscriptionId: generateID }));
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

  const subscriptionSubtotal = () => {
    const subtotal = formData.services.reduce((acc, currentService) => {
      return acc + currentService.amount;
    }, 0);

    return subtotal;
  };

  const totalCost = () => {
    // Calculate percentage discounts
    const percentageDiscounts = discounts.filter(
      (discount) => discount.type === "percentage"
    );
    const totalPercentageDiscounts = percentageDiscounts.reduce(
      (acc, currentDiscount) => acc + currentDiscount.value,
      0
    );

    // Apply percentage discount to the subtotal
    const percentageDiscount =
      (totalPercentageDiscounts / 100) * subscriptionSubtotal();
    const totalAfterPercentageDiscount =
      subscriptionSubtotal() - percentageDiscount;

    // Calculate fixed discounts
    const fixedDiscounts = discounts.filter(
      (discount) => discount.type === "fixed"
    );
    const totalFixedDiscounts = fixedDiscounts.reduce(
      (acc, currentDiscount) => acc + currentDiscount.value,
      0
    );

    // Apply fixed discounts after percentage discount
    const totalAfterFixedDiscount =
      totalAfterPercentageDiscount - totalFixedDiscounts;

    // Calculate VAT and add it to the total
    const getVat = (totalAfterFixedDiscount * vat) / 100;
    const totalAfterVat = totalAfterFixedDiscount + getVat;

    return totalAfterVat;
  };

  return (
    <div className="space-y-[24px] p-8 bg-white">
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
        <ServicesRow setFormData={setFormData} />
      </section>

      <section className="w-[60%] space-y-[16px]">
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
                value={formData.startsOn}
                onChange={(date) => handleSetStartDate(date)}
                className="w-full"
              />
            </Form.Item>

            <Form.Item label="Expires After" className="w-[50%]">
              <Input
                disabled
                className="!text-customBlack"
                value={dayjs(formData.expiresOn).format("YYYY-MM-DD")}
              />
            </Form.Item>
          </div>
        </Form>
      </section>

      <Form layout="vertical">
        <div className="flex justify-between">
          <Form.Item label="Note (Optional)" className="w-[40%]">
            <TextArea
              value={formData.note}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value }))
              }
            />
          </Form.Item>

          <div className="border-[1px] w-[40%] py-[15px] px-[12px] border-[#E9EAEB] bg-[#F8F8F8] rounded-lg">
            <div className="space-y-[12px]">
              <div className="">
                <TableRowData
                  wrapperClassName="flex items-center justify-between border-b pb-1"
                  mainText={"Subtotal"}
                  mainTextStyle="text-grey uppercase"
                  tagText={
                    "NGN" + " " + subscriptionSubtotal().toLocaleString()
                  }
                  tagTextStyle="font-semibold !text-customBlack"
                />

                {discounts.length ? (
                  <div className="my-1 border-b pb-1">
                    <TableRowData
                      mainText="Discounts"
                      mainTextStyle="uppercase font-semibold"
                      wrapperClassName="pb-1"
                    />

                    <div className="space-y-1">
                      {discounts?.map((discount) => (
                        <div
                          key={discount.id}
                          className="flex items-center gap-4 w-full"
                        >
                          <TableRowData
                            wrapperClassName="flex items-center justify-between w-full"
                            mainText={discount.label}
                            mainTextStyle="text-grey uppercase"
                            tagText={
                              (discount.type === "fixed" ? "NGN" : "") +
                              " " +
                              discount.value +
                              (discount.type === "percentage" ? "%" : "")
                            }
                            tagTextStyle="font-semibold !text-customBlack"
                          />
                          <FaBan
                            className="text-red-600 cursor-pointer"
                            onClick={() =>
                              setDiscounts(
                                discounts.filter((d) => d.id !== discount.id)
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <TableRowData
                  wrapperClassName="flex items-center justify-between"
                  mainText={"Vat"}
                  mainTextStyle="text-grey uppercase"
                  tagText={vat + "%"}
                  tagTextStyle="font-semibold !text-customBlack"
                />
              </div>

              <Button
                type="dashed"
                onClick={() => setOpenDiscountModal(true)}
                className="flex items-center text-[13px] my-4 font-semibold border-[#0A95CC66] text-[#0A95CC]"
              >
                <PlusCircleOutlined className="text-[13px]" />
                <span>Add Discount </span>
              </Button>

              <div className="">
                <TableRowData
                  wrapperClassName="flex items-center justify-between"
                  mainText={"Total"}
                  mainTextStyle="text-grey uppercase"
                  tagText={"NGN" + " " + totalCost().toLocaleString()}
                  tagTextStyle="font-semibold !text-customBlack"
                />
              </div>
            </div>
          </div>
        </div>
      </Form>

      <DiscountModal
        isOpen={openDiscountModal}
        setIsOpen={setOpenDiscountModal}
        discounts={discounts}
        setDiscounts={setDiscounts}
      />
    </div>
  );
}
