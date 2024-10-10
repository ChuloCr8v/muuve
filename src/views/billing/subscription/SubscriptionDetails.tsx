import { ArrowRightOutlined, EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../../components/global/Header";
import TableRowData from "../../../components/global/TableRowData";
import { SubscriptionDataType } from "../../../types";
import dataList from "./data";
import useFormatDate from "../../../hooks/useFormatDate";
import { vat } from "./NewSubscription";
import { FaArrowRightLong } from "react-icons/fa6";

const SubscriptionDetails = () => {
  const [currentSubscription, setCurrentSubscription] =
    useState<SubscriptionDataType>();

  const navigate = useNavigate();

  const { formatDate } = useFormatDate();

  const { id } = useParams();

  useEffect(() => {
    const getCurrentSub = dataList.find((sub) => sub.subscriptionId === id);
    setCurrentSubscription(getCurrentSub);
  }, []);

  const columns = [
    {
      title: "Service Name",
      key: "serviceName",
      dataIndex: "serviceName",
    },
    {
      title: "Plan",
      key: "plan",
      dataIndex: "plan",
    },
    {
      title: "QTY",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Unit Price",
      key: "unitPrice",
      dataIndex: "unitPrice",
      render: (_: string, record: SubscriptionDataType) => {
        return (
          <p className="">
            <span className="text-grey">NGN</span>{" "}
            {record.unitPrice?.toLocaleString()}
          </p>
        );
      },
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      render: (_: string, record: SubscriptionDataType) => {
        return (
          <p className="">
            <span className="text-grey">NGN</span>{" "}
            {record.amount.toLocaleString()}
          </p>
        );
      },
    },
  ];

  const subtotal = () => {
    return currentSubscription?.services.reduce(
      (acc, current) => acc + current.amount,
      0
    );
  };

  return (
    <div className="p-8 bg-white">
      <Breadcrumb
        className="pb-3"
        items={[
          {
            title: "Billing",
          },
          {
            title: "Subscription",
            href: "/billing/subscription",
          },
          {
            title: ":id",
            href: `/billing/subscription/${id}`,
          },
        ]}
        params={{ id: id }}
      />

      <div className="flex items-center justify-between">
        <Heading heading={currentSubscription?.subscriptionId ?? ""} />
        <Button
          onClick={() => navigate(`/billing/edit-sub/${id}`)}
          type="primary"
          icon={<EditOutlined />}
          iconPosition="end"
        >
          Edit
        </Button>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <TableRowData
            mainText="Customer Details"
            mainTextStyle="uppercase text-grey text-xs"
          />

          <div className="grid grid-cols-2 gap-2">
            <TextCard
              mainText="Customer Name"
              tagText={currentSubscription?.customerName ?? ""}
            />

            <TextCard
              mainText="Email"
              tagText={currentSubscription?.customerEmail ?? ""}
              tagTextStyle="!lowercase"
            />

            <TextCard
              mainText="Address"
              tagText={currentSubscription?.customerAddress ?? ""}
            />
          </div>
        </section>

        <section className="space-y-3">
          <TableRowData
            mainText="Services"
            mainTextStyle="uppercase text-grey text-xs"
          />

          <Table
            columns={columns}
            dataSource={currentSubscription?.services}
            className="border rounded-lg overflow-hidden"
            size="small"
            pagination={false}
          />
        </section>

        <section className="space-y-3">
          <TableRowData
            mainText="Subscription Details"
            mainTextStyle="uppercase text-grey text-xs"
          />

          <div className="grid grid-cols-2 gap-2 max-w-[600px] w-full">
            <div className="col-span-2">
              <TextCard
                mainText="Subscription ID"
                tagText={currentSubscription?.subscriptionId ?? ""}
              />
            </div>
            <TextCard
              mainText="Starts On"
              tagText={formatDate(currentSubscription?.startDate)}
            />

            <TextCard
              mainText="Expires After"
              tagText={formatDate(currentSubscription?.startDate)}
            />
          </div>

          <div className="grid grid-cols-2 gap-12">
            <TextCard
              mainText="Notes"
              tagText={currentSubscription?.notes ?? ""}
              tagTextStyle="max-w-[400px] w-full"
            />

            <div className="border rounded md bg-offwhite space-y-3 p-4 max-w-[400px] w-full place-self-end">
              <SummaryTextCard
                mainText={"subtotal"}
                tagText={"NGN" + " " + subtotal()?.toLocaleString()}
              />

              <div className="border-t pt-2">
                {" "}
                <SummaryTextCard
                  mainText={"Vat"}
                  tagText={vat}
                  tagTextStyle="!text-base"
                />
              </div>

              <SummaryTextCard
                mainText={"Discount"}
                tagText={vat}
                tagTextStyle="!text-base"
              />

              <SummaryTextCard
                mainText={"Total"}
                tagText={
                  "NGN" +
                  " " +
                  (subtotal()! * (vat / 100) + subtotal()!).toLocaleString()
                }
                tagTextStyle="!text-base"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubscriptionDetails;

const TextCard = (props: {
  mainText: string;
  tagText: string;
  tagTextStyle?: string;
}) => {
  return (
    <TableRowData
      mainText={props.mainText}
      tagText={props.tagText}
      mainTextStyle="text-[13px] !text-grey"
      tagTextStyle={`font-semibold !text-customBlack !text-sm ${props.tagTextStyle}`}
    />
  );
};

const SummaryTextCard = (props: {
  mainText: string;
  tagText: string | number;
  tagTextStyle?: string;
}) => {
  return (
    <TableRowData
      mainText={props.mainText}
      tagText={props.tagText}
      wrapperClassName="flex items-center justify-between"
      mainTextStyle="uppercase text-[13px] !text-grey"
      tagTextStyle={`font-semibold !text-customBlack !text-sm ${props.tagTextStyle}`}
    />
  );
};
